import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { type Router } from "#server/orpc/router.ts";

const link = import.meta.env.PROD ? 
new RPCLink({
  url: `${globalThis.location.origin}/orpc`,
  headers: { Authorization: 'Bearer token' },
}) : 
new RPCLink({
  url: 'http://127.0.0.1:3001/orpc',
  headers: { Authorization: 'Bearer token' },
});

export const orpc: RouterClient<Router> = createORPCClient(link)