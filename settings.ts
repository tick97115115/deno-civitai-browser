import Conf from "conf";
import { join } from "node:path";
import { type Settings, SettingsSchema } from "#shared/models/settings.ts";

type ConfigAccess = {
  get store(): Settings;
  set store(data: Settings);
  get MODELS_DIR(): string;
  set MODELS_DIR(data);
  get CIVITAI_TOKEN(): string | null;
  set CIVITAI_TOKEN(data);
  get HTTP_PROXY(): string | null;
  set HTTP_PROXY(data);
};

const config = new Conf({
  projectName: "deno-civitai-browser",
  rootSchema: {
    additionalProperties: true,
  },
  schema: {
    MODELS_DIR: {
      type: "string",
      default: join(import.meta.dirname!, "civitai_models"),
    },
    CIVITAI_TOKEN: {
      type: "string",
      default: "",
    },
    HTTP_PROXY: {
      type: "string",
      default: "",
    },
  },
  ajvOptions: {
    removeAdditional: true,
  },
});

const settings = {
  get store(): Settings {
    return SettingsSchema.assert(config.store);
  },
  set store(data: Settings) {
    config.set(data);
  },
  get MODELS_DIR(): string {
    return config.get("MODELS_DIR") as string;
  },
  set MODELS_DIR(data: string) {
    config.set("MODELS_DIR", data);
  },
  get CIVITAI_TOKEN(): string {
    return config.get("CIVITAI_TOKEN") as string;
  },
  set CIVITAI_TOKEN(data: string) {
    config.set("CIVITAI_TOKEN", data);
  },
  get HTTP_PROXY(): string {
    return config.get("HTTP_PROXY") as string;
  },
  set HTTP_PROXY(data: string) {
    config.set("HTTP_PROXY", data);
  },
} as ConfigAccess;

export default settings;
