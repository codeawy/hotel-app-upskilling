import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import swaggerSpec from "./config/swagger";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ** Swagger configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ** Auth routes
app.use("/auth", authRoutes);

// ** Admin routes
app.use("/admin", adminRoutes);

export default app;
