// // src/pages/Home.tsx
// import { useEffect, useState } from 'react';

// const Home = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     // Vérifier si le token est présent dans le localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Vous pouvez récupérer les informations de l'utilisateur via une requête
//       // mais ici, nous affichons juste un message de bienvenue
//       setUser({ email: 'user@example.com' });
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Bienvenue sur ANKECE APP</h1>
//       {user ? (
//         <p>Hello, {user.email}</p>
//       ) : (
//         <p>Please login or register to access the content.</p>
//       )}
//     </div>
//   );
// };

// export default Home;

// src/components/Home.tsx
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <div>
      <h1>Bienvenue sur ANKECE APP</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
