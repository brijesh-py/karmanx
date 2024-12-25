const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
const petsRouter = express.Router();
const speciesRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use("/pets", petsRouter);
app.use("/species", speciesRouter);

// RESPONSE
const response = ({ res, status = 200, message = "Success", ...data }) => {
  return res.status(status).json({
    status,
    message,
    ...data,
  });
};

// DUMMY DATA
let pets = [
  { petId: 1, name: "Buddy", species: "Dog", age: 3, adopted: false },
  { petId: 2, name: "Mittens", species: "Cat", age: 2, adopted: true },
];
let species = ["Dog", "Cat", "Rabbit"];

// CONTROLLERS
// Add a Pet to the Adoption List (Push)
const addPet = (req, res) => {
  const { name, species, age, adopted } = req.body;
  const pet = { petId: pets.length + 1, name, species, age, adopted };
  pets.push(pet);
  response({
    res,
    message: "Pet added successfully",
    pet,
  });
};

// Add a New Species to the Species List (Push)
const addSpecies = (req, res) => {
  const specie = req.body?.species;
  species.push(specie);
  response({
    res,
    message: "Species added successfully",
    species,
  });
};

// Calculate the Total Age of Pets (For Loop)
const getPetsTotalAge = (req, res) => {
  let totalAge = 0;
  pets.forEach((pet) => {
    totalAge += pet.age;
  });
  response({
    res,
    message: "Total age of pets",
    totalAge,
  });
};

// Find a Pet by ID (Find)
const getPetById = (req, res) => {
  const { petId } = req.params;
  const pet = pets?.find((pet) => pet?.petId == petId);
  response({
    res,
    message: "Pet found",
    pet,
  });
};

// Update the Adoption Status of a Pet (Update)
const updatePetAdoptionStatus = (req, res) => {
  const { petId, adopted } = req.body;
  const pet = pets?.find((pet) => pet?.petId == petId);
  pet.adopted = adopted;
  response({
    res,
    message: "Pet adoption status updated",
    pet,
  });
};

// Delete a Pet by ID (Find And Delete)
const deletePetById = (req, res) => {
  const { petId } = req.params;
  pets = pets?.filter((pet) => pet?.petId != petId);
  response({
    res,
    message: "Pet deleted",
    pets,
  });
};

// Delete All Adopted Pets (Delete)
const deleteAdoptedPets = (req, res) => {
  pets = pets?.filter((pet) => !pet?.adopted);
  response({
    res,
    message: "Adopted pets deleted",
    pets,
  });
};

//  ROUTES
petsRouter.post("/add", addPet);
petsRouter.get("/total-age", getPetsTotalAge);
petsRouter.get("/find/:petId", getPetById);
petsRouter.put("/update", updatePetAdoptionStatus);
petsRouter.delete("/delete/:petId", deletePetById);
petsRouter.delete("/delete-adopted", deleteAdoptedPets);
speciesRouter.post("/add", addSpecies);

app.listen(PORT, () => {
  console.warn(`Server is running on http://localhost:${PORT}`);
});
