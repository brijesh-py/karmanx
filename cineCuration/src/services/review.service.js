const { review: ReviewModel } = require("../../models");
const MovieService = require("./movie.service");

class ReviewService {
  async addReview(data) {
    const movie = await MovieService.findOne({ id: parseInt(data.movieId) });
    if (!movie) return null;
    
    const review = await ReviewModel.create({
      movieId: movie.id,
      rating: data.rating,
      reviewText: data.reviewText,
    });
    return review;
  }
}

module.exports = new ReviewService();
