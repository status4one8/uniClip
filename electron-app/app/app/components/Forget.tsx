import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "11%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:600,
    background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
  },
  submit: {
    margin: theme.spacing(0, "16%", 4),
    width:"80%"
  },
  root: {
    flexGrow: 1,

  },

}));

export default function () {


  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={6}>
          <Paper style={{width:"100%", height:600,  marginTop: "10%",alignSelf:"flex-end", background: 'linear-gradient(to right, #8e2de2, #4a00e0)'}}>
            <h1 style={{fontSize:30, color:"white"}}>Password Reset</h1>
          </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper >
          <Container
            component="main"
            maxWidth="lg"
          >
            <div className={classes.paper}>
              <h1 style={{marginBottom:15}}>
                Password Reset
              </h1>
              <h3>Provide email so that we can send you a password reset mail</h3>
                <TextField
                  variant="outlined"
                  margin="normal"
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
                  style={{alignSelf:"flex-end"}}
                  onClick={handleLogin}
                >
                Submit 
                </Button>
              
                <Grid container>
                  <Grid item xs>
                    <br/>
                    <Link to="/login">
                      or create a new account?
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