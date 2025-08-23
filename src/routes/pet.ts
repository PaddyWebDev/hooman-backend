import express, { Express, Request, response, Response } from "express";
import { generateId, getActivitiesByPetId, pets } from "../utils/data";

const app: Express = express();

// create a pet

app.post("/create", async (request: Request, response: Response) => {
  try {
    const { name } = request.body;
    const generatedId = generateId();
    pets.set(generatedId, {
      id: generatedId,
      name,
    });
    return response.send("Pet Created Successfully").status(201);
  } catch (error) {
    return response.send("Internal Server Error").status(500);
  }
});

app.get("/get/all", (req: Request, res: Response) => {
  try {
    const allPets = Array.from(pets.values());

    if (allPets.length === 0) return res.send("No data found").status(400);

    return res.status(200).json({
      message: "Success",
      data: allPets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get/:id", async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    if (!id) return response.send("Pet Id is required").status(400);
    const petDetails = pets.get(id);
    const payload = {
      petDetails,
      activityDetails: getActivitiesByPetId(id),
    };
    return response
      .json({
        message: "Success",
        data: payload,
      })
      .status(200);
  } catch (error) {
    return response.send("Internal Server Error").status(500);
  }
});

app.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const petId = req.params.id;
    const { name } = req.body;

    if (!petId) {
      return res.status(400).send("Pet ID is required");
    }

    const existingPet = pets.get(petId);
    if (!existingPet) {
      return res.status(404).send("Pet not found");
    }

    const updatedPet = {
      ...existingPet,
      name: name ?? existingPet.name, // only update if provided
    };

    pets.set(petId, updatedPet);

    return res.status(200).json({
      message: "Pet updated successfully",
      pet: updatedPet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
export default app;
