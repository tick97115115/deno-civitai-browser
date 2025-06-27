import { ModelTypesArray, ModelTypesSchema } from "./base.ts";
import { assert, assertThrows } from "@std/assert";
import { type } from "arktype";

// const a: ModelTypes = ""  // no type hint

Deno.test("check if could type.enumerated(...Array)", () => {
  for (let index = 0; index < ModelTypesArray.length; index++) {
    const element = ModelTypesArray[index];
    assert((ModelTypesSchema(element) instanceof type.errors) !== true);
  }
  assertThrows(() => {
    const out = ModelTypesSchema("123");
    if (out instanceof type.errors) {
      console.log(out.summary);
    }
    ModelTypesSchema.assert("123");
  });
});
