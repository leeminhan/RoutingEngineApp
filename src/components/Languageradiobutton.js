import React from "react";
import "./Componentstyles.css";



const Languageradiobutton = (props) =>  {
    const mySpan = <span style={{display: 'inline-block', width: '80px'}} />
    return (
        <div
        name = "language"
        // value = {props.value}
        onChange={props.onChange}
        className = "language">

            <label>
                <input type="radio" name="language" value="en-us"  />
                <img id = 'Radioimg' src={require('../Images/English.svg')}/>
                English
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" value="Malay" />
                <img id = 'Radioimg' src={require('../Images/Malay.svg')} />
                Malay
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language"value="Chinese"  />
                <img id = 'Radioimg' src={require('../Images/Chinese.svg')}/>
                Chinese
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" dvalue="Tamil" />
                <img id = 'Radioimg' src={require('../Images/Tamil.svg')} />
                Tamil
            </label>
        </div>
    );
    
}

export default Languageradiobutton;