import React from "react";
import "./Radiobutton.css";



const Languageradiobutton = (props) =>  {
    const mySpan = <span style={{display: 'inline-block', width: '30px'}} />
    return (
        <div
        name = "language"
        value = {props.value}
        onChange={props.onChange}
        class = "language">

            <label>
                <input type="radio" name="language" value="en-us"  />
                <img id = 'Radioimg' src={require('../Images/English.png')}/>
                English
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" value="2" />
                <img id = 'Radioimg' src={require('../Images/Bahasa.png')} />
                Bahasa
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language"value="3"  />
                <img id = 'Radioimg' src={require('../Images/Chinese.png')}/>
                Chinese
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" dvalue="4" />
                <img id = 'Radioimg' src={require('../Images/Tamil.png')} />
                Tamil
            </label>
        </div>
    );
    
}

export default Languageradiobutton;