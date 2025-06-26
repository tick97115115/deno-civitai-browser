import express from "express";
import cors from "cors";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { router } from "./orpc/router.ts";
import { onError } from "@orpc/server";

const app = express();
app.use(cors());

const handler = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => console.error(error)),
  ],
});

app.use("/orpc*", async (req, res, next) => {
  const { matched } = await handler.handle(req, res, {
    prefix: "/orpc",
    context: {},
  });

  if (matched) {
    return;
  }

  next();
});

if (import.meta.main) {
  app.listen(3000, () => console.log("Server listening on port 3000"));
}
