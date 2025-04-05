import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem('tokenRexx', data.token);
      setIsLoggedIn(true);
      navigate('/usuarios');
    } catch (error) {
      setMessage('Error en credenciales');
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, password, email);
      setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      setIsRegistering(false);
    } catch (error) {
      setMessage('Error en el registro');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tokenRexx');
    setMessage('Has cerrado sesión');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <h2>{isRegistering ? 'Registro' : 'Login'}</h2>
          <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          {isRegistering && (
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          )}
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isRegistering ? (
            <>
              <button onClick={handleRegister}>Registrarse</button>
              <p>¿Ya tienes cuenta? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegistering(false)}>Iniciar sesión</span></p>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Ingresar</button>
              <p>¿No tienes cuenta? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegistering(true)}>Regístrate</span></p>
            </>
          )}
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Login;
