import express from "express";
import { addEndpoint, listEndpoints, updateEndpoint, deleteEndpoint } from "../controllers/endpointController.js";

const router = express.Router();

// Create a new endpoint
router.post("/", addEndpoint);

// List all endpoints
router.get("/", listEndpoints);

// Update an endpoint by ID
router.put("/:id", updateEndpoint);

// Delete an endpoint by ID
router.delete("/:id", deleteEndpoint);

export default router;
