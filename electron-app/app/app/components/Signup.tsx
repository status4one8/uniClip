import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import image_src from '../images/login.png';
import { CenterFocusStrong } from '@material-ui/icons';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "11%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:600,
    background:'linear-gradient(to right, #abbaab, #ffffff)',

  },
  avatar: {
    margin: 20,
    backgroundColor: "red",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, "16%", 4),
    width:"80%"
  },
  remember: {
    color: '#000',
  },
  root: {
    flexGrow: 1,

  },

}));

export default function () {

  const [spacing, setSpacing] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };


  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={6}>
        {/* <Paper className={classes.paper} > */}
          <img src={image_src} style={{width:"100%", height:600,  marginTop: "10%",alignSelf:"flex-end"}}/>
        {/* </Paper> */}
      </Grid>
      <Grid item xs={6}>
        <Paper >
          <Container
            style={{ backgroundColor: 'white',width:"100%", height:"100%" }}
            component="main"
            maxWidth="lg"
            style={{background: 'linear-gradient(to right, #abbaab, #ffffff)'}}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <h1 style={{marginBottom:15}}>
                Sign up
              </h1>
              <form className={classes.form} noValidate style={{width:"90%",alignContent:"center",boxShadow:"0 0 0 0", backgroundColor:"inherit"}}>
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
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="remember" className={classes.remember} />
                  }
                  label="Remember me"
                  style={{alignItems:'center'}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{alignSelf:"flex-end"}}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
