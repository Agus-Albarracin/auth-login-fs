const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../models');
const Usuario = db.Usuario;

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET 


const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashea la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await Usuario.create({ email, password_hash });

    res.status(201).json({ message: 'Usuario registrado correctamente', user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Compara la contraseña ingresada con el hash
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' });

    res.json({ message: 'Login exitoso', token, role: 'usuario' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = {
  register,
  login,
};
