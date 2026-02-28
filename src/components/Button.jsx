import { Children } from "react";
import classes from "../components/styles/Button.module.css";

export default function Button({ className, children, ...rest  }) {
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      <span>{children}</span>
    </button>
  );
}
