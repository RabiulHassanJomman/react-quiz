import classes from '../components/styles/Nav.module.css';
import Account from './Account';
import logo from '../assets/images/logo-bg.png';

import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img
              src={logo}
              alt="Learn With Sumit Logo"
            />
            <h3>Learn With Sumit</h3>
          </Link>
        </li>
      </ul>
      <Account></Account>
    </nav>
  );
}
