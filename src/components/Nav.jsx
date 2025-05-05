import '../css/Nav.css'
import { Link, NavLink } from "react-router-dom";

function Nav() {
    return (
        <>
            <nav>
                <NavLink to="/">TaskList</NavLink>
                <NavLink to="/AddTask">AddTask</NavLink>
            </nav>
        </>
    )
}

export default Nav;