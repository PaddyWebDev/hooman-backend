import { v4 as uuidv4 } from "uuid";
import { Activity, ChatMessage, Pet } from "../types/data";

// In-memory store
export const pets: Map<string, Pet> = new Map();
export const activities: Map<string, Activity> = new Map();

export function generateId(): string {
  return uuidv4();
}
export function getActivitiesByPetId(petId: string): Activity[] {
  return Array.from(activities.values()).filter((a) => a.petId === petId);
}

export const chatHistories: Map<string, ChatMessage[]> = new Map();

export function addMessage(
  petId: string,
  role: ChatMessage["role"],
  content: string
) {
  const messages = chatHistories.get(petId) || [];
  messages.push({ role, content, timestamp: new Date() });
  chatHistories.set(petId, messages);
}

export function getHistory(petId: string): ChatMessage[] {
  return chatHistories.get(petId) || [];
}

export function clearHistory(petId: string) {
  chatHistories.delete(petId);
}
