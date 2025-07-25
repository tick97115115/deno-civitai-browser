import {
  deleteOneModelVersion,
  extractAllModelInfo,
  scanModelsAndSyncToDb,
  upsertOneModelVersion,
} from "./modelVersion.ts";
import { Models_ResponseSchema, Models_ModelSchema } from "#shared/models/civitai/mod.ts";
import { assertEquals } from "@std/assert";
import { prisma } from "../client.ts";
import apires from "./models_res.json" with {type: "json"};

Deno.test({
  name: "modelVersion database operation",
  async fn(t) {
    Models_ResponseSchema.assert(apires)

    const modelData = Models_ModelSchema.assert(apires.items[0])
    
    const modelVersionData = modelData.modelVersions[0]!;
    await t.step("upsert 1 model version", async () => {
      const modelVerRec = await upsertOneModelVersion(modelData, modelVersionData);
      // check Model table
      
      assertEquals(modelVerRec.id, modelVersionData.id);
      const modelRec = await prisma.model.findFirst({
        where: { name: modelData.name },
      });
      // check ModelVersion table
      assertEquals(modelRec?.id, modelData.id);
      const baseModelRec = await prisma.baseModel.findFirst({
        where: { name: modelVersionData.baseModel },
      });
      // check BaseModel table
      assertEquals(baseModelRec?.name, modelVersionData.baseModel);
      // check BaseModel table
      if (modelVersionData.baseModelType) {
        const baseModelTypeRec = await prisma.baseModelType.findFirst({
          where: { name: modelVersionData.baseModelType },
        });
        assertEquals(baseModelTypeRec?.name, modelVersionData.baseModelType);
      }
      // check Creator table
      if (modelData.creator?.username) {
        const creatorRec = await prisma.creator.findFirst({
          where: { username: modelData.creator?.username },
        });
        assertEquals(creatorRec?.username, modelData.creator.username)
      }
      // check ModelType table
      const modelTypeRec = await prisma.modelType.findFirst({where: {name: modelData.type}})
      assertEquals(modelTypeRec?.name, modelData.type)
      // check modelVersionFile Table
      const modelVersionFileRec = await prisma.modelVersionFile.findFirst({where: {name: modelVersionData.files[0].name}})
      assertEquals(modelVersionFileRec?.name, modelVersionData.files[0].name)
      // check ModelVersionImage
      const modelVersionImageRec = await prisma.modelVersionImage.findFirst({where: {url: modelVersionData.images[0].url}})
      assertEquals(modelVersionImageRec?.url, modelVersionData.images[0].url)
      // check Tag table
      const tagRec = await prisma.tag.findFirst({where: {name: modelData.tags[0]}})
      assertEquals(tagRec?.name, modelData.tags[0])
    });

    await t.step("delete 1 model version.", async () => {
      await deleteOneModelVersion(modelVersionData.id, modelData.id)
      const modelVerFind = await prisma.modelVersion.findFirst({where: {id: modelVersionData.id}})
      assertEquals(modelVerFind, null)
    });
  },
  sanitizeResources: true,
});
