import { prisma } from "../client.ts";

export async function findOrCreateOneModelType(modelTypeString: string) {
  const record = await prisma.modelType.upsert({
    where: {
      name: modelTypeString,
    },
    update: {},
    create: {
      name: modelTypeString,
    },
  });
  return record;
}
