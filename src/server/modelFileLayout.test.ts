import { resolve } from "@std/path";
import { assertEquals } from "@std/assert";
import { scanLocalModels } from "./modelFileLayout.ts";

Deno.test("resolve path", () => {
  assertEquals(resolve("C:\\foo", "bar", "baz", "..", ".."), "C:\\foo");
})

Deno.test({name: "scan models", async fn() {
  await scanLocalModels()
},sanitizeResources: true})