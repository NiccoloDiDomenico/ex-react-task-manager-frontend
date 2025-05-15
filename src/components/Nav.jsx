import { NavLink } from 'react-router-dom';
import styles from '../css/Nav.module.css';

function Nav() {
    return (
        <nav className={styles.navbar}>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
            >
                Lista Task
            </NavLink>
            <NavLink
                to="/addTask"
                className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
            >
                Aggiungi Task
            </NavLink>
        </nav>
    );
}

export default Nav;