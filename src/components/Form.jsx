import classes from "../components/styles/Form.module.css";

export default function Form({ children, className, ...rest }) {
  return (
    <form className={`${classes.form} ${className}`} {...rest}>
      {children}
    </form>
  );
}
