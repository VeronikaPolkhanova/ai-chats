import classes from "./styles.module.scss";
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div className={classes.loadingContainer}>
      <BeatLoader
        color={"blue"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
