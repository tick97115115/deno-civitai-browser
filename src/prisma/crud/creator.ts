import { prisma } from "../client.ts";

import type { Creators_Creator } from "#shared/models/civitai/mod.ts";

export async function upsertOneCreator(creator: Creators_Creator) {
  const record = creator.username
    ? await prisma.creator.upsert({
      where: {
        username: creator.username,
      },
      update: {
        link: creator.link ? creator.link : undefined,
        image: creator.image ? creator.image : undefined,
      },
      create: {
        username: creator.username,
        link: creator.link ? creator.link : undefined,
        image: creator.image ? creator.image : undefined,
      },
    })
    : undefined;
  return record;
}

export async function findOrCreateOneCreator(creator: Creators_Creator) {
  const record = creator.username
    ? await prisma.creator.upsert({
      where: {
        username: creator.username,
      },
      update: {},
      create: {
        username: creator.username,
        link: creator.link ? creator.link : undefined,
        image: creator.image ? creator.image : undefined,
      },
    })
    : undefined;
  return record;
}
