import {
  deleteOneModelVersion,
  extractAllModelInfo,
  scanModelsAndSyncToDb,
  upsertOneModelVersion,
} from "./modelVersion.ts";
import { assert } from "@std/assert";

Deno.test("modelVersion database operation", async (t) => {
  await t.step("upsert 1 model version", async () => {
    // const rec = await upsertOneModelVersion()
  })

  await t.step("delete 1 model version.", async () => {
    // const rec = await deleteOneModelVersion()
  })
})