// // src/components/Login.tsx
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Ajout d'un état de chargement
//   const navigate = useNavigate(); // Hook pour la navigation

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); // Activer le chargement
//     setErrorMessage(''); // Réinitialiser le message d'erreur

//     try {
//       const response = await axios.post('http://localhost:3000/login', {
//         email,
//         password,
//       });

//       const token = response.data.token;
//       localStorage.setItem('token', token); // Sauvegarde du token
//       setIsLoading(false); // Désactiver le chargement

//       // Rediriger vers la page d'accueil
//       navigate('/'); // Utilisation de react-router-dom pour la navigation
//     } catch (error) {
//       setIsLoading(false); // Désactiver le chargement

//       if (axios.isAxiosError(error)) {
//         const errorMsg = error.response?.data.message || 'Login failed';
//         setErrorMessage(errorMsg);
//       } else {
//         setErrorMessage('An unknown error occurred');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default Login;


// src/components/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setErrorMessage('');
      navigate('/'); // Redirige vers la page Home
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'Login failed');
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <p>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;

