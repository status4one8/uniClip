import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    progress: {
        color: red['A700'],
        marginRight: 20
    }
}))

const LoadingDialog = props => {

    const {open, title="Loading", text="Please Wait"} = props;
    const classes = useStyles()

    return (
        <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={classes.content}>
                <CircularProgress size={50} className={classes.progress}/>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default LoadingDialog
