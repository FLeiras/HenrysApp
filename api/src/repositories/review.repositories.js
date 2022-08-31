const { Review } = require("../models");

async function getAll() {
  const reviews = await Review.findAll({
    order: [["createdAt", "DESC"]],
    limit: 10,
  });
  return reviews;
}

async function create(data) {
  const review = await Review.create(data);
  return review;
}

async function remove(id) {
  const deletedReview = await Review.destroy({
    where: {
      id: id,
    },
  });

  return deletedReview;
}

module.exports = { getAll, create, remove };
