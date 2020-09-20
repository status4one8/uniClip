import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { relative } from 'path';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:600,
    justifyContent:"center",
    
  },
  submit: {
    margin: theme.spacing(0, "16%", 4),
    width:"80%"
  },
  root: {
    flexGrow: 1,

  },
  link:{
    color:"blue",
  },
}));

export default function () {
  
  const [spacing, setSpacing] = React.useState(0);
  const [user, setUser] = React.useState({email: '', password: ''})
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };




  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={6} style={{display: 'flex',flexDirection: 'column',alignItems:"flex-end"}}>
          <Paper elevation={10} style={{width:"90%", height:600,  marginTop: "10%",alignSelf:"flex-end", background: "#3F51B5",display: "flex",justifyContent: "center",alignItems: "center"}}>
            <h1 style={{fontSize:50, color:"white"}}>Password Reset</h1>
          </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={10} style={{marginTop:"10%",width:"90%" }}>
          <Container
            component="main"
            maxWidth="lg"
          >
            <div className={classes.paper}>

              <h3>Provide your email so that we can send you a password reset mail</h3>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{marginTop:25}}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={user.email}
                  onChange = {(e) => setUser({...user, email: e.target.value})}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{marginTop:25}}
                  onClick={()=>{}}
                >
                Submit 
                </Button>
              
                <Grid container>
                  <Grid item xs>
                    <br/>
                    <Link className={classes.link} to="/">
                      Go back to login 
                    </Link>
                  </Grid>
                </Grid>
            </div>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}