const axiosInstance = require("../lib/axios.lib");
class UnsplashService {
  constructor() {}
  async search(query) {
    const response = await axiosInstance.get("/search/photos", {
      params: {
        query,
      },
    });
    return response.data.results;
  }
}

module.exports = new UnsplashService();
