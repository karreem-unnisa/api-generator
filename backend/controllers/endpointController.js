import { getDB } from "../config/db.js";
import { createEndpoint, getAllEndpoints } from "../models/Endpoint.js";


export async function addEndpoint(req, res) {
  try {
    const { name, method, url, response_body } = req.body;
    if (!name || !method || !url || !response_body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const id = await createEndpoint({ name, method, url, response_body });
    res.status(201).json({ id, message: "Endpoint created successfully" });
  } catch (error) {
    console.error("Add Endpoint Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function listEndpoints(req, res) {
  try {
    const endpoints = await getAllEndpoints();
    res.json(endpoints);
  } catch (error) {
    console.error("List Endpoints Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function updateEndpoint(req, res) {
  try {
    const { id } = req.params;
    const { name, method, url, response_body } = req.body;

    if (!name || !method || !url || !response_body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = getDB();
    const [result] = await db.execute(
      "UPDATE endpoints SET name=?, method=?, url=?, response_body=? WHERE id=?",
      [name, method, url, JSON.stringify(response_body), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    res.json({ message: "Endpoint updated successfully" });
  } catch (error) {
    console.error("Update Endpoint Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export async function deleteEndpoint(req, res) {
  try {
    const { id } = req.params;
    const db = getDB();
    const [result] = await db.execute("DELETE FROM endpoints WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    res.json({ message: "Endpoint deleted successfully" });
  } catch (error) {
    console.error("Delete Endpoint Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
