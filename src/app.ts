import express from "express";
import usersRouter from "./routes/users.routers";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// * Routes
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
