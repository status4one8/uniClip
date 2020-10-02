import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {text_truncate} from '../utils'

const clipboardListener = require('electron-clipboard-extended');


const useStyles = makeStyles((theme) => ({
  typography: {
    marginBottom: '10px',
    fontSize:'20px'

  },
  device: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: '50px'
  },
  timediv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  // styles: {
  //   display: 'flex',
  //   paddingLeft: '10px',
  //   alignItems: 'center',
  //   backgroundColor: 'lightgreen',
  //   borderRadius: '50px',

  // },
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
      <ListItem alignItems="flex-start" button>
     
        <ListItemText primary={
          <>
             {
            isImage && <img src={title} className={classes.image}/>
        }
          {!isImage && 
          <Typography
            variant="h5"
            className={classes.typography}
            component="div"
          >
          {text_truncate(title,85)}
          </Typography>}
        </>
        }
        secondary={
          <>
            <span className={classes.timediv}>
            
            <span style={{display:'flex', alignItems:'center'}}>
              <AccessTimeIcon />
                <Typography
                  variant="body2"
                  style={{marginLeft: '10px',
                  fontSize:'13px'}}    
                  component="span"
                  >
                  {moment(time).fromNow()}
                </Typography>
            </span>

                
                <Typography
                  variant="body2"
                  className={classes.device}
                  component="span"
                  style={{ padding:"5px",width:'fit-content',
                  backgroundColor: deviceType === "PC" ? "#0079D8" : "#30D780"}}
                  >
                  {deviceType === "PC" ? <LaptopMacIcon /> : <SmartphoneIcon />}
                  <span style={{marginLeft:'10px'}}>{device}</span>  
                </Typography>

          </span>
            </>
        }
        />
        
        
          
          
      </ListItem>
    


















    // <Card className={classes.root}>
    //     {
    //         isImage && <img src={title} className={classes.image}/>
    //     }
    //     <CardContent style={{width:"100%",padding:"13px"}}>
    //       {!isImage && 
    //       <Typography
    //         variant="h5"
    //         className={classes.typography}
    //         component="div"
    //       >
    //       {text_truncate(title,85)}
    //       </Typography>}
    //       <div className={classes.timediv} xs="6">
            
    //         <div style={{display:'flex', alignItems:'center'}}>
    //           <AccessTimeIcon />
    //             <Typography
    //               variant="body2"
    //               style={{marginLeft: '10px',
    //               fontSize:'13px'}}    
    //               component="p"
    //               >
    //               {moment(time).fromNow()}
    //             </Typography>
    //         </div>

                
    //             <Typography
    //               variant="body2"
    //               className={classes.device}
    //               component="p"
    //               style={{ padding:"5px",width:'fit-content',
    //               backgroundColor: deviceType === "PC" ? "#0079D8" : "#30D780"}}
    //               >
    //               {deviceType === "PC" ? <LaptopMacIcon /> : <SmartphoneIcon />}
    //               <div style={{marginLeft:'10px'}}>{device}</div>  
    //             </Typography>

    //       </div>
    //     </CardContent>
     
  );
}

