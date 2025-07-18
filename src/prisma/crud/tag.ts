import { prisma } from "#prisma/client.ts";

export function searchTag(tag: string) {
  return prisma.tag.findMany({
    where: {
      name: {
        contains: tag,
      },
    },
  });
}
