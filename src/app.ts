import express from "express";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());

// ** Auth routes
app.use("/auth", authRoutes);

// ** Admin routes
app.use("/admin", adminRoutes);

export default app;
