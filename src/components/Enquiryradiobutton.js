import React from "react";
import "./Radiobutton.css";


const Enquiryradiobutton = (props) => {
    const mySpan = <span style={{display: 'inline-block', width: '80px'}} />
    
    return (
        <div
        name = "problem"
        // value={props.value}
        onChange={props.onChange}
        className = "problem">

            <label>
                <input type="radio" name="problem" value="1" id="problem1"/>
                <img id = 'Radioimg' src={require('../Images/Education.svg')}/>
                Education Schemes
            </label>
            {mySpan}
            <label>
                <input type="radio" name="problem" value="2" id="problem2"/>
                <img id = 'Radioimg' src={require('../Images/Healthcare.svg')} />
                Healthcare Schemes
            </label>
            {mySpan}
            <label>
                <input type="radio" name="problem" value="3" id="problem3" />
                <img id = 'Radioimg' src={require('../Images/Housing.svg')}/>
                Housing Schemes
            </label>
            {mySpan}
            <label>
                <input type="radio" name="problem" defaultValue="4" id="problem4"/>
                <img id = 'Radioimg' src={require('../Images/Account.svg')} />
                Account Statement
            </label>
            {mySpan}
            
            {/* <label>
                <input type="radio" name="problem" value="5" id="problem5"/>
                <img id = 'Radioimg' src={require('../Images/Insurance.svg')}/>
                Insurance
            </label>
            {mySpan} */}
            <label>
                <input type="radio" name="problem" value="5" id="problem6"/>
                <img id = 'Radioimg' src={require('../Images/Selfemployment.svg')} />
                Self Employment
            </label>
            {mySpan}
            {/* <label>
                <input type="radio" name="problem" value="7" id="problem7" />
                <img id = 'Radioimg' src={require('../Images/Investment.svg')}/>
                Investment
            </label>
            {mySpan} */}
            <label>
                <input type="radio" name="problem" value="6" id="problem8"/>
                <img id = 'Radioimg' src={require('../Images/Retirement.svg')} />
                Retirement
            </label>
        </div>
    );
    
}

export default Enquiryradiobutton;