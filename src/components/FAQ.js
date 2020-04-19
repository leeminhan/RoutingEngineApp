import React from "react";
import Search from './Search'
import "./Componentstyles.css";

const FAQ = (props) => {
    return (
        <div className = 'faq'>
            {/* <hr className = 'dividerHor' />
            <hr className = 'dividerVer'/> */}
            <br></br>
            <h3>Search for Frequently Asked Questions</h3> 
            
            <Search/>
        </div>
    );
   
  }

  export default FAQ;