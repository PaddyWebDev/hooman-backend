# 🐾 Pet Activity Tracker – Backend

The backend is built with **Express + TypeScript**.  
It manages pets, activities, and contextual chat memory with AI.

---

## Features

- Register pets and log their activities (walk, meal, medication).
- Fetch daily activity summaries.
- Contextual AI chatbot (OpenAI or Gemini).
- In-memory datastore (no DB required per spec).
- API-first design, easily extensible.

---

## Setup

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

PORT=4000
OPENAI_API_KEY=your_openai_key # or GEMINI_API_KEY if using Google Gemini

---

## API endpoints

- POST /pets/create → Register a new pet
- GET /pets/:id → Fetch pet details & activities
- POST /activities/create → Log activity for a pet
- PUT /activities/update/:id → Update activity
- GET /chat/:petId → Get all chat history for a pet
- POST /chat/:petId → Send a message to chatbot
