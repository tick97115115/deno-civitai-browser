import { getSettings, newSettings } from "./settings.ts";
import { Settings, SettingsSchema } from "#shared/models/settings.ts";
import { assert, assertObjectMatch } from "@std/assert";
import settings from "#settings";

Deno.test.ignore("getsettings procedure test.", async (t) => {
  const oldSettings = SettingsSchema.assert(await getSettings());
  assert(oldSettings);
  await t.step("test newSettings", async () => {
    try {
      const newConf: Settings = {
        CIVITAI_TOKEN: "t",
        HTTP_PROXY: "t",
        MODELS_DIR: "t",
      };
      await newSettings(newConf);
      assertObjectMatch(await getSettings(), newConf);
    } finally {
      settings.store = oldSettings;
    }
  });
});
