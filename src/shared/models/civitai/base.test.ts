import { ModelTypesArray, ModelTypesSchema } from "./base.ts";
import { assert } from "@std/assert";
import { type } from "arktype";

Deno.test("check if could type.enumerated(...Array)", () => {
  for (let index = 0; index < ModelTypesArray.length; index++) {
    const element = ModelTypesArray[index];
    assert((ModelTypesSchema(element) instanceof type.errors) !== true);
  }
});
