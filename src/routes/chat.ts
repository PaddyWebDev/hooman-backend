import express, { Request, Response } from "express";
import { addMessage, getHistory } from "../utils/data";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
router.get("/get/:petId", (req: Request, res: Response) => {
  try {
    const { petId } = req.params;

    const history = getHistory(petId);


    return res.status(200).json({
      message: "Success",
      data: history,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post("/:petId", async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const { message } = req.body;

    // Save user message
    addMessage(petId, "user", message);

    const history = getHistory(petId);

    // Build conversation text (Gemini prefers plain context rather than role arrays)
    const context = `
You are a helpful assistant for pet owners. 
You know about their pets' activities (walks, meals, medications). 
Always answer in a friendly, contextual way using past conversation.

Chat history:
${history.map((m) => `${m.role}: ${m.content}`).join("\n")}

User: ${message}
Assistant:
`;

    // Ask Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(context);

    const reply = result.response.text() || "Sorry, I’m not sure.";

    // Save assistant reply
    addMessage(petId, "assistant", reply);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error generating response" });
  }
});

export default router;
