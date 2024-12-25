const axiosInstance = require("../lib/axios.lib");

const getCastDetailsByTMDBId = async (tmdbId) => {
  const response = await axiosInstance.get(`/movie/${tmdbId}/credits`);
  return response.data;
};

const getMovieByTMDBId = async (tmdbId) => {
  const response = await axiosInstance.get(`/movie/${tmdbId}`);
  console.log(response.data);
  return response.data;
};

module.exports = {
  getCastDetailsByTMDBId,
  getMovieByTMDBId,
};
