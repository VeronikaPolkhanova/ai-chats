import LoginButton from "../LoginButton";
import classes from "./styles.module.scss";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated, isLoading }: any = useAuth0();

  const userInfo = (
    <div className={classes.userInfo}>
      <img src={user?.picture} alt={user?.name} />
      <p>{user?.email}</p>
    </div>
  );

  return (
    <div
      className={`${classes.header} ${
        isAuthenticated ? classes.flexSpace : classes.flexEnd
      }`}>
      {isAuthenticated && !isLoading && userInfo}
      <LoginButton />
    </div>
  );
};

export default Header;
