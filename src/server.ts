import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pets from "./routes/pet";
import activities from "./routes/activities";
import chat from "./routes/chat";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req: Request, res: Response) => {
  return res.send("🚀 Express + TypeScript + Prisma is running!");
});

app.use("/pet/", pets);
app.use("/activities/", activities);
app.use("/chat/", chat)

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
