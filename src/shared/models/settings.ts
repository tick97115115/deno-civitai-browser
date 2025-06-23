import { type } from "arktype";

// Settings - Start
export const SettingsSchema = type({
  basePath: "string",
  civitaiToken: "string",
  httpProxy: "string",
});
export type Settings = typeof SettingsSchema.infer;
