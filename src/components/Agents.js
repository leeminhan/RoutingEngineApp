import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button2 from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Button} from "react-bootstrap";
import "./Radiobutton.css";


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

const Agents = () => {
    const classes = useStyles();

    return (
        <div className = 'agents'>
            <br></br>
            <h1> Meet Our Agents </h1>
            <br></br>

            <Grid container spacing={3}  > 
                <Grid item xs ={4} className = 'cardGrid'>
                    <Card className= {classes.root}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Michelle Lee"
                            height="140"
                            image= {require("../Images/Agent1.jpg")}
                            title="Agent1"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Michelle Lee
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Michelle has taken over 200 calls and has recieved numerous compliments
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button2 size="small"  className = 'cardButton'>
                            Connect
                            </Button2>
                            <Button2 size="small"  className = 'cardButton'>
                            Reviews
                            </Button2>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs ={4} className = 'cardGrid'>
                    <Card className= {classes.root}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Michelle Lee"
                            height="140"
                            image= {require("../Images/Agent1.jpg")}
                            title="Agent2"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Michelle Lee
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Michelle has taken over 200 calls and has recieved numerous compliments
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button2 size="small"  className = 'cardButton'>
                            Connect
                            </Button2>
                            <Button2 size="small"  className = 'cardButton'>
                            Reviews
                            </Button2>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs ={4} className = 'cardGrid'>
                    <Card className= {classes.root}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Michelle Lee"
                            height="140"
                            image= {require("../Images/Agent1.jpg")}
                            title="Agent3"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Michelle Lee
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Michelle has taken over 200 calls and has recieved numerous compliments
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button2 size="small"  className = 'cardButton'>
                            Connect
                            </Button2>
                            <Button2 size="small"  className = 'cardButton'>
                            Reviews
                            </Button2>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs ={12} className = 'cardGrid'>
                    <Button className="agent-btn">
                        See full list
                    </Button>
                </Grid>
                <br></br>
                <span style={{display: 'inline-block', width: '10px'}} />
            </Grid>

            
            
            
            


        </div>
    );
} 

export default Agents;




   
