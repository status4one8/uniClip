import React, { useState, useEffect } from 'react';
import Header from './Header';
import Card from './Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './Home.css';
import firebase from 'firebase';
import 'firebase/firestore';
import { useAuth } from '../context';
import {clipboard as cb, nativeImage} from 'electron';
import { Grid } from '@material-ui/core';

//dummy values
const list=[
  {title:'A brief Note',time:'3 minutes ago',device:'Poco'},
  {title:'A brief Note',time:'3 minutes ago',device:'Poco'},
  {title:'A brief Note',time:'3 minutes ago',device:'Poco'},
]

function Home(){

  const { user } = useAuth();
  const [clipboard, setClipboard] = useState([]);

  useEffect(() => {
      firebase.firestore()
          .collection(`clipboard/${user.uid}/contents`)
          .orderBy('time', 'desc')
          .onSnapshot((querySnapshot) => {
              if (!querySnapshot) return;
              setClipboard(
                  querySnapshot.docs.map((d) => ({
                    ...d.data(),
                    id: d.id,
                })),
              );
          });
  }, []);


  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs="4">
          {clipboard.map((item) => <Card 
        id={item.id}
        title={item.content} 
        time={item.time} 
        device={item.device}
        isImage={item.isImage}
        deviceType={item.deviceType}
        /> )}
        </Grid>
        <Grid item xs="8">
        
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Home;
