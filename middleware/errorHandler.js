module.exports = (err, req, res, _next) => {
    const statusCode = err?.statusCode || 500;
    res.status(statusCode).json({
      error: {
        statusCode: statusCode,
        message: err?.message || "",
        validation: err?.validation || [],
        controller: err?.controller || "",
      },
    });
  };
  