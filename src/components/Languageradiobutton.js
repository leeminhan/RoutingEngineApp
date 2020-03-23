import React from "react";
import "./Radiobutton.css";


const Languageradiobutton = props =>  {
    
    return (
        <div>
            <label>
                <input type="radio" name="Language" defaultValue="small"  />
                <img id = 'Radioimg' src={require('../Images/English.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Language" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Bahasa.png')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Language" defaultValue="small"  />
                <img id = 'Radioimg' src={require('../Images/Chinese.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Language" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Tamil.png')} />
            </label>
        </div>
    );
    
}

export default Languageradiobutton;