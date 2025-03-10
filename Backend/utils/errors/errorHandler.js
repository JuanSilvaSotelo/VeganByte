export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    
    res.status(statusCode).json({
      error: {
        message,
        details: process.env.NODE_ENV === 'development' ? err.stack : {}
      }
    });
  };
  
  export const notFoundHandler = (req, res) => {
    res.status(404).json({
      error: 'Endpoint no encontrado'
    });
  };