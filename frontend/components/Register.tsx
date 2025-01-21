// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [firstname, setFirstname] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [size, setSize] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Ajout de l'état de chargement
//   const navigate = useNavigate(); // Hook pour la navigation

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); // Activer le chargement
//     setErrorMessage(''); // Réinitialiser le message d'erreur

//     try {
//       // Exécution de la requête Axios sans utilisation de la variable 'response'
//       await axios.post('http://localhost:3000/register', {
//         firstname,
//         name,
//         email,
//         password,
//         size,
//       });

//       setIsLoading(false); // Désactiver le chargement
//       setErrorMessage('');

//       // Rediriger vers la page de connexion après une inscription réussie
//       navigate('/login'); // Rediriger vers la page de login
//     } catch (error) {
//       setIsLoading(false); // Désactiver le chargement

//       if (axios.isAxiosError(error)) {
//         const errorMsg = error.response?.data.message || 'Registration failed';
//         setErrorMessage(errorMsg);
//       } else {
//         setErrorMessage('An unknown error occurred');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Firstname"
//           value={firstname}
//           onChange={(e) => setFirstname(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
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
//         <input
//           type="text"
//           placeholder="Size"
//           value={size}
//           onChange={(e) => setSize(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default Register;


// src/components/Register.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [size, setSize] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await axios.post('http://localhost:3000/auth/register', {
        firstname,
        name,
        email,
        password,
        size,
      });

      setIsLoading(false);
      navigate('/login'); // Redirige vers la page de login après inscription
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data.message || 'Registration failed';
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;

