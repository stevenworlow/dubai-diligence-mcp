#!/usr/bin/env node
/**
 * Smallest possible MCP client for the Dubai Diligence server.
 *
 * No dependencies, no key, no install. It exists so that anyone evaluating the server can see a
 * real request and a real answer in ten seconds, rather than reading a schema and guessing.
 *
 *   node examples/query.mjs                          # list the tools
 *   node examples/query.mjs dubai_price_split '{"community":"Palm Jumeirah"}'
 */
const ENDPOINT = "https://dubaidiligence.com/api/mcp";

async function rpc(method, params) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
  });
  const body = await res.json();
  if (body.error) throw new Error(`${body.error.code}: ${body.error.message}`);
  return body.result;
}

const [tool, argsJson] = process.argv.slice(2);

if (!tool) {
  const { tools } = await rpc("tools/list");
  console.log("Tools on the Dubai Diligence MCP server:\n");
  for (const t of tools) console.log(`  ${t.name}\n    ${t.description.split(". ")[0]}.\n`);
  console.log(`Try:  node examples/query.mjs dubai_price_split '{"community":"Dubai Marina"}'`);
} else {
  const result = await rpc("tools/call", { name: tool, arguments: argsJson ? JSON.parse(argsJson) : {} });
  console.log(result.content.map((c) => c.text).join("\n"));
}
