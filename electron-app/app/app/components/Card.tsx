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

const clipboardListener = require('electron-clipboard-extended');


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
    width: "45%" 
  },
  typography: {
    margin: '15px',
    maxWidth: 200,
  },
  chipTypography: {
    margin: '15px',
    width: 150
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
  },
  styles: {
    display: 'flex',
    paddingLeft: '10px',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    borderRadius: '50px',
    width: 150
  },
  expand: {
    marginLeft: 'auto',
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
      <CardActions disableSpacing>
        <CardContent>
          {!isImage && <Typography
            variant="h5"
            className={classes.typography}
            component="div"
          >
            {title}
          </Typography>}
          <div className={classes.div}>
            <AccessTimeIcon />
            <Typography
              variant="body2"
              className={classes.typography}
              component="p"
            >
              {moment(time).fromNow()}
            </Typography>
          </div>
          <div className={classes.styles} style={{
            backgroundColor: deviceType === "PC" ? "#0079D8" : "#30D780"
          }}>
            {deviceType === "PC" ? <LaptopMacIcon /> : <SmartphoneIcon />}
            <Typography
              variant="body2"
              className={classes.chipTypography}
              component="p"
            >
              {device}
            </Typography>
          </div>
        </CardContent>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
    </Card>
  );
}
