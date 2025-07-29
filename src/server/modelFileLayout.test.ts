import { resolve } from "@std/path";
import { expandGlob } from "@std/fs";
import { assertEquals } from "@std/assert";
import { scanLocalModels } from "./modelFileLayout.ts";

Deno.test("resolve path", () => {
  assertEquals(resolve("C:\\foo", "bar", "baz", "..", ".."), "C:\\foo");
});

Deno.test.ignore({
  name: "glob",
  async fn() {
    // *.ts will only match root layer files, not nested directories
    // and I misunderstood the behavior of expandGlob's includeDirs option, it's not meant to include files in directories, but rather to include the directories themselves in the results.
    // so use **/* to match all target files in the directory tree.
    for await (
      const entry of expandGlob("*.ts", {
        root: String
          .raw`C:\Users\z005223c\source\repo\deno-proj\deno-civitai-browser\src`,
        includeDirs: true,
      })
    ) {
      assertEquals(entry.isFile, true);
    }
  },
  sanitizeResources: true,
});

Deno.test({
  name: "scan models",
  async fn() {
    await scanLocalModels();
  },
  sanitizeResources: true,
});
