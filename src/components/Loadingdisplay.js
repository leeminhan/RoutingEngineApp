import React from "react";
import ReactLoading from 'react-loading';
import "./Componentstyles.css";

const Loadingdisplay = (props) => {
    const LoadingSign = <ReactLoading className = 'loadingSign' type='bars' color='#5cdb95' height={'5%'} width={'5%'} />
    if (props.loadingState == 'uploadDB') {
      return (
        <div className = 'loadinDisplay'>
          {LoadingSign}
          <br></br> 
          <h5>Connecting you to agent</h5>
        </div>
      );
    }
    else if (props.loadingState == 'createAccount') {
        return (
            <div className = 'loadinDisplay'>
              {LoadingSign}
              <h5> Creating your guest account</h5>
            </div>
        );
    }
    else if (props.loadingState == 'signIn') {
        return (
            <div className = 'loadinDisplay'>
              {LoadingSign}
              <h5> Signing you in</h5>
            </div>
        );
    }
    else if (props.loadingState == 'searchAgent') {
        return (
            <div className = 'loadinDisplay'>
              {LoadingSign}
              <h5>Searching for suitable agent</h5>
            </div>
        );
    }
    else if (props.loadingState == 'connectAgent') {
        return (
            <div className = 'loadinDisplay'>
              {LoadingSign}
              <h5> Connecting you to agent</h5>
            </div>
        );
    }
    else {
        return null
    }
  }

  export default Loadingdisplay;