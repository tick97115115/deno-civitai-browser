import type {
  ModelId_Image,
  Models_Image,
} from "#shared/models/civitai/mod.ts";
import { prisma } from "../client.ts";
import { extractFilenameFromUrl, removeFileExtension } from "#shared/utils.ts";

export async function createOrConnectImagesByModelIdEndpointInfo(
  modelVersionId: number,
  mediaArray: Array<ModelId_Image>,
) {
  const mediaArrayWithId: Array<Models_Image> = mediaArray.map((image) => {
    const imageFileName = extractFilenameFromUrl(image.url);
    const imageFileNameWithoutExt = removeFileExtension(imageFileName);
    return {
      id: Number(imageFileNameWithoutExt),
      ...image,
    };
  });
  const mvRecord = await prisma.modelVersion.update({
    where: {
      id: modelVersionId,
    },
    data: {
      images: {
        connectOrCreate: mediaArrayWithId.map((image) => ({
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
    },
    include: {
      images: true,
    },
  });
  return mvRecord.images;
}
