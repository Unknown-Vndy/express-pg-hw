module.exports = (req, res, next) => {
  const {
    query: { page = 1, results = 5 },
  } = req;

  req.pagination = {
    limit: results,
    offset: (page - 1) * results,
  };
  next();
};
