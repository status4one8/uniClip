import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import { useAuth } from "../context";
import { signUp } from "../utils/auth";
import LoadingDialog from './LoadingDialog';

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
  const {setUserName} = useAuth();
  const [credentials, setCredentials] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleChange = (event) => {
    setCredentials({
      ...credentials, 
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitted', credentials)
    try {
        setUserName(credentials.name);
        await signUp(credentials.email, credentials.password);
    } catch (error) {
        console.log(error)
        setError(error.message);
    }
    setLoading(false);
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
          <LoadingDialog open={loading}/>
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
              <form className={classes.form} noValidate style={{width:"90%",alignContent:"center",boxShadow:"0 0 0 0", backgroundColor:"inherit"}}
                
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={credentials.name}
                  onChange = {handleChange}
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={credentials.email}
                  onChange={handleChange}
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
                  value={credentials.password}
                  onChange={handleChange}
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
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
              </form>
            </div>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
