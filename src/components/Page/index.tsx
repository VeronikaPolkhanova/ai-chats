import classes from "./style.module.scss";
import { ReactNode } from "react";

interface IPageProps {
  children: ReactNode;
}

const Page = ({ children }: IPageProps) => {
  return <div className={classes.pageContainer}>{children}</div>;
};

export default Page;
