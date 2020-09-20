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
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
  },
  typography: {
    margin: '15px',
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

}));

export default function ({title,time,device}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        <CardContent>
          <Typography
            variant="h5"
            className={classes.typography}
            component="div"
          >
            {title}
          </Typography>
          <div className={classes.div}>
            <AccessTimeIcon />
            <Typography
              variant="body2"
              className={classes.typography}
              component="p"
            >
              {time}
            </Typography>
          </div>
          <div className={classes.styles}>
            <SmartphoneIcon />
            <Typography
              variant="body2"
              className={classes.typography}
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
            <IconButton>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Collapse>
    </Card>
  );
}
