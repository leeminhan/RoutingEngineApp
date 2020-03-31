import React from "react";
import { Grid } from '@material-ui/core';
import "./Radiobutton.css";

const FAQ = () => {
    return (
        <div className = 'FAQ'>
            <br></br>
            <Grid container spacing={3} >
                <Grid item xs ={12}>
                    <h1 className = 'FAQtitle'> Frequently Asked Questions</h1>
                </Grid>

                <Grid item xs ={4}>
                    <h3 className = 'FAQtitle'> Retirement</h3>
                    <h5> Retirement Sum Scheme</h5>
                    <h5> Silver Support Scheme</h5>
                    <h5> Workfare Income Supplement Scheme</h5>
                </Grid>

                <Grid item xs ={4}>
                    <h3 className = 'FAQtitle'> Housing</h3>
                    <h5> Housing Scheme</h5>
                    <h5> Home Protection Scheme</h5>
                </Grid>

                <Grid item xs ={4}>
                    <h3 className = 'FAQtitle'> Healthcare</h3>
                    <h5> Medisave</h5>
                    <h5> Medishield Life</h5>
                    <h5> Eldershielde</h5>
                </Grid>

                <Grid item xs ={4}>
                    <h3 className = 'FAQtitle'>  Optimising my CPF</h3>
                    <h5> CPF investment Scheme</h5>
                </Grid>

                <Grid item xs ={4}>
                    <h3 className = 'FAQtitle'> Self-Employment</h3>
                    <h5> Contribute-As-You-Earn (CAYE)</h5>
                </Grid>

                <Grid item xs ={4}>
                    <h3 className = 'FAQtitle'> Others</h3>
                    <h5> CPF Nomination Scheme</h5>
                    <h5> Education Scheme</h5>
                    <h5> Dependants Protection Scheme</h5>

                </Grid>



            </Grid>

        </div>
    );
}

export default FAQ;