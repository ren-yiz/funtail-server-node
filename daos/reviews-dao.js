const reviewsModel = require("../models/reviews/reviews-model")

const createReview = (review) => {
  return reviewsModel.create(review)
}

const findReviewsForDrink = (drinkId) => {
  return reviewsModel.find({drink: drinkId}).sort({_id: -1}).limit(15).populate(
      "creator").sort({_id: -1}).exec()

}


const findReviewsByCreator = (userId) => {
  return reviewsModel.find({creator: userId}).populate(
      "drink").sort({_id: -1}).exec()
}

const deleteReview = (reviewId) => {
  return reviewsModel.deleteOne({_id: reviewId})
}

const deleteReviewByCreator = (userId) => {
  return reviewsModel.deleteMany({creator: userId})
}

const deleteReviewsOfDrink = (drinkId) => {
  return reviewsModel.deleteMany({drink: drinkId})
}

module.exports = {
  createReview,
  findReviewsForDrink,
  findReviewsByCreator,
  deleteReview,
  deleteReviewByCreator,
  deleteReviewsOfDrink
}