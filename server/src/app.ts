import express, { type Application } from "express";
import cors from "cors";

import todoRoutes from "./routes/v1/todos.js";
import { setupSwagger } from "./swagger/swagger.js";
import { errorHandler } from "./middleware/middleware.js";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  headers: ["Content-Type"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.method);
  res.json({ message: "Welcome to the Todos API!" });
});

app.get("/api/v1", (req, res) => {
  console.log(req.method);
  res.json({ message: "Welcome to the Todos API v1!" });
});

setupSwagger(app);

app.use("/api/v1", todoRoutes);

app.use(errorHandler);

export default app;
