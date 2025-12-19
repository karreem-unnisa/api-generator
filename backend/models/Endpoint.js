import { getDB } from "../config/db.js";

export async function createEndpoint({ name, method, url, response_body }) {
  const db = getDB();
  const [result] = await db.execute(
    "INSERT INTO endpoints (name, method, url, response_body) VALUES (?, ?, ?, ?)",
   [name, method, url, JSON.stringify(response_body)]

  );
  return result.insertId;
}

export async function getAllEndpoints() {
  const db = getDB();
  const [rows] = await db.execute("SELECT * FROM endpoints");
return rows.map(r => {
  try {
    return {
      ...r,
      response_body: JSON.parse(r.response_body)
    };
  } catch {
    return {
      ...r,
      response_body: r.response_body // fallback
    };
  }
});


}

export async function getEndpointByUrl(url) {
  const db = getDB();
  const [rows] = await db.execute("SELECT * FROM endpoints WHERE url = ?", [url]);
  return rows[0];
}
