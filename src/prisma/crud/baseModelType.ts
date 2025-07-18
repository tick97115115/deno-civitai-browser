import { prisma } from "../client.ts";

export function findOrCreateOneBaseModelType(
  baseModelTypeString: string,
  baseModelId: number,
) {
  return prisma.baseModelType.upsert({
    where: {
      name: baseModelTypeString,
    },
    update: {},
    create: {
      name: baseModelTypeString,
      baseModelId: baseModelId,
    },
  });
}
