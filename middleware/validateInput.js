module.exports = function (requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => !req.body[field]);
    if (missing.length) {
      return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
    }
    next();
  };
};
