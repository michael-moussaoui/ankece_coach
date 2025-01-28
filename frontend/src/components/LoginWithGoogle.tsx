import React, { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

interface UserProfile {
  picture: string;
  name: string;
  email: string;
}

const LoginWithGoogle: React.FC = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Utilisation de useCallback pour mémoriser la fonction fetchProfile
  const fetchProfile = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently(); // Récupère le token d'Auth0
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Passe le token au backend
        },
        withCredentials: true, // Envoie les cookies si nécessaire
      });
      setProfile(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération du profil :", err);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [fetchProfile, isAuthenticated]);

  return (
    <div>
      <h1>ANKECE APP</h1>
      {isAuthenticated ? (
        <>
          <p>Bienvenue, {user?.name}!</p>
          <button
            onClick={() =>
              logout({
      logoutParams: { returnTo: window.location.origin },
    })
            }
          >
            Déconnexion
          </button>
          <h2>Profil Backend :</h2>
          {profile ? (
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          ) : (
            <p>Chargement du profil...</p>
          )}
        </>
      ) : (
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                redirect_uri: window.location.origin,
              },
            })
          }
        >
          Connexion
        </button>
      )}
    </div>
  );
};

export default LoginWithGoogle;
