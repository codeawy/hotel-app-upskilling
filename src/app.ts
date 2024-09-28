import express from "express";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import swaggerSpec from "./config/swagger";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";

const app = express();

// Basic middlewares
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cors());

// Security middlewares
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Logging middleware
app.use(morgan("dev"));

// Compression middleware
app.use(compression());

// Swagger configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

export default app;
