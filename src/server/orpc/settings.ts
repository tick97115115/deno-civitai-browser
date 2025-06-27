import { os } from "@orpc/server";
import settings from "#settings";
import { SettingsSchema } from "#shared/models/settings.ts";

export const newSettings = os
  .route({ method: "PUT", path: "/settings" })
  .input(SettingsSchema)
  .handler(({ input }) => {
    settings.store = input;
  }).callable({ context: {} });

export const getSettings = os
  .route({ method: "GET", path: "/settings" })
  .output(SettingsSchema).handler(() => {
    return settings.store;
  }).callable({ context: {} });
