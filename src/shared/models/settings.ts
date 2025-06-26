import { type } from "arktype";

// Settings - Start
export const SettingsSchema = type({
  MODELS_DIR: "string",
  CIVITAI_TOKEN: "string",
  HTTP_PROXY: "string",
});
export type Settings = typeof SettingsSchema.infer;
