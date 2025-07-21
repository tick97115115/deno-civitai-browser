import { resolve } from "@std/path";
import { assertEquals } from "@std/assert";

Deno.test("resolve path", () => {
  assertEquals(resolve("C:\\foo", "bar", "baz", "..", ".."), "C:\\foo");
})