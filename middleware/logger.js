const logger = (
  req, res, next,
) => {
  req.hello = 'Hello world';
  console.log(`${req.method}`);
  next();
};

module.exports = logger;
