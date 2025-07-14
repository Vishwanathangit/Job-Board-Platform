const errorHandler = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

module.exports = {
  errorHandler,
};
