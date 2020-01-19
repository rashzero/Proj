import React from 'react';
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
  paper: {
    padding: theme.spacing(3, 2),
    width: '100%',
    maxWidth: 500,
  },
  div: {
    marginTop: 50,
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function GuestPage(props) {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Grid container xs={12} direction="row" justify="center">
        <Grid item xs={12}>
          <center>
            <Typography className={classes.title} variant="h6" noWrap>
              Вход
            </Typography>
          </center>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center">
            <center>
              <form noValidate autoComplete="off">
                <Grid item xs={12}>
                  <TextField
                    id="filled-required"
                    placeholder="login:"
                    onChange={props.handleChangeLogin}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-password-input"
                    className={classes.textField}
                    type="password"
                    placeholder="password:"
                    onChange={props.handleChangePassword}
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </form>
            </center>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
