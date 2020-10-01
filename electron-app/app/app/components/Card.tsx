import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import {clipboard, nativeImage} from 'electron';
import firebase from 'firebase';
import 'firebase/firestore';
import {text_truncate} from '../utils'

const clipboardListener = require('electron-clipboard-extended');


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px',
    width: "100%" 
  },
  typography: {
    marginBottom: '10px',
    fontSize:'20px'

  },
  device: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: '10px'
  },
  timediv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  styles: {
    display: 'flex',
    paddingLeft: '10px',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: '50px',

  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  image: {
    width: '100%',
    maxHeight: 300,
    objectFit: 'cover'
  }
}));

export default function ({id, title,time,device, isImage, deviceType}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(deviceType)
  return (
    <Card className={classes.root}>
        {
            isImage && <img src={title} className={classes.image}/>
        }
        <CardContent style={{width:"100%",padding:"13px"}}>
          {!isImage && 
          <Typography
            variant="h5"
            className={classes.typography}
            component="div"
          >
          {text_truncate(title,85)}
          </Typography>}
          <div className={classes.timediv} xs="6">
            
            <div style={{display:'flex', alignItems:'center'}}>
              <AccessTimeIcon />
                <Typography
                  variant="body2"
                  style={{marginLeft: '10px',
                  fontSize:'13px'}}    
                  component="p"
                  >
                  {moment(time).fromNow()}
                </Typography>
            </div>

                
                <Typography
                  variant="body2"
                  className={classes.device}
                  component="p"
                  style={{ padding:"5px",width:'fit-content',
                  backgroundColor: deviceType === "PC" ? "#0079D8" : "#30D780"}}
                  >
                  {deviceType === "PC" ? <LaptopMacIcon /> : <SmartphoneIcon />}
                  <div style={{marginLeft:'10px'}}>{device}</div>  
                </Typography>

          </div>
        </CardContent>

        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton> */}
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Tooltip title="Copy">
            <IconButton onClick={async () => {
              clipboardListener.stopWatching()
              if (isImage) {
                const image = nativeImage.createFromDataURL(title)
                clipboard.writeImage(image)
              } else {
                clipboard.writeText(title)
              }
              clipboardListener.startWatching()
            }}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>

          {isImage && <Tooltip title="Download">
            <IconButton onClick={() => {
                var dataURL = title;
                var a = document.createElement("a");
                a.download = "clipboardImage";
                a.href = dataURL;
                document.body.appendChild(a);
                a.click();
            }}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title="Delete">
            <IconButton onClick={() => {
              firebase.firestore().collection(`clipboard/${firebase.auth().currentUser.uid}/contents`).doc(id).delete();
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
