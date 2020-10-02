import React, { useState, useEffect } from 'react';
import Header from './Header';
import List from '@material-ui/core/List';
import ListValues from './List';
import './Home.css';
import firebase from 'firebase';
import 'firebase/firestore';
import { useAuth } from '../context';
import { clipboard as cb, nativeImage } from 'electron';
import { Grid } from '@material-ui/core';
import SearchAppBar from './Searchbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//dummy values
const list = [
  { title: 'A brief Note', time: '3 minutes ago', device: 'Poco' },
  { title: 'A brief Note', time: '3 minutes ago', device: 'Poco' },
  { title: 'A brief Note', time: '3 minutes ago', device: 'Poco' },
];
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px',
    // width: "100%",
    backgroundColor: '#fff',
    // borderRadius:'15px',
    maxWidth: '100%',
  },
  gridStyle: {
    paddingRight: '15px',
    margin: '15px',
    maxWidth: '100%',
  },
  divS: {
    maxHeight: '90vh',
    overflowY: 'auto',
  },
}));
function Home() {
  const classes = useStyles();

  const { user } = useAuth();
  const [clipboard, setClipboard] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection(`clipboard/${user.uid}/contents`)
      .orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot) return;
        setClipboard(
          querySnapshot.docs.map((d) => ({
            ...d.data(),
            id: d.id,
          }))
        );
      });
  }, []);

  return (
    <div>
      <Header />
      <Grid container spacing={0}>
        <Grid item className={classes.gridStyle} xs={4}>
          <SearchAppBar />
          <div className={classes.divS}>
            <List className={classes.root}>
              {clipboard.map((item) => (
                <ListValues
                  key={item.id}
                  id={item.id}
                  title={item.content}
                  time={item.time}
                  device={item.device}
                  isImage={item.isImage}
                  deviceType={item.deviceType}
                />
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
