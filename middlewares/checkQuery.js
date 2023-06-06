const query = require('../constants/query-constants');
const checkPositiveNum = require('../helpers/checkPositiveNum');

const checkQuery = (req, res, next) => {
  const { page, limit, category, sortBy, order } = req.query;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const categoryNum = Number(category);

  req.query.page = checkPositiveNum(pageNum) ? pageNum : query.page;
  req.query.limit = checkPositiveNum(limitNum) ? limitNum : query.limit;
  req.query.category =
    checkPositiveNum(categoryNum) && categoryNum <= query.maxCategory ? categoryNum : 0;
  req.query.sortBy = sortBy ? sortBy : query.DEFAULT_SORT;
  if (order === query.orderConsts.DESC) {
    req.query.order = -1;
  } else {
    req.query.order = 1;
  }

  next();
};

module.exports = checkQuery;
