export enum ActivityType {
  WALK = "WALK",
  MEAL = "MEAL",
  MEDICATION = "MEDICATION",
}
export interface Activity {
  id: string;
  type: ActivityType;
  value: number; // minutes for WALK, units for MEAL/MED
  performedAt: Date;
  petId: string;
}

export interface Pet {
  id: string;
  name: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}
