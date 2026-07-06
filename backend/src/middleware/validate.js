const validate = (schema) => (req, res, next) => {
  try {
    const validData = schema.parse(req.body);
    req.body = validData;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation Error', details: err.errors });
  }
};

module.exports = validate;
