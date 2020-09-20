import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import image_src from '../images/log.svg';
import { signIn } from '../utils/auth'
import LoadingDialog from './LoadingDialog';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:600,

  },
  avatar: {
    margin: 20,
    backgroundColor:"#ffcf00",

  },
  link:{
    color:"blue",
  
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
  const [user, setUser] = React.useState({email: '', password: ''})
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };


  const handleLogin = async () => {
      setLoading(true)
      try {
        await signIn(user.email, user.password)
      } catch(error) {
        setError(error)
      }
      setLoading(false)
  }

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={6} style={{display: 'flex',flexDirection: 'column',alignItems:"flex-end"}}>
        <Paper elevation={10} style={{marginTop:"10%",width:"90%"}} >
          <img src={image_src} style={{width:"100%", height:597,padding:"10%"}}/>
        </Paper>
      </Grid>
      <LoadingDialog open={loading}/>
      <Grid item xs={6}>
        <Paper elevation={10} style={{marginTop:"10%",width:"90%" }}>
          <Container
            style={{width:"100%", height:"100%" }}
            component="main"
            maxWidth="lg"
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <h1 style={{marginBottom:15}}>
                Login
              </h1>
              <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()} style={{width:"90%",alignContent:"center",boxShadow:"0 0 0 0", backgroundColor:"inherit"}}>
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
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
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
                  onClick={handleLogin}
                >
                  Login
                </Button>
              
                <Grid container>
                  <Grid item xs>
                    <Link className={classes.link} to="/forget">
                      Forgot password?
                    </Link> <br/><br/>
                    <Link className={classes.link} to="/signup">
                      or create a new account?
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