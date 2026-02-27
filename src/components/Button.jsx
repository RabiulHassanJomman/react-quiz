import { Children } from "react";
import classes from "../components/styles/Button.module.css";

export default function Button({ children, ...rest  }) {
  return (
    <button className={classes.button} {...rest}>
      <span>{children}</span>
    </button>
  );
}
