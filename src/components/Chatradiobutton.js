import React from "react";
import "./Radiobutton.css";


const Chatradiobutton = props => {
    return (
        <div>
            <label>
                <input type="radio" name="Chatmode" defaultValue="small"  />
                <img id = 'Radioimg' src={require('../Images/Chatroom.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Chatmode" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Videocall.png')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Chatmode" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Phonecall.png')} />
            </label>
        </div>
    );
}

export default Chatradiobutton;