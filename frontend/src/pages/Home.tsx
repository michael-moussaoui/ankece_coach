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
// import Card from '../components/Card';
import Logo from '../assets/ANKECE_LOGO.svg';
// import Player from '../assets/player.jpg';
// import Coach from '../assets/coach.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <div>
      <div className="h-20">
        <img className='fixed -top-14 h-60' src={Logo} alt="Logo ANKECE" />
      </div>
      <h1 className='text-primary text-center font-Belanosima text-3xl text-primary mt-10'>Bienvenue sur ANKECE APP</h1>
      <button className=' absolute right-5 top-5 bg-custom-gradient p-2 rounded-md' onClick={handleLogout}>Déconnexion</button>
      {/* <div className="top__container w-1/2 relative left-1/2 -translate-x-1/2">
      <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-20">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 justify-center mx-auto">
            <Card
              image={Coach}
              CardTitle="COACH"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Accéder"
            />
            <Card
              image={Player}
              CardTitle="JOUEUR"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Accéder"
            />
          </div>
        </div>
      </section>
        <div className="coach__container"></div>
        <div className="player__container"></div>
      </div> */}
      {/* <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-20">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 justify-center">
            <Card
              image={Coach}
              CardTitle="COACH"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Accéder"
            />
            <Card
              image={Player}
              CardTitle="JOUEUR"
              CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
              Button="Accéder"
            />
          </div>
        </div>
      </section> */}
      
      
    </div>
  );
};

export default Home;
