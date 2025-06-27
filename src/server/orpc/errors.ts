// server side
import { type } from "arktype";
import { ORPCError, os } from "@orpc/server";

const base = os.errors({ // <-- common errors
  RATE_LIMITED: {
    data: type({
      retryAfter: "number",
    }),
  },
  UNAUTHORIZED: {},
});

const rateLimit = base.middleware(async ({ next, errors }) => {
  throw errors.RATE_LIMITED({
    message: "You are being rate limited",
    data: { retryAfter: 60 },
  });
  return next();
});

const example = base
  .use(rateLimit)
  .errors({
    NOT_FOUND: {
      message: "The resource was not found", // <-- default message
    },
  })
  .handler(async ({ input, errors }) => {
    throw errors.NOT_FOUND();
  });
