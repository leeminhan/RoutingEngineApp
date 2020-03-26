import React from "react";
import "./Radiobutton.css";


const Languageradiobutton = ({value,onChange}) =>  {
    
    return (
        <div
        name = "language"
        value={value}
        onChange={onChange}
        class = "language">

            <label>
                <input type="radio" name="language" value="1"  />
                <img id = 'Radioimg' src={require('../Images/English.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="language" value="2" />
                <img id = 'Radioimg' src={require('../Images/Bahasa.png')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="language"value="3"  />
                <img id = 'Radioimg' src={require('../Images/Chinese.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="language" dvalue="4" />
                <img id = 'Radioimg' src={require('../Images/Tamil.png')} />
            </label>
        </div>
    );
    
}

export default Languageradiobutton;