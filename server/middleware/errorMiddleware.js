// middleware/errorMiddleware.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Async handler wrapper to eliminate try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Not Found middleware
const notFound = (req, res, next) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // If headers already sent, pass to Express's default error handler
  if (res.headersSent) {
    return next(err);
  }

  // Set status code
  const statusCode = err.statusCode || res.statusCode || 500;

  // Create error response
  const errorResponse = {
    success: false,
    status: err.status || "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  };

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

export { AppError, asyncHandler, notFound, errorHandler };
