import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import estudiantesRouter from "./routes/estudiantes.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:4200"  // permitimos las peticiones desde Angular
}));

// Rutas
app.use("/api/estudiantes", estudiantesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
