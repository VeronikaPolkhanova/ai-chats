import { useAuth0 } from "@auth0/auth0-react";
import classes from "./styles.module.scss";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const onClickButton = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
      return;
    }
    loginWithRedirect();
  };

  return (
    <button
      className={`${classes.button} ${
        isAuthenticated ? classes.logout : classes.login
      }`}
      onClick={onClickButton}>
      {isAuthenticated ? "Log Out" : "Log In"}
    </button>
  );
};

export default LoginButton;
