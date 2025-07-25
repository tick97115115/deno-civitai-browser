import { type } from "arktype";
import { os } from "@orpc/server";
import {
  Models_ModelSchema,
  Models_RequestOptsSchema,
  Models_ResponseSchema,
} from "#shared/models/civitai/mod.ts";
import { scanLocalModels } from "../modelFileLayout.ts";

export const queryLocalModelsRoute = os
  .route({ method: "GET", path: "/db/models" }).input(
    Models_RequestOptsSchema,
  )
  .output(Models_ResponseSchema).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const addOneModelRecordRoute = os
  .route({
    method: "POST",
    path: "/db/model",
  }).input(Models_ModelSchema).handler(
    async ({ input, context }) => {
      throw new Error("unimplemented!");
    },
  );

export const updateOneModelRecordRoute = os
  .route({
    method: "PUT",
    path: "/db/model",
  }).input(
    type({
      targetVersionId: "number.integer",
      model: Models_ModelSchema,
    }),
  ).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const deleteOneModelRecordRoute = os
  .route({
    method: "DELETE",
    path: "/db/model",
  }).input(type({
    modelId: "number.integer",
    targetVersionId: "number.integer",
  })).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const scanLocalModelsRoute = os
  .route({
    method: "GET",
    path: "/db/models/scan",
  }).output(type({ new_models_count: "number.integer" })).handler(
    async ({ input, context }) => {
      const count = await scanLocalModels();
      return { new_models_count: count };
    },
  ).callable({ context: {} });
