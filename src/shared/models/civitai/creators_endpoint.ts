import { type } from "arktype";

export const Creators_CreatorSchema = type({
  username: "string | null",
  "modelCount?": "number.integer",
  "link?": "string.url",
  image: "string | null",
});
export type Creators_Creator = typeof Creators_CreatorSchema.infer;

export const Creators_ResponseSchema = type({
  items: Creators_CreatorSchema.array(),
  metadata: {
    totalItems: "number.integer",
    currentPage: "number.integer",
    pageSize: "number.integer",
    totalPages: "number.integer",
    "nextPage?": "string.url",
    "prevPage?": "string.url",
  },
});
export type Creators_Response = typeof Creators_ResponseSchema.infer;

export const Creators_RequestOptsSchema = type({
  "limit?": "number.integer",
  "page?": "number.integer",
  "query?": "string",
});
export type Creators_RequestOpts = typeof Creators_RequestOptsSchema.infer;
