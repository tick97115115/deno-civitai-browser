# How to establish a project composed of Prisma + React

## Preface

Recently I decided to migrate my old project [civitai-model-downloader](https://github.com/tick97115115/civitai-model-downloader) on to deno runtime, and I've tried a lot of ways to making those frameworks runs on deno in different project configurations.

Today I comes up an almost best mean to do this, I would divide into 2 parts: "Backend" and "Frontend".

## Frontend

_[react-vite-ts-template](https://github.com/denoland/react-vite-ts-template)_

The frontend part is kind of hassle, and I do not sugguest using vue on deno runtime, since vscode vue plugin incompatible with deno plugin, so there is no guarantee for DX (IntelliSense in vscode malfunctioning).

And for frontend build tool vite, there are some problem for "resolve.alias" option which makes it not resolve path properly. Which problem could be resolved by using "@deno/vite-plugin".

## Backend

### Prisma

Steps:

1. make a schema.prisma at first, generator should setting like below.

```prisma
generator client {
  provider = "prisma-client"  // new provider
  output   = "./src/prisma/generated"

  runtime = "deno"    // for deno based project must specify this runtime term
  moduleFormat = "esm"
}
```

2. config deno.json
   - "nodeModulesDir": "auto", // or manual, but if it could I suggest use "auto".
3. run `deno add --npm --allow-scripts prisma @prisma/client`
4. run `deno run -A npm:prisma migrate dev`

finish

## Misc

### setup deno project configuration for vscode.

open **.vscode/settings.json**, then add:

```json
{
  "deno.enable": true, // enable deno intelliSense
  "deno.lint": true, // enable deno lint
  "deno.codeLens.test": true, // enable deno test debug option
  "deno.envFile": ".env" // enable for vsode test auto import dotenv file.
}
```

[deno.envFile](https://github.com/denoland/vscode_deno/issues/1313)
