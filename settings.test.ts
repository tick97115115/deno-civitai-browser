import { assert, assertEquals, assertObjectMatch } from "@std/assert";
import { type Settings, SettingsSchema } from "#shared/models/settings.ts";
import settings from "#settings";

Deno.test("import.meta.dirname", () => {
  console.info(import.meta.dirname);
  assertEquals(typeof import.meta.dirname, "string");
});

Deno.test("test settings", async (t) => {
  const oldConf: Settings = settings.store;
  const newConf: Settings = {
    CIVITAI_TOKEN: "this is token",
    HTTP_PROXY: "this is proxy",
    MODELS_DIR: "this is dir",
  };
  await t.step("check if all config data could be fetch.", () => {
    assert(SettingsSchema(oldConf));
  });
  await t.step("replace with test conf data check if works", () => {
    try {
      settings.store = newConf;
      assertObjectMatch(settings.store, newConf);
    } finally {
      settings.store = oldConf;
    }
  });
});
