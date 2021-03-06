import React from "react";
import "./Componentstyles.css";


const Chatradiobutton = (props) => {
    const mySpan = <span style={{display: 'inline-block', width: '80px'}} />
    
    return (
        <div 
        name = "chatMode"
        value = {props.value}
        onChange={props.onChange}
        className = 'chatMode'>

            <label>
                <input type="radio" name="chatmode" value= "1"  />
                <img id = 'Radioimg' src={require('../Images/Chatmessaging.svg')}/>
                Chat Messaging
            </label>
            {mySpan}
            <label>
                <input type="radio" name="chatmode" value="2" />
                <img id = 'Radioimg' src={require('../Images/Videocall.svg')} />
                Video Calling
            </label>
        </div>
    );
}

export default Chatradiobutton;