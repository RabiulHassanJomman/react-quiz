import classes from '../components/styles/Nav.module.css';
import Account from './Account';
import logo from '../assets/images/logo-bg.png';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="./index.html" className={classes.brand}>
            <img
              src={logo}
              alt="Learn With Sumit Logo"
            />
            <h3>Learn With Sumit</h3>
          </a>
        </li>
      </ul>
      <Account></Account>
    </nav>
  );
}
