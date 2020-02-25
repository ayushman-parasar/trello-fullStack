import React from "react"
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"


function NavbarSp(){
    return(
        <Router>
            <nav>
                <ul>
                    <li><NavLink to="/users/login">login</NavLink></li>
                    <li><NavLink to="/users/register">register</NavLink></li>
                    <li><NavLink to="/home">Home</NavLink></li>
                </ul>
            </nav>
        </Router>
    )
}

export default NavbarSp