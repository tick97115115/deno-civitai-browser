import type {
  Models_Model,
  Models_ModelVersion,
} from "#shared/models/civitai/mod.ts";
import {
  Models_ModelSchema,
  Models_ModelVersionSchema,
} from "#shared/models/civitai/mod.ts";
import { prisma } from "../client.ts";
import { findOrCreateOneBaseModel } from "./baseModel.ts";
import { findOrCreateOneBaseModelType } from "./baseModelType.ts";
import { findOrCreateOneModelId } from "./modelId.ts";
import { normalize, sep } from "node:path";
import { readFile } from "node:fs/promises";
import {
  getModelJsonPath,
  getModelVersionJsonPath,
} from "#server/modelFileLayout.ts";
import type { ModelTypes } from "#shared/models/civitai/mod.ts";
import { type } from "arktype";
import { exists, expandGlob } from "@std/fs";
import { findOrCreateOneModelType } from "./modelType.ts";
import { findOrCreateOneCreator } from "./creator.ts";

export async function upsertOneModelVersion(
  modelId: Models_Model,
  modelVersion: Models_ModelVersion,
) {
  const baseModelRecord = await findOrCreateOneBaseModel(
    modelVersion.baseModel,
  );

  const baseModelTypeRecord = modelVersion.baseModelType
    ? await findOrCreateOneBaseModelType(
      modelVersion.baseModelType,
      baseModelRecord.id,
    )
    : null;
  const modelRecord = await findOrCreateOneModelId(
    modelId,
    await findOrCreateOneModelType(modelId.type),
    modelId.creator ? await findOrCreateOneCreator(modelId.creator) : undefined,
  );

  return prisma.modelVersion.upsert({
    where: {
      id: modelVersion.id,
    },
    update: {
      name: modelVersion.name,
      baseModelId: baseModelRecord.id,
      baseModelTypeId: baseModelTypeRecord ? baseModelTypeRecord.id : undefined,
      publishedAt: modelVersion.publishedAt ?? undefined,
      nsfwLevel: modelVersion.nsfwLevel,
    },
    create: {
      id: modelVersion.id,
      modelId: modelRecord.id,
      name: modelVersion.name,
      baseModelId: baseModelRecord.id,
      baseModelTypeId: baseModelTypeRecord ? baseModelTypeRecord.id : undefined,
      publishedAt: modelVersion.publishedAt ?? undefined,
      nsfwLevel: modelVersion.nsfwLevel,
      images: {
        connectOrCreate: modelVersion.images.map((image) => ({
          where: { id: image.id },
          create: {
            id: image.id,
            url: image.url,
            nsfwLevel: image.nsfwLevel,
            width: image.width,
            height: image.height,
            hash: image.hash,
            type: image.type,
          },
        })),
      },
      files: {
        connectOrCreate: modelVersion.files.map((file) => ({
          where: { id: file.id },
          create: {
            id: file.id,
            sizeKB: file.sizeKB,
            name: file.name,
            type: file.type,
            downloadUrl: file.downloadUrl,
          },
        })),
      },
    },
  })
}

export async function deleteOneModelVersion(
  modelVersionId: number,
  modelId: number,
) {
  await prisma.modelVersion.delete({
    where: {
      id: modelVersionId,
    },
  });
  // Check if there is any modelVersion have same modelId
  const remainingModelVersions = await prisma.modelVersion.count({
    where: { modelId: modelId },
  });

  // delete modelId if it has no modelversion records in database
  if (remainingModelVersions === 0) {
    await prisma.model.delete({
      where: {
        id: modelId,
      },
    });
  }
}

type ModelInfo = {
  modelType: string;
  modelId: number;
  versionId: number;
  filePath: string;
  fileName: string;
};

/**
 * Extracts an array of basic model info by reading their related folders and file.
 * @param filePaths file path array
 * @returns An array contains some basic model info, will exclude invalid files.
 */
export function extractAllModelInfo(filePaths: string[]): ModelInfo[] {
  return filePaths
    .map((filePath) => {
      const normalizedPath = normalize(filePath);
      const parts = normalizedPath.split(sep);

      if (parts.length < 3) return null;

      const fileName = parts[parts.length - 1];
      if (!fileName.endsWith(".safetensors")) return null;

      return {
        modelType: parts[parts.length - 4],
        modelId: Number(parts[parts.length - 3]),
        versionId: Number(parts[parts.length - 2]),
        filePath: normalizedPath,
        fileName: fileName.replace(".safetensors", ""),
      };
    })
    .filter((info): info is ModelInfo => info !== null);
}

export async function scanModelsAndSyncToDb(modelsDir: string) {
  for await (
    const modelFile of expandGlob("*.safetensors", {
      includeDirs: true,
      root: modelsDir,
    })
  ) {
    const safetensors = extractAllModelInfo([modelFile.path]);
    for (let index = 0; index < safetensors.length; index++) {
      const modelInfo = safetensors[index];
      const isExistsInDb = await prisma.modelVersion.findUnique({
        where: {
          id: modelInfo.versionId,
        },
      });
      if (isExistsInDb === null) {
        const modelVersionJsonPath = getModelVersionJsonPath(
          modelInfo.modelType as ModelTypes,
          modelInfo.modelId,
          modelInfo.versionId,
        );
        if ((await exists(modelVersionJsonPath, { isFile: true })) === false) {
          console.log(
            `modelVersion ${modelInfo.versionId}'s json file doesn't exists, exclude from processing.`,
          );
          continue;
        }
        const modelVersionInfo = Models_ModelVersionSchema(
          JSON.parse(
            await readFile(modelVersionJsonPath, { encoding: "utf-8" }),
          ),
        );
        if (modelVersionInfo instanceof type.errors) {
          // hover out.summary to see validation errors
          // console.error(modelVersionInfo.summary)
          throw modelVersionInfo;
        }
        const modelIdJsonPath = getModelJsonPath(
          modelInfo.modelType as ModelTypes,
          modelInfo.modelId,
        );
        if ((await exists(modelIdJsonPath, { isFile: true })) === false) {
          console.log(
            `modelID ${modelInfo.modelId}'s json file doesn't exists, exclude from processing.`,
          );
          continue;
        }
        const modelIdInfo = Models_ModelSchema(
          JSON.parse(await readFile(modelIdJsonPath, { encoding: "utf-8" })),
        );
        if (modelIdInfo instanceof type.errors) {
          // hover out.summary to see validation errors
          // console.error(modelVersionInfo.summary)
          throw modelIdInfo;
        }
        await upsertOneModelVersion(modelIdInfo, modelVersionInfo);
      }
    }
  }
}
