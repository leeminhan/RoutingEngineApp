import React from "react";
import {Button} from "react-bootstrap";
import {Grid} from '@material-ui/core';
import "./Radiobutton.css";

const CPFBoard = () => {
    return (
        <div className = 'cpfBoard'> 
          <hr className = 'dividerHor' />
          <hr className = 'dividerVer'/>
          <br></br>
          <Grid container spacing = {1}>
            <Grid className = 'leftTitle' item xs = {6}>
              <h1>CPF</h1>   
            </Grid>
            <Grid className = 'rightTitle' item xs = {6}>
              <h1>BOARD</h1>   
            </Grid>
          </Grid>
          
          <h5> The Central Provident Fund (CPF) is a comprehensive social security system <br> 
            </br>that enables working Singapore Citizens and Permanent Residents to set aside <br>
            </br>funds for retirement. It also addresses healthcare, home ownership, family <br>
            </br>protection and asset enhancement.
          </h5>
          <br></br>
          <Button className="cpf-btn">
            Main Website
          </Button>
        </div>
    );
}

export default CPFBoard;