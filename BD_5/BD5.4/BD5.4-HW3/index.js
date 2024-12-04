const dotenv = require("dotenv");
// CONFIG .ENV
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib");
const Chef = require("./models/chef.model");
const Dish = require("./models/dish.model");

// INITIALIZING SERVER
const app = express();
const PORT = process.env.PORT || 5000;

//  ROUTERs
const chefRouter = express.Router();
const dishRouter = express.Router();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use("/chefs", chefRouter);
app.use("/dishes", dishRouter);

// HTTPS STATUS CODES RESPONSE
const HTTPS_STATUS_CODES = {
  RESPONSE_OK: 200,
  RESOURCE_CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// RESPONSE MESSAGES
const MESSAGES = {
  REQUIRED: "Required field is missing.",
  NOT_FOUND: "Resource not found.",
  CONFLICT: "Already resource exists",
  BAD_REQUEST: "Invalid request. Please check your input.",
  INTERNAL_SERVER: "An internal server error occurred. Please try again later.",
};

// ERROR HANDLING
class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES?.BAD_REQUEST_ERROR,
    message = "An error occurred",
  }) {
    super(message);
    this.status = status;
  }
}
const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (process.env.ENV != "development") {
      console.log(error);
    }
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: MESSAGES?.INTERNAL_SERVER,
      });
    }
  }
};

// DUMMY DATA
const dishesData = [
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    preparationTime: 20,
  },
  {
    name: "Sushi",
    cuisine: "Japanese",
    preparationTime: 50,
  },
  {
    name: "Poutine",
    cuisine: "Canadian",
    preparationTime: 30,
  },
];
const chefsData = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

// CONTROLLERS
// Exercise 1: Create New Chef
const createChef = (req, res) => {
  const name = req.body?.name;
  const birthYear = parseInt(req.body?.birthYear);
  errorHandler(res, async () => {
    if (!name || !birthYear) {
      throw new HttpError({ message: MESSAGES.REQUIRED });
    }
    const chef = { name, birthYear };
    const newChef = await Chef.create(chef);
    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Chef created successfully",
      newChef,
    });
  });
};

// Exercise 2: Update Chef by ID
const updateChef = (req, res) => {
  const name = req.body?.name;
  const birthYear = parseInt(req.body?.birthYear);
  const id = parseInt(req.params.id);
  errorHandler(res, async () => {
    if (isNaN(id) || !name || !birthYear) {
      throw new HttpError({ message: MESSAGES.REQUIRED });
    }

    const isChefExists = await Chef.findOne({ where: { id } });
    if (!isChefExists) {
      throw new HttpError({
        status: HTTPS_STATUS_CODES?.NOT_FOUND,
        message: MESSAGES?.NOT_FOUND,
      });
    }

    const chef = { name, birthYear };
    await Chef.update(chef, { where: { id } });
    res.status(HTTPS_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTPS_STATUS_CODES?.RESPONSE_OK,
      message: "Chef updated successfully",
      chef: { name, birthYear },
    });
  });
};

// CHEFS ROUTES
chefRouter.post("/new", createChef);
chefRouter.put("/update/:id", updateChef);

// SEED DATA
app.get("/seed_db", (req, res) => {
  errorHandler(res, async () => {
    await sequelize.sync({ force: true });
    await Dish.bulkCreate(dishesData);
    await Chef.bulkCreate(chefsData);

    res.status(HTTPS_STATUS_CODES?.RESOURCE_CREATE).json({
      status: HTTPS_STATUS_CODES?.RESOURCE_CREATE,
      message: "Database seeding successfully",
    });
  });
});

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
