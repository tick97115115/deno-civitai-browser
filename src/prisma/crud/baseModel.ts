import { prisma } from "../client.ts";

export function findOrCreateOneBaseModel(baseModelString: string) {
  return prisma.baseModel.upsert({
    where: {
      name: baseModelString,
    },
    update: {},
    create: {
      name: baseModelString,
    },
  });
}
