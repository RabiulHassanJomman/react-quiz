import { Link } from "react-router-dom";
import classes from "../components/styles/Account.module.css";
import { UseAuth } from "../contexts/AuthContext";

export default function Account() {
  const { currentUser, logout } = UseAuth();
  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
