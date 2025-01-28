export interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience: string;
}

export const auth0Config: Auth0Config = {
  domain: "dev-jpgh5ffcy23zaa22.eu.auth0.com",
  clientId: "hIUSOz0uAYyCY9WMaePS8kkwAYsJoBjP",
  redirectUri: window.location.origin,
  audience: "http://localhost:3000"
};

