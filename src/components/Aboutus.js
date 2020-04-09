import React from "react";
import { Grid, Container, Box } from '@material-ui/core';
import "./Componentstyles.css";

const Aboutus = () => {
    return (
        <div className = 'aboutUs'>
          <br></br>
          <hr style={{border: '1px solid white'}}  />
          <h1> About Us</h1>
          <h3> We, a group of SUTDents, built this digital platform to handle CPF Board help  <br>
          </br> matters. Behing this interface is a powerful engine that would select the most  <br> 
          </br> suitable agent for you and minimise your queuing time.  </h3>
          <hr style={{border: '1px solid white'}}  />
          <Grid container spacing = {3}>

            <Grid item xs = {4} >
              <Box display="flex" justifyContent="center"> 
                <h5> I was connected to an agent very quickly and the video streaming service was seamless <br>
                  </br> - Ms Tan Si Ling 
                </h5>
                <Box border={1}/>  
              </Box> 
            </Grid>

            <Grid item xs = {4} >
                <h5> Agent was very friendly and knowledgeable. I had many questions and he patiently answered them all. <br>
                </br>  - Mr Mohd Hakim </h5>  
            </Grid>

            <Grid item xs = {4} >
              <Box display="flex" justifyContent="center">
                <Box border={1}/>
                  <h5> The agent chosen for me was the perfect one. He could answer all my queries. <br>
                  </br> - Mr Selva </h5>
              </Box>
            </Grid>
          </Grid>
          <hr style={{border: '1px solid white'}}  />
          <span style={{display: 'inline-block', width: '10px'}} />
        </div>
    );

}

export default Aboutus;