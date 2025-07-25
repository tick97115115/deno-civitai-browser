import express from "express";
import cors from "cors";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { router } from "./orpc/router.ts";
import { onError } from "@orpc/server";
import { RPCHandler } from '@orpc/server/node'
import { join } from "@std/path";
import settings from "#settings";

const app = express();
app.use(cors());

// ORPC middleware
const handler = new RPCHandler(router)

app.use('/orpc', async (req, res, next) => {
  const { matched } = await handler.handle(req, res, {
    prefix: '/orpc',
    context: {},
  })

  if (matched) {
    return
  }

  next()
})

// ORPC OpenAPI setup
const OpenAPIEndpoint = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => console.error(error)),
  ],
});

app.use("/openapi", async (req, res, next) => {
  const { matched } = await OpenAPIEndpoint.handle(req, res, {
    prefix: "/openapi",
    context: {},
  });

  if (matched) {
    return;
  }

  next();
});

app.use("/media/:filename", (req, res, next) => {
  const { filename } = req.params;
  next();
  res.sendFile(filename, { root: join(settings.MODELS_DIR, "media") }, (err) => {
    if (err) {
      console.error("File not found:", err);
      res.status(404).send("File not found");
    }
  });
});

if (import.meta.main) {
  app.listen(3001, "127.0.0.1", () => console.log(`Server listening on port 3001`));
}
