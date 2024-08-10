import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }: any) => {
  const domain: any = process.env.REACT_APP_AUTH_DOMAIN;
  const clientId: any = process.env.REACT_APP_AUTH_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
