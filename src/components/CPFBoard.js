import React from "react";
import {Button} from "react-bootstrap";
import "./Radiobutton.css";

const CPFBoard = () => {
    return (
        <div className = 'cpfBoard'> 
          <hr style={{border: '1px solid black'}} width = '1000px'/>
          <h1>
            <img
              src={require('../Images/CPFlogo.png')}
              width="48"
              height="54"
            />
            <span style={{display: 'inline-block', width: '10px'}} />
            CPF Board
          </h1>
          <hr style={{border: '1px solid black'}}  width = '1000px'/>
          <h3> The Central Provident Fund (CPF) is a comprehensive social security system <br> 
            </br>that enables working Singapore Citizens and Permanent Residents to set aside <br>
            </br>funds for retirement. It also addresses healthcare, home ownership, family <br>
            </br>protection and asset enhancement.
          </h3>

          <Button className="cpf-btn">
            Main Website
          </Button>
        </div>
    );
}

export default CPFBoard;