import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { connectDB } from "./config";
import { errorHandler, logger, validateRequest } from "./middlewares";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

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
