import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import endpointRoutes from "./routes/endpointRoutes.js";
import mockRoutes from "./routes/mockRoutes.js";


const app = express();
await connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/endpoints", endpointRoutes);
app.use("/mock", mockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
