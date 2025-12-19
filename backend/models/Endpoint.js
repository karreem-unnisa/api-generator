import { getDB } from "../config/db.js";

export async function createEndpoint({ name, method, url, response_body }) {
  const db = getDB();
  const [result] = await db.execute(
    "INSERT INTO endpoints (name, method, url, response_body) VALUES (?, ?, ?, ?)",
    [name, method, url, response_body]
  );
  return result.insertId;
}

export async function getAllEndpoints() {
  const db = getDB();
  const [rows] = await db.execute("SELECT * FROM endpoints");
  return rows;
}

export async function getEndpointByUrl(url) {
  const db = getDB();
  const [rows] = await db.execute("SELECT * FROM endpoints WHERE url = ?", [url]);
  return rows[0];
}
