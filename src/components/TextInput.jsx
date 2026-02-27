import classes from "../components/styles/TextInput.module.css";

export default function TextInput({icon, ...rest}) {
  return (
    <div className={classes.textInput}>
      <input {...rest} />
      <span className ="material-icons-outlined"> {icon} </span>
    </div>
  );
}
