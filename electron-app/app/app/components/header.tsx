import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth } from '../context';
import firebase from 'firebase';
import 'firebase/auth';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth:240
   },
 
  title: {
  margin: 'auto -16px',
  padding: '16px 32px',
  color:'#fff',
  // fontFamily:'"McLaren", cursive',
  fontWeight: '200',
    flexGrow: 1,
  },
  login:{
    // fontFamily:'"McLaren", cursive',
    fontWeight: '200',

    fontSize:"20px"
  },
  header: {
    margin: 0,
    background: "#2e2e2e",
  }
}));

export default function Header() {

  const { user } = useAuth();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="primary" className={classes.header} position="static" color='secondary'>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Uniclip
          </Typography>
          <Button
        color="inherit" className={classes.login}
        onClick={() => {
          console.log(user);
          firebase
            .auth()
            .signOut()
            .catch((e) => console.log(e));
        }}
      >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}