const notFound = (req, res, next) => {
  const error = new Error(`Not found -- ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHanlder = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV == "production" ? "" : err.stack,
  });
};

export { notFound, errorHanlder };
