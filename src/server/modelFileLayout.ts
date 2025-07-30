import { ArkErrors, type } from "arktype";
import settings from "#settings";
import type {
  Models_File,
  Models_Image,
  ModelTypes,
} from "#shared/models/civitai/mod.ts";
import {
  Models_ModelSchema,
  Models_ModelVersionSchema,
} from "#shared/models/civitai/mod.ts";
import { join, SEPARATOR } from "@std/path";
import { expandGlob, ExpandGlobOptions } from "@std/fs";
import { extractFilenameFromUrl } from "#shared/utils.ts";
import { exists } from "@std/fs/exists";
import { upsertOneModelVersion } from "#prisma/crud/modelVersion.ts";
import fileUrl from "file-url";

/**
 * The layout of directory:
 * {baseDir} / {modelType} / {modelId} / {modelId}.api-info.json
 * {baseDir} / {modelType} / {modelId} / {versionId} / {fileId}_{fileName}
 * {baseDir} / {modelType} / {modelId} / {versionId} / {versionId}.api-info.json
 * {baseDir} / "media" / {imageId}.xxx
 */

const modelJsonFileSuffix = ".api-info.json";

export function getModelDir(type: ModelTypes, modelId: number): string {
  return join(
    settings.MODELS_DIR,
    type,
    modelId.toString(),
  );
}

export function getModelJsonPath(type: ModelTypes, modelId: number): string {
  return join(
    getModelDir(type, modelId),
    modelId + modelJsonFileSuffix,
  );
}

export function getModelVersionDir(
  type: ModelTypes,
  modelId: number,
  versionId: number,
) {
  return join(
    settings.MODELS_DIR,
    type,
    modelId.toString(),
    versionId.toString(),
  );
}

export function getModelVersionJsonPath(
  type: ModelTypes,
  modelId: number,
  versionId: number,
): string {
  return join(
    getModelVersionDir(type, modelId, versionId),
    versionId + modelJsonFileSuffix,
  );
}

export function getModelFilePath(
  type: ModelTypes,
  modelId: number,
  versionId: number,
  file: Models_File,
): string {
  return join(
    getModelVersionDir(type, modelId, versionId),
    `${file.id}_${file.name}`,
  );
}

export function getMediaPath(image: Models_Image) {
  return join(settings.MODELS_DIR, "media", extractFilenameFromUrl(image.url));
}

type ModelMetaInfo = {
  filePath: string;
  modelType: ModelTypes;
  modelId: number;
  versionId: number;
  versionJsonPath: string;
  modelJsonPath: string;
};

export async function getModelVersionInfoByModelFilePath(
  modelFile: string,
): Promise<ModelMetaInfo> {
  const meta: ModelMetaInfo = {
    filePath: modelFile,
    modelType: "Other", // default value, will be updated later
    modelId: 0, // default value, will be updated later
    versionId: 0, // default value, will be updated later
    versionJsonPath: "",
    modelJsonPath: "",
  };

  const parts = modelFile.split(SEPARATOR);

  meta.versionId = parseInt(parts[parts.length - 2], 10);
  meta.modelId = parseInt(parts[parts.length - 3], 10);
  meta.modelType = parts[parts.length - 4] as ModelTypes;

  // parse model version json
  meta.versionJsonPath = getModelVersionJsonPath(
    meta.modelType,
    meta.modelId,
    meta.versionId,
  );
  if (!(await exists(meta.versionJsonPath, { isFile: true }))) {
    // process about how to handle not exists
    meta.versionJsonPath = "";
  }

  // parse model json
  meta.modelJsonPath = getModelJsonPath(meta.modelType, meta.modelId);
  if (!(await exists(meta.modelJsonPath, { isFile: true }))) {
    // process about how to handle not exists
    meta.modelJsonPath = "";
  }
  return meta;
}

type countLocalModelsResult = {
  total: number;
};
export async function countLocalModels(
  modelsDir: string,
): Promise<countLocalModelsResult> {
  let total = 0;
  const expandGlobOptions: ExpandGlobOptions = {
    root: modelsDir,
    includeDirs: true,
  };
  for await (
    const modelFile of expandGlob("*.safetensors", expandGlobOptions)
  ) {
    // read modelVersion.api-info.json and model.api-info.json files then record them into database.
    const meta = await getModelVersionInfoByModelFilePath(modelFile.path);
    // we need two functions, one of them will check if modelVersion.api-info.json exists and read them
    // the other function will do the same thing but to model.api-info.json.
    if (meta.versionJsonPath && meta.modelJsonPath) {
      total++;
    } else {
      total++;
      console.warn(
        `Model or version JSON not found for file: ${modelFile.path}`,
      );
    }
  }
  return { total };
}

/**
 * Use it after run "prisma reset" command!!!
 * It's aimed to scan local models directory and sync them to database.
 */
export async function scanLocalModels(): Promise<number> {
  let total = 0;
  const modelsDir = settings.MODELS_DIR;
  if (await exists(modelsDir, { isDirectory: true }) !== true) {
    console.warn(`Models directory does not exist: ${modelsDir}`);
    throw new Error(`Models directory does not exist: ${modelsDir}`);
  }

  const expandGlobOptions: ExpandGlobOptions = {
    root: modelsDir,
    includeDirs: false,
  };

  const asyncItorator = expandGlob("**/*.safetensors", expandGlobOptions);
  for await (
    const modelFile of asyncItorator
  ) {
    // read modelVersion.api-info.json and model.api-info.json files then record them into database.
    const meta = await getModelVersionInfoByModelFilePath(modelFile.path);
    if (meta.versionJsonPath === "" || meta.modelJsonPath == "") {
      console.warn(
        `Model or version JSON not found for file: ${modelFile.path}`,
      );
      continue;
    }
    const modelVersionObj = await import(fileUrl(meta.versionJsonPath), { with: { type: "json" } })
    // for object that imported by import() function, you have to use default property to return it's data.
    const modelVersionInfo = Models_ModelVersionSchema(modelVersionObj.default);
    // Validate the model version
    const modelInfoObj = await import(fileUrl(meta.modelJsonPath), { with: { type: "json" } })
    const modelInfo = Models_ModelSchema(modelInfoObj.default);
    // Here you can call your upsert function to save the model and version
    // await upsertModelAndVersion(model, modelVersion);
    if (
      modelVersionInfo instanceof type.errors ||
      modelInfo instanceof type.errors
    ) {
      console.log(`\nmodelVersionInfo error\n ${meta.versionJsonPath}`)
      console.log((modelVersionInfo as ArkErrors).summary)
      console.log(`\nModelInfo error\n ${meta.modelJsonPath}`)
      console.log((modelInfo as ArkErrors).summary)
      console.error(
        `Invalid model or version json for file: ${modelFile.path}`,
      );
      continue;
    }
    // Upsert the model version into the database
    await upsertOneModelVersion(modelInfo, modelVersionInfo);

    total++;
  }
  return total;
}
