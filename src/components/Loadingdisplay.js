import React from "react";
import ReactLoading from 'react-loading';
import "./Componentstyles.css";

const Loadingdisplay = (props) => {
    const LoadingSign = <ReactLoading className = 'loadingSign' type='bars' color='#5cdb95' height={'5%'} width={'5%'} />
    if (props.loadingState == false) {
      return (
        <div className = 'loadinDisplay'>
          <br></br>
          {LoadingSign}
          <br></br> 
          <h5>Connecting you to agent</h5>
        </div>
      );
    }
    else if (props.loadingState) {
        return (
            <div className = 'loadinDisplay'>
              <br></br>
              <img className = 'connected' src={require('../Images/Connected.png')}/>
              <br></br> <br></br>
              <h5> You have been connected to one of our agents. Please open the chat window</h5>
              <br></br> 
            </div>
        );
    }
    else {
        return null
    }
  }

  export default Loadingdisplay;