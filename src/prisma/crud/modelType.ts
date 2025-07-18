import { prisma } from "../client.ts";

export function findOrCreateOneModelType(modelTypeString: string) {
  return prisma.modelType.upsert({
    where: {
      name: modelTypeString,
    },
    update: {},
    create: {
      name: modelTypeString,
    },
  });
}
