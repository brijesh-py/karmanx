require("dotenv").config();
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

module.exports = axiosInstance;
