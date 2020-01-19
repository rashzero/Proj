import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Request from './Request';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(2),
    width: 200,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  button: {
    margin: theme.spacing(3),
  },
  title: {
    width: '100%',
    maxWidth: 500,
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3, 2),
    width: '100%',
    maxWidth: 500,
  },
  text: {
    marginTop: theme.spacing(4),
    position: 'absolute',
    paddingLeft: '5%',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 50,
  },
}));

export default function RegistrationPage() {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Мужской');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState('');
  const history = useHistory();

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeWeb = (event) => {
    setWeb(event.target.value);
  };


  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const userDataPost = async () => {
    await Request({
      url: 'http://localhost:8080/api/users',
      method: 'POST',
      body: {
        name: login,
        password,
        age,
        email,
        web,
        gender,
      },
    });
  };

  async function handleRegistration() {
    userDataPost();
    history.push('/');
  }

  function handleHome() {
    history.push('/');
  }

  return (

    <div>
      <Grid container xs={12} direction="row" justify="center">
        <Grid item xs={12}>
          <center>
            <Typography className={classes.title} variant="h6" noWrap>
              Регистрация
            </Typography>
          </center>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container xs={12} direction="row" justify="center">
            <Grid item xs={3}>
              <span className={classes.text}> Имя: </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="filled-required"
                onChange={handleChangeLogin}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.text}>
                Пароль:
              </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="filled-password-input"
                className={classes.textField}
                type="password"
                onChange={handleChangePassword}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.text}>
                Почта:
              </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="filled-email-input"
                className={classes.textField}
                type="email"
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.text}>
                Сайт:
              </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="filled-url-input"
                className={classes.textField}
                type="url"
                onChange={handleChangeWeb}
              />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.text}>
                Возраст:
              </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="filled-url-input"
                className={classes.textField}
                type="url"
                onChange={handleChangeAge}
              />
            </Grid>
            <Grid item xs={3}>
              <span className={classes.text}>
                Пол:
              </span>
            </Grid>
            <Grid item xs={9}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                <Select value={gender} onChange={handleChangeGender}>
                  <MenuItem value="man">Мужской</MenuItem>
                  <MenuItem value="woman">Женский</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleRegistration}
              >
                Регистрация
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleHome}
              >
                На главную
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
