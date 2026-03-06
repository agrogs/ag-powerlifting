import { getStore } from "@netlify/blobs";

export async function handler(event) {
  const store = getStore("ag-training");
  
  if (event.httpMethod === "GET") {
    try {
      const data = await store.get("userdata", { type: "json" });
      return { statusCode: 200, body: JSON.stringify(data || {}) };
    } catch {
      return { statusCode: 200, body: JSON.stringify({}) };
    }
  }

  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    await store.set("userdata", JSON.stringify(body));
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, body: "Method not allowed" };
}
