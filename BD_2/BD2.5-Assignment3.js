const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

//Router
const hotelRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/hotels", hotelRouter);

// Constants
const RESPONSE_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST_ERROR = 400;

// Dummy Data
const hotels = [
  {
    id: 1,
    name: "Romantic Getaway",
    category: "Resort",
    rating: 2.2,
    reviews: 4572,
    amenity: "Spa",
    price: 10464,
    country: "South Africa",
  },
  {
    id: 2,
    name: "Wellness Retreat",
    category: "Family",
    rating: 2.8,
    reviews: 2114,
    amenity: "Pool",
    price: 13243,
    country: "Australia",
  },
  {
    id: 3,
    name: "Romantic Getaway",
    category: "Luxury",
    rating: 3.1,
    reviews: 4359,
    amenity: "Restaurant",
    price: 3299,
    country: "Germany",
  },
  {
    id: 4,
    name: "Luxury Suites",
    category: "Family",
    rating: 4.9,
    reviews: 3651,
    amenity: "Bar",
    price: 16359,
    country: "United Kingdom",
  },
  {
    id: 5,
    name: "Luxury Suites",
    category: "Budget",
    rating: 4.6,
    reviews: 688,
    amenity: "Gym",
    price: 15570,
    country: "France",
  },
  {
    id: 6,
    name: "Cultural Heritage Hotel",
    category: "Boutique",
    rating: 2.0,
    reviews: 219,
    amenity: "Pet Friendly",
    price: 2321,
    country: "USA",
  },
  {
    id: 7,
    name: "Business Hotel",
    category: "Mid-Range",
    rating: 3.7,
    reviews: 1040,
    amenity: "Free WiFi",
    price: 4523,
    country: "India",
  },
  {
    id: 8,
    name: "Historic Plaza Hotel",
    category: "Mid-Range",
    rating: 3.5,
    reviews: 300,
    amenity: "Parking",
    price: 8543,
    country: "Australia",
  },
  {
    id: 9,
    name: "Adventure Resort",
    category: "Boutique",
    rating: 4.2,
    reviews: 1222,
    amenity: "Gym",
    price: 11894,
    country: "South Africa",
  },
  {
    id: 10,
    name: "Mountain Retreat",
    category: "Resort",
    rating: 4.8,
    reviews: 4015,
    amenity: "Spa",
    price: 17560,
    country: "India",
  },
  {
    id: 11,
    name: "Eco Friendly Lodge",
    category: "Family",
    rating: 2.4,
    reviews: 528,
    amenity: "Restaurant",
    price: 3124,
    country: "Germany",
  },
  {
    id: 12,
    name: "Urban Boutique Hotel",
    category: "Mid-Range",
    rating: 3.9,
    reviews: 1401,
    amenity: "Free WiFi",
    price: 9245,
    country: "France",
  },
  {
    id: 13,
    name: "Beachfront Hotel",
    category: "Luxury",
    rating: 4.5,
    reviews: 489,
    amenity: "Pool",
    price: 14567,
    country: "USA",
  },
  {
    id: 14,
    name: "Ocean View Resort",
    category: "Budget",
    rating: 3.3,
    reviews: 783,
    amenity: "Spa",
    price: 7432,
    country: "United Kingdom",
  },
  {
    id: 15,
    name: "City Central Hotel",
    category: "Boutique",
    rating: 4.1,
    reviews: 2133,
    amenity: "Bar",
    price: 9823,
    country: "Australia",
  },
  {
    id: 16,
    name: "Casino Resort",
    category: "Luxury",
    rating: 4.9,
    reviews: 5000,
    amenity: "Bar",
    price: 18900,
    country: "South Africa",
  },
  {
    id: 17,
    name: "Golf Resort",
    category: "Mid-Range",
    rating: 4.7,
    reviews: 789,
    amenity: "Gym",
    price: 16340,
    country: "France",
  },
  {
    id: 18,
    name: "Family Fun Hotel",
    category: "Family",
    rating: 3.2,
    reviews: 1322,
    amenity: "Pool",
    price: 7500,
    country: "Germany",
  },
  {
    id: 19,
    name: "Spa and Relaxation Hotel",
    category: "Luxury",
    rating: 4.4,
    reviews: 2314,
    amenity: "Spa",
    price: 14900,
    country: "United Kingdom",
  },
  {
    id: 20,
    name: "Country House Hotel",
    category: "Budget",
    rating: 3.6,
    reviews: 1876,
    amenity: "Parking",
    price: 6234,
    country: "Australia",
  },
];
const hotelsCopy = structuredClone(hotels) || [];

// Utility Functions
function errorResponse({ res, status = INTERNAL_SERVER_ERROR, error }) {
  return res.status(status).json({
    status,
    success: false,
    message: error || "Internal server error",
  });
}

function getSortedHotelsByPrice(hotels, isAscend = true) {
  if (isAscend) {
    return hotels?.sort((h1, h2) => h1?.price - h2?.price);
  }
  return hotels?.sort((h1, h2) => h2?.price - h1?.price);
}

function getSortedHotelsByRating(hotels, isAscend = true) {
  if (isAscend) {
    return hotels?.sort((h1, h2) => h1?.rating - h2?.rating);
  }
  return hotels?.sort((h1, h2) => h2?.rating - h1?.rating);
}

function getSortedHotelsByReviews(hotels, isAscend = true) {
  if (isAscend) {
    return hotels?.sort((h1, h2) => h1?.reviews - h2?.reviews);
  }
  return hotels?.sort((h1, h2) => h2?.reviews - h1?.reviews);
}

function getFilteredHotelsByAmenity(hotels, amenity) {
  const sortedHotels = hotels?.filter(
    (hotel) => hotel?.amenity?.toLowerCase() === amenity?.toLowerCase()
  );
  return sortedHotels;
}

function getFilteredHotelsByCountry(hotels, country) {
  const sortedHotels = hotels?.filter(
    (hotel) => hotel?.country?.toLowerCase() === country?.toLowerCase()
  );
  return sortedHotels;
}

function getFilteredHotelsByCategory(hotels, category) {
  const sortedHotels = hotels?.filter(
    (hotel) => hotel?.category?.toLowerCase() === category?.toLowerCase()
  );
  return sortedHotels;
}

// Endpoint 1: Get the hotels sorted by pricing
hotelRouter.get("/sort/pricing", (req, res) => {
  const pricing = req.query?.pricing === "low-to-high";
  try {
    const sortedHotels = getSortedHotelsByPrice(hotelsCopy, pricing);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: sortedHotels,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 2: Get the hotels sorted based on their Ratings
hotelRouter.get("/sort/rating", (req, res) => {
  const rating = req.query?.rating === "low-to-high";
  try {
    const sortedHotels = getSortedHotelsByRating(hotelsCopy, rating);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: sortedHotels,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 3: Get the Hotels sorted based on their Reviews
hotelRouter.get("/sort/reviews", (req, res) => {
  const reviews = req.query?.reviews === "least-to-most";
  try {
    const sortedHotels = getSortedHotelsByReviews(hotelsCopy, reviews);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: sortedHotels,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 4: Filter the hotels based on the Hotel Amenity
hotelRouter.get("/filter/amenity", (req, res) => {
  const amenity = req.query?.amenity;
  try {
    if (!amenity) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "amenity query is required",
      });
    }
    const sortedHotels = getFilteredHotelsByAmenity(hotelsCopy, amenity);

    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: sortedHotels,
    });
  } catch (error) {}
});

// Endpoint 5: Filter the hotels based on the selected Country
hotelRouter.get("/filter/country", (req, res) => {
  const country = req.query?.country;
  try {
    if (!country) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "country query is required",
      });
    }
    const sortedHotels = getFilteredHotelsByCountry(hotelsCopy, country);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: sortedHotels,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 6: Filter the hotels based on the selected Category
hotelRouter.get("/filter/category", (req, res) => {
  const category = req.query?.category;
  try {
    if (!category) {
      return errorResponse({
        res,
        status: BAD_REQUEST_ERROR,
        error: "category query is required",
      });
    }
    const sortedHotels = getFilteredHotelsByCategory(hotelsCopy, category);
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: sortedHotels,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

// Endpoint 7: Send all hotels
hotelRouter.get("/", (req, res) => {
  try {
    res.status(RESPONSE_OK).json({
      status: RESPONSE_OK,
      hotels: hotelsCopy,
    });
  } catch (error) {
    errorResponse({ res, error: error?.message });
  }
});

app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});
