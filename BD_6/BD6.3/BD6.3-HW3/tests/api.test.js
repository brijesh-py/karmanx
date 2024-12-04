const { app, getRecipes, getRecipeById, addRecipe } = require("../app");
const http = require("http");
const supertest = require("supertest");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addRecipe: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
}, 10000);

afterAll((done) => {
  server.close(done);
}, 10000);

describe("Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4 : Test Get All Recipes
  it("Should retrieve all Recipes", async () => {
    const mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];
    getRecipes.mockResolvedValue();
    const response = await supertest(server).get("/recipes");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockRecipes);
  });

  // Exercise 5 : Test Get Recipe by ID
  it("Should retrieve a specific Recipe by ID", async () => {
    const mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };
    getRecipeById.mockResolvedValue();
    const response = await supertest(server).get("/Recipes/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockRecipe);
  });

  // Exercise 6 : Test Get Recipe by Non-Existent ID
  it("Should expected undefined by non-existent ID", async () => {
    getRecipeById.mockResolvedValue();
    const response = await supertest(server).get("/Recipes/details/3");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "No Recipe found" });
  });

  // Exercise 7 : Test Add New Recipe
  it("Should retrieve newest added Recipe", async () => {
    const mockRecipe = {
      name: "Samosa",
      cuisine: "Indian",
      difficulty: "Medium",
    };
    addRecipe.mockResolvedValue();
    const response = await supertest(server)
      .post("/recipes/new")
      .send(mockRecipe);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({ id: 3, ...mockRecipe });
  });
});
