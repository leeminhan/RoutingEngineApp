import React from "react";
import "./Radiobutton.css";


const Enquiryradiobutton = ({value,onChange}) => {
    
    return (
        <div
        name = "problem"
        value={value}
        onChange={onChange}
        class = "problem">

            <label>
                <input type="radio" name="problem" value="1" />
                <img id = 'Radioimg' src={require('../Images/Educationschemes.svg')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" value="2" />
                <img id = 'Radioimg' src={require('../Images/Healthcareschemes.svg')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" value="3"  />
                <img id = 'Radioimg' src={require('../Images/Housingschemes.svg')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" defaultValue="4" />
                <img id = 'Radioimg' src={require('../Images/Accountstatement.svg')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" value="5" />
                <img id = 'Radioimg' src={require('../Images/Insurance.svg')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" value="6" />
                <img id = 'Radioimg' src={require('../Images/Selfemployment.svg')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" value="7"  />
                <img id = 'Radioimg' src={require('../Images/Investment.svg')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="problem" value="8" />
                <img id = 'Radioimg' src={require('../Images/Retirement.svg')} />
            </label>
        </div>
    );
    
}

export default Enquiryradiobutton;