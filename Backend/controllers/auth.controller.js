import Cliente from '../models/cliente.model.js';

const AuthController = {
  register: async (req, res, next) => {
    try {
      // Verificar número de documento único
      const existingDoc = await Cliente.findByDocumentNumber(req.body.Numero_documento);
      if (existingDoc) {
        return res.status(400).json({ error: 'Número de documento ya registrado' });
      }
      // Agrega logs para diagnóstico
      console.log('Datos recibidos:', req.body);
      
      const existingUser = await Cliente.findByEmail(req.body.Correo);
      if (existingUser) {
        console.log('Correo ya registrado:', req.body.Correo);
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const newUserId = await Cliente.create(req.body);
      console.log('Nuevo usuario creado ID:', newUserId);
      
      res.status(201).json({
        message: 'Registro exitoso',
        userId: newUserId
      });
    } catch (error) {
      console.error('Error en registro:', error);
      next({
        status: 500,
        message: 'Error en el servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  }
};

export default AuthController;