import express from "express";
import { addEndpoint, listEndpoints, updateEndpoint, deleteEndpoint } from "../controllers/endpointController.js";

const router = express.Router();

router.post("/", addEndpoint);

router.get("/", listEndpoints);

router.put("/:id", updateEndpoint);

router.delete("/:id", deleteEndpoint);

export default router;
