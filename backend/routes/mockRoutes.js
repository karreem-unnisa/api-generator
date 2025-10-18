import express from "express";
import { getEndpointByUrl } from "../models/Endpoint.js";

const router = express.Router();

/**
 * Handle all HTTP methods for dynamic mock endpoints
 * Example: GET /mock/users
 */
router.all("/:endpoint", async (req, res) => {
  try {
    // Fetch endpoint from database
    const endpoint = await getEndpointByUrl("/" + req.params.endpoint);

    if (!endpoint) {
      return res.status(404).json({ message: "Mock API not found" });
    }

    // Parse response_body if it's stored as string, otherwise use as is
    let responseData;
    if (typeof endpoint.response_body === "string") {
      try {
        responseData = JSON.parse(endpoint.response_body);
      } catch (err) {
        console.error("JSON parse error:", err);
        return res.status(500).json({ message: "Invalid JSON in response_body" });
      }
    } else {
      responseData = endpoint.response_body;
    }

    res.json(responseData);
  } catch (error) {
    console.error("Mock Route Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
