import React from 'react';
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: 150,
    height: 39,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function GuestGreeting(props) {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="filled-required"
        placeholder="login:"
        onChange={props.handleChangeLogin}
        className={classes.textField}
      />
      <TextField
        id="filled-password-input"
        className={classes.textField}
        type="password"
        placeholder="password:"
        onChange={props.handleChangePassword}
        autoComplete="current-password"
      />
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={props.handleLogin}
      >
        Войти
      </Button>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={props.handleRegister}
      >
        Регистрация
      </Button>
    </form>
  );
}
