import React from 'react';
import classes from './Header.module.css';
import { Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
              <ul className={classes.nav_container}>
                     <li><Link to="/home">LOGO</Link></li>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/task">Tasks</Link></li>
                    <li><Link to="/user">User</Link></li>
                   
                </ul>
        </div>
    )
}
