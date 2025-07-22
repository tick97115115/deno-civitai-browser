import { type } from "arktype";
import { os } from "@orpc/server";
import { Models_ModelSchema, Models_ResponseSchema, Models_RequestOptsSchema } from "#shared/models/civitai/mod.ts";

export const queryLocalModels = os
  .route({ method: "GET", path: "/db/models" }).input(
    Models_RequestOptsSchema,
  )
  .output(Models_ResponseSchema).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const addOneModelRecord = os
  .route({
    method: "POST",
    path: "/db/model",
  }).input(Models_ModelSchema).handler(
    async ({ input, context }) => {
      throw new Error("unimplemented!");
    },
  );

export const updateOneModelRecord = os
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

export const deleteOneModelRecord = os
  .route({
    method: "DELETE",
    path: "/db/model",
  }).input(type({
    modelId: "number.integer",
    targetVersionId: "number.integer",
  })).handler(async ({ input, context }) => {
    throw new Error("unimplemented!");
  });

export const scanLocalModels = os
  .route({
    method: "GET",
    path: "/db/models/scan",
  }).output(type({ new_models_count: "number.integer" })).handler(
    async ({ Input, context }) => {
      throw new Error("unimplemented!");
    },
  );
