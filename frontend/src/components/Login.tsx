import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import LoginWithGoogle from './LoginWithGoogle';
import AuthButton from './authButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nouvel état pour gérer la connexion
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/'); // Redirige si connecté
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // Met à jour l'état pour indiquer que l'utilisateur est connecté
      setErrorMessage('');
      navigate('/'); // Redirige vers la page d'accueil après la connexion
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'Login failed');
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/forgot-password', {
        email: resetEmail,
      });
      setResetMessage(response.data.message);
      setResetEmail('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResetMessage(error.response?.data.message || 'Failed to send reset email.');
      } else {
        setResetMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="text-4xl text-center">ANKECE APP</h1>
      
      {/* Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion */}
      {!isLoggedIn && (
        <>
          <AuthButton />
          {!isForgotPassword ? (
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
              <button type="submit" className="btn-primary">
                Se connecter
              </button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <p>
                <span onClick={() => setIsForgotPassword(true)} className="text-blue-500 cursor-pointer">
                  Mot de passe oublié ?
                </span>
              </p>
              <p>
                Pas encore inscrit ?{' '}
                <Link to="/register" className="text-blue-500 underline">
                  Inscrivez-vous ici
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="forgot-password-form">
              <h2 className="text-2xl text-center">Mot de passe oublié</h2>
              <input
                type="email"
                placeholder="Votre email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="input-field"
              />
              <button type="submit" className="btn-primary">
                Envoyer
              </button>
              <p onClick={() => setIsForgotPassword(false)} className="text-blue-500 cursor-pointer">
                Retour à la connexion
              </p>
              {resetMessage && <p className="text-green-500">{resetMessage}</p>}
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
