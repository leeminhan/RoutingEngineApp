import React from "react";
import "./Componentstyles.css";

const Navbar = props => {
    return (
        <div className = 'Navbar'>
            
            <ul>
            <img className = 'navbarlogo'
              src={require('../Images/CPFlogo.png')}
              width="56"
              height="63"
            />
                <li><a href="#home">Home</a></li>
                <li><a href="#cpfp">CPF Board</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#faq">FAQ</a></li>
            </ul>
        </div>
    );
}

export default Navbar;