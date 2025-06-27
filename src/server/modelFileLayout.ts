import { type } from "arktype";
import settings from "#settings";
import type {
  Models_File,
  Models_Image,
  Models_ModelVersion,
  ModelTypes,
} from "#shared/models/civitai/mod.ts";
import { Models_ModelVersionSchema } from "#shared/models/civitai/mod.ts";
import { basename, dirname, join } from "@std/path";
import { expandGlob } from "@std/fs";
import { extractFilenameFromUrl } from "#shared/utils.ts";
import { exists } from "@std/fs/exists";

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

export async function getModelVersionInfoByModelFilePath(modelFile: string) {
  const dir = dirname(modelFile);
  const versionId = basename(dir);
  const versionInfoJsonFilePath = join(dir, versionId + modelJsonFileSuffix);
  if (!(await exists(versionInfoJsonFilePath, { isFile: true }))) {
    // process about how to handle not exists
  }
  const out = Models_ModelVersionSchema(
    await import(versionInfoJsonFilePath, { with: { type: "json" } }),
  );
  if (out instanceof type.errors) {
    console.log(out.summary);
    out.throw();
  } else {
  }
}

export async function scanModels(modelsDir: string) {
  for await (
    const modelFile of expandGlob("*.safetensors", {
      root: modelsDir,
      includeDirs: true,
    })
  ) {
    // read modelVersion.api-info.json and model.api-info.json files then record them into database.
    modelFile.path;
    // we need two functions, one of them will check if modelVersion.api-info.json exists and read them
    // the other function will do the same thing but to model.api-info.json.
  }
}
