import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function Snackbars(props) {
  const classes = useStyles();

  return (
    <div>
      <Snackbar
        style={{ position: 'absolute', top: '600px' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Вы вошли!</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={props.handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}
