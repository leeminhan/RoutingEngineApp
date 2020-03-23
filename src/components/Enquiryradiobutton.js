import React from "react";
import "./Radiobutton.css";


const Enquiryradiobutton = props => {
    
    return (
        <div>
            <label>
                <input type="radio" name="Enquiry" defaultValue="small" />
                <img id = 'Radioimg' src={require('../Images/Educationschemes.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Enquiry" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Healthcareschemes.png')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Enquiry" defaultValue="small"  />
                <img id = 'Radioimg' src={require('../Images/Housingschemes.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Enquiry" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Accountstatement.png')} />
            </label>
            <br></br>
            
            <label>
                <input type="radio" name="Enquiry" defaultValue="small" />
                <img id = 'Radioimg' src={require('../Images/Insurance.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Enquiry" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Selfemployment.png')} />
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Enquiry" defaultValue="small"  />
                <img id = 'Radioimg' src={require('../Images/Investment.png')}/>
            </label>
            <span style={{display: 'inline-block', width: '10px'}} />
            <label>
                <input type="radio" name="Enquiry" defaultValue="big" />
                <img id = 'Radioimg' src={require('../Images/Retirement.png')} />
            </label>
        </div>
    );
    
}

export default Enquiryradiobutton;