import classes from "../components/styles/Account.module.css";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className={classes.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
