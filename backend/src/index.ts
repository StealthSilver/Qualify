import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connectDB } from "./config";
import { errorHandler, logger, validateRequest } from "./middlewares";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const defaultDevOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
];

function corsOrigin(): string | string[] {
  const raw = process.env.FRONTEND_URL?.trim();
  if (!raw) return defaultDevOrigins;
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) return defaultDevOrigins;
  return list.length === 1 ? list[0]! : list;
}

app.use(cors({
  origin: corsOrigin(),
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(validateRequest);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Spardha API",
    version: "1.0.0",
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
