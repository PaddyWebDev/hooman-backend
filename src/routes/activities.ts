  import express, { Express, Request, Response } from "express";
import { activities, generateId, pets } from "../utils/data";

const app: Express = express();

app.post("/create/:id", async (request: Request, response: Response) => {
  try {
    const petId = request.params.id;
    if (!petId) return response.send("Pet Id is required").status(400);

    if (!pets.has(petId)) return response.send("Pet not found").status(404);

    const { activity, value, performedAt } = request.body;
    const generatedId = generateId();
    activities.set(generatedId, {
      id: generatedId,
      type: activity,
      performedAt,
      value,
      petId,
    });

    return response.json({
      message: "Activity Created Successfully",
      data: {
            id: generatedId,
      type: activity,
      performedAt,
      value,
      petId,
      }
    }).status(201);
  } catch (error) {
    return response
      .json({
        message: "Internal Server Error",
      })
      .status(500);
  }
});

app.put("/update/:id", async (request: Request, response: Response) => {
  try {
    const activityId = request.params.id;
    const { activity, value } = request.body;

    if (!activityId)
      return response.send("Activity Id is required").status(400);

    const existingActivity = activities.get(activityId);
    if (!existingActivity) {
      return response.status(404).send("Activity not found");
    }

    const updatedActivity = {
      ...existingActivity,
      type: activity ?? existingActivity.type,
      value: value ?? existingActivity.value,
    };

    activities.set(activityId, updatedActivity);

    return response.send("Activity updated successfully").status(200);
  } catch (error) {
    return response.send("Internal Server Error").status(500);
  }
});

app.delete("/delete/:id", async (request: Request, response: Response) => {
  try {
    const activityId = request.params.id;
    activities.delete(activityId);
    return response.send("Activity deleted successfully").status(200);
  } catch (error) {
    return response.send("Internal Server Error").status(500);
  }
});

export default app;
