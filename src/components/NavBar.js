import React from "react";
import "./Radiobutton.css";

const NavBar = props => {
    return (
        <div className="navBar">
            <a href="#" className="logo">CPF Help Center</a>
            <ul className="navItems">
                <li> <a href="#Home">Home</a> </li>
                <li> <a href="#About">About Us</a> </li>
                <li> <a href="#FAQ">FAQ</a> </li>
                <li> <a href="https://www.cpf.gov.sg/members">CPF Board</a> </li>
            </ul>
        </div>
    )

}

export default NavBar;