const HttpError = require('../helpers/HttpError');
const Dessert = require('../models/Dessert');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, category, sortBy, order, search = '' } = req.query;
    const skip = (page - 1) * limit;
    const query = {
      title: { $regex: search, $options: 'i' },
      $or: [category === 0 ? {} : { category }],
    };
    const desserts = await Dessert.find(query)
      .sort({ [sortBy]: order, _id: 1 })
      .select({ comments: 0, rating: 0, category: 0 })
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil((await Dessert.countDocuments(query)) / limit);

    res.json({ page, limit, totalPages, desserts });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const desserts = await Dessert.findById(id);
    if (!desserts) {
      throw HttpError(404, 'Cannot find dessert with this id');
    }
    res.json(desserts);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById };
