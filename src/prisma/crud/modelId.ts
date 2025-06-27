import type { ModelId_Model } from "#shared/models/civitai/mod.ts";
import { LocalModels_RequestOpts } from "#shared/models/orpc.ts";
import { prisma } from "../client.ts";
import { findOrCreateOneCreator } from "./creator.ts";
import { findOrCreateOneModelType } from "./modelType.ts";

export async function findOrCreateOneModelId(modelId: ModelId_Model) {
  const creatorRecord = modelId.creator
    ? await findOrCreateOneCreator(modelId.creator)
    : undefined;
  const modelTypeRecord = await findOrCreateOneModelType(modelId.type);

  const record = await prisma.model.upsert({
    where: {
      id: modelId.id,
    },
    update: {},
    create: {
      id: modelId.id,
      name: modelId.name,
      creatorId: creatorRecord ? creatorRecord.id : undefined,
      typeId: modelTypeRecord.id,
      nsfw: modelId.nsfw,
      nsfwLevel: modelId.nsfwLevel,
      tags: {
        connectOrCreate: modelId.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
  return record;
}

export async function findManyModels(params: LocalModels_RequestOpts) {
  const [records, totalCount] = await prisma.$transaction([
    prisma.model.findMany({
      where: {
        name: {
          contains: params.query,
        },
        tags: {
          some: {
            name: { in: params.tag },
          },
        },
        creator: {
          username: params.username,
        },
        type: {
          name: { in: params.types },
        },
        nsfw: params.nsfw,
        modelVersions: {
          some: {
            baseModel: {
              name: { in: params.baseModels },
            },
          },
        },
      },
      skip: (params.page - 1) * params.limit,
      take: params.limit,

      include: {
        creator: true,
        modelVersions: true,
        tags: true,
        type: true,
      },
    }),
    prisma.model.count({
      where: {
        name: {
          contains: params.query,
        },
        tags: {
          some: {
            name: { in: params.tag },
          },
        },
        creator: {
          username: params.username,
        },
        type: {
          name: { in: params.types },
        },
        nsfw: params.nsfw,
        modelVersions: {
          some: {
            baseModel: {
              name: { in: params.baseModels },
            },
          },
        },
      },
    }),
  ]);
  return { records, totalCount };
}
