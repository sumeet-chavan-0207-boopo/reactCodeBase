import React,{useState,useEffect} from 'react';
import classes from './Header.module.css';
import { Link} from "react-router-dom";

export default function Header(props) {
    const activeStyle = { backgroundColor: '#111' };
    const [active_link,setActiveLink]=useState(window.location.pathname.split("/")[1]);

    return (
        <div>
              <ul className={classes.nav_container}>
                     <li><Link style={active_link=='logo'? activeStyle:{} } 
                     id="logo"  to="/home" onClick={()=> setActiveLink('logo') }>LOGO</Link></li>

                    <li><Link style={active_link=='home'? activeStyle:{} } 
                     id="home"  to="/home"  onClick={()=> setActiveLink('home') }>Home</Link></li>
                    
                    <li><Link  style={active_link=='task'? activeStyle:{} } 
                    id="task" to="/task"  onClick={()=> setActiveLink('task') }>Tasks</Link></li>
                    
                    <li><Link style={active_link=='user'? activeStyle:{} } 
                      id="user" to="/user"  onClick={()=> setActiveLink('user') }>User</Link></li>
                   
                </ul>
        </div>
    )
}
