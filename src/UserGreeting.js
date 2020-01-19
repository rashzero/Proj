import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Snackbars from './Snackbars';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bigAvatar: {
    width: 50,
    height: 50,
    margin: 5,
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));

export default function UserGreeting(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <span onClick={props.handleProfile}>
          <Avatar
            src="https://i.pinimg.com/236x/f9/ee/ac/f9eeac4c5785989919500487b12a66b9--pumpkin-template-printable-pumpkin-stencils.jpg"
            className={classes.bigAvatar}
          />
        </span>
        <form noValidate autoComplete="off">
          <Typography className={classes.title} variant="h6">
            <span onClick={props.handleProfile}>{props.login}</span>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={props.handleLogout}
            >
                            Выйти
            </Button>
          </Typography>
        </form>
      </div>
      <div>
        <Snackbars open={props.open} handleClose={props.handleClose} />
      </div>
    </div>
  );
}
