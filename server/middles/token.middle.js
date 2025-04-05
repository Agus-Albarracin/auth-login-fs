require('dotenv').config({ path: `.env.development` });
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Middleware para autenticar tokens JWT en solicitudes protegidas.
 * 
 * Este middleware espera recibir un encabezado HTTP "Authorization" con el token
 * en el formato: "Bearer <token>".
 * 
 * Si el token es válido, se decodifica y se adjunta la información del usuario
 * (payload del token) al objeto `req.user`. Luego llama a `next()` para continuar.
 * 
 * Si no hay token o es inválido, se responde con un error 401 o 403 según el caso.
 */
const authenticateToken = (req, res, next) => {
  // Extrae el encabezado "Authorization"
  const authHeader = req.headers['authorization'];

  // Extrae el token de la cadena "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
