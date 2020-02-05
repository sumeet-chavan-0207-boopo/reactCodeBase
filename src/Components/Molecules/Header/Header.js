import React,{useState} from 'react';
import classes from './Header.module.css';
import { Link} from "react-router-dom";
import { logoutWithToken } from "../../../Auth/Auth";


export default function Header() {
    const activeStyle = { backgroundColor: '#111' };
    const [active_link,setActiveLink]=useState(window.location.pathname.split("/")[1]);

    return (
        <div id="task1" data-test="headerComponent"> 
              <ul className={classes.nav_container}>
                <li><Link  style={active_link==='task'? activeStyle:{} } 
                id="task" to="/task"  onClick={()=> setActiveLink('task') }>Tasks</Link></li>
                <li><Link style={active_link==='user'? activeStyle:{} } 
                  id="user" to="/user"  onClick={()=> setActiveLink('user') }>User</Link></li>
                <li><Link style={active_link==='students'? activeStyle:{} } 
                  id="students" to="/students"  onClick={()=> setActiveLink('students') }>students</Link></li>
                <li style={{"float":"right"}}><Link id="logout" onClick={()=> logoutWithToken() }>Logout</Link></li>
                </ul>
        </div>
    )
}
