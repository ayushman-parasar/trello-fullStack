import React from "react"
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"


function NavbarGen(){
    return(
        <Router>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/users">Profile</NavLink></li>
                    <li><NavLink to="/home/boards">Boards</NavLink></li>
                </ul>
            </nav>
        </Router>
    )
}

export default NavbarGen