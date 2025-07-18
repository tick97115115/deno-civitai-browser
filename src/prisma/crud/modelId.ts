import type {
  ModelId_Model,
  Models_RequestOpts,
} from "#shared/models/civitai/mod.ts";
import { prisma } from "../client.ts";
import { Prisma } from "#prisma/generated/client.ts";

export function findOrCreateOneModelId(
  modelId: ModelId_Model,
  modelType: Prisma.ModelTypeModel,
  creator?: Prisma.CreatorModel,
) {
  return prisma.model.upsert({
    where: {
      id: modelId.id,
    },
    update: {},
    create: {
      id: modelId.id,
      name: modelId.name,
      creatorId: creator ? creator.id : null,
      typeId: modelType.id,
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
}

export async function findManyModels(params: Models_RequestOpts) {
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
      skip: params.page && params.limit
        ? (params.page - 1) * params.limit
        : undefined,
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
