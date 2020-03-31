import React from "react";
import "./Radiobutton.css";



const Languageradiobutton = (props) =>  {
    const mySpan = <span style={{display: 'inline-block', width: '30px'}} />
    return (
        <div
        name = "language"
        // value = {props.value}
        onChange={props.onChange}
        class = "language">

            <label>
                <input type="radio" name="language" value="en-us"  />
                <img id = 'Radioimg' src={require('../Images/English.png')}/>
                English
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" value="Bahasa" />
                <img id = 'Radioimg' src={require('../Images/Bahasa.png')} />
                Bahasa
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language"value="Chinese"  />
                <img id = 'Radioimg' src={require('../Images/Chinese.png')}/>
                Chinese
            </label>
            {mySpan}
            <label>
                <input type="radio" name="language" dvalue="Tamil" />
                <img id = 'Radioimg' src={require('../Images/Tamil.png')} />
                Tamil
            </label>
        </div>
    );
    
}

export default Languageradiobutton;