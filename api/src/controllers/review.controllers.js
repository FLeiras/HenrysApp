const reviewRepositories = require("../repositories/review.repositories");

async function getAll(req, res, next) {
  try {
    const reviews = await reviewRepositories.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const review = await reviewRepositories.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const deletedReview = await reviewRepositories.remove(req.params.id);
    deletedReview
      ? res.status(200).json({ message: "Review eliminada correctamente!" })
      : res.status(401).json({ message: "Error ¿?" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, create, remove };
