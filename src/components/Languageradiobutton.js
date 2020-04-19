import React from "react";
import "./Componentstyles.css";



const Languageradiobutton = (props) =>  {
    const mySpan = <span style={{display: 'inline-block', width: '80px'}} />
    return (
        <div
        name = "language"
        value = {props.value}
        onChange={props.onChange}
        className = "language">

            <label>
                <input type="radio" name="language" value="1"  />
                <img id = 'Radioimg' src={require('../Images/English.svg')}/>
                English
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" value="2" />
                <img id = 'Radioimg' src={require('../Images/Malay.svg')} />
                Malay
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language"value="3"  />
                <img id = 'Radioimg' src={require('../Images/Chinese.svg')}/>
                Chinese
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" value="4" />
                <img id = 'Radioimg' src={require('../Images/Tamil.svg')} />
                Tamil
            </label>
        </div>
    );
    
}

export default Languageradiobutton;