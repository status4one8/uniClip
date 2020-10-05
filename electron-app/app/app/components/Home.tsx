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
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

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
  const [cardVal, setCardVal] = useState({
    id: '',
    title: '',
    time: null,
    device: '',
    isImage: null,
    deviceType: '',
  });

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
  var isClicked;
  function onClickFunc(
    isClicked,
    id,
    title,
    time,
    device,
    isImage,
    deviceType
  ) {
    setCardVal({
      id,
      title,
      time,
      device,
      isImage,
      deviceType,
    });
  }
  console.log(cardVal);

  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item className={classes.gridStyle} xs={4}>
          <SearchAppBar />
          <div className={classes.divS}>
            <List className={classes.root}>
              {clipboard.map((item) => (
                <>
                  <ListValues
                    key={item.id}
                    id={item.id}
                    title={item.content}
                    time={item.time}
                    device={item.device}
                    isImage={item.isImage}
                    deviceType={item.deviceType}
                    func={onClickFunc}
                  />
                  <Divider />
                </>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item xs={7}>
          <Card className={classes.root}>
            {cardVal.isImage && (
              <img
                src={cardVal.title}
                //className={classes.image}
              />
            )}
            <CardContent style={{ width: '100%', padding: '13px' }}>
              {!cardVal.isImage && (
                <Typography
                  variant="h5"
                  //className={classes.typography}
                  component="div"
                >
                  {cardVal.title}
                </Typography>
              )}
              <div
                //className={classes.timediv}
                xs="6"
              >
                <div style={{ display: 'flex', alignItems: 'center',marginTop:'30px' }}>
                  
                  <Typography
                    variant="body2"
                    style={{display:'flex', marginLeft: '10px', fontSize: '13px',marginRight:'25px' }}
                    component="p"
                  >
                    <AccessTimeIcon style={{marginRight:'5px'}}/>
                    {moment(cardVal.time).fromNow()}
                  </Typography>

                  <Typography
                  variant="body2"
                  //className={classes.device}
                  component="p"
                  style={{display:'flex',
                  borderRadius:'50px',
                    padding: '5px',
                    width: 'fit-content',
                    backgroundColor:
                      cardVal.deviceType === 'PC' ? '#0079D8' : '#30D780',
                  }}
                >
                  {cardVal.deviceType === 'PC' ? <LaptopMacIcon /> : <SmartphoneIcon /> }
                  <div style={{ marginLeft: '10px' }}>{cardVal.device}</div>
                </Typography>
                </div>

                
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
