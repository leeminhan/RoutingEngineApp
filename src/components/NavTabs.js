import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PrefForm from './PrefForm';
import { Container, AppBar,Tabs,Tab,Typography,Box} from '@material-ui/core';
import "./Radiobutton.css";

//-------------------Styling---------------------------------------------------------------------------------------
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


//--------------------Declaring functions to be used in NavTabs----------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
  
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      className = "myTabs"
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

//-------------------------------------------------------------------------------------------------------------------------



const NavTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleStateCallBack = (fname, lname, lang,chat,prob) =>{
  //   parentStateCallBack(fname, lname, lang,chat,prob);
  // }

  return (
    <div className={classes.root}>
        
          <div className="AppBar">
            <AppBar position="static" color = 'transparent'>
                <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                indicatorColor = "secondary"
                
                >
                <LinkTab label="CPF Queries" href="/drafts" {...a11yProps(0)} />
                <LinkTab label="About Us" href="/trash" {...a11yProps(1)} />
                <LinkTab label="FAQ" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
          </div>
            <TabPanel value={value} index={0}>
                <PrefForm statesCallBack = {props.parentStateCallBack}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Page Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>
        
    </div>
  );
}

export default NavTabs;