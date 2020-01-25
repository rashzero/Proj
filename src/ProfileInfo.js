/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 200,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  typographyPopup: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
}));


export default function ProfileInfo(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const renderNames = ['name', 'age'];
  const fieldsName = ['current', 'new', 'newConfirm'];
  const titleFielsUser = ['Имя: ', 'Возраст: ', 'Пол: '];
  const titleFieldsPas = ['Текущий пароль: ', 'Новый пароль: ', 'Подтвердить пароль: '];

  console.log(props.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = async () => {
    await fetch((`http://localhost:8080/api/users?name=${props.user.name}`), {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: props.user.name,
        id: props.user.id,
      }),
    });

    localStorage.setItem('message', 'logout');
    // props.setState('');
    this.props.history.push('/');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderData = renderNames.map((renderName) => (
    <Grid item>
      <TextField
        required
        id="filled-required-name"
        onChange={(event) => props.handleChangeData(event, renderName)}
        className={classes.textField}
        defaultValue={props.user[renderName]}
      />
    </Grid>
  ));

  const renderFieldPassword = fieldsName.map((fieldName) => (
    <Grid item xs={6}>
      <TextField
        id={fieldName}
        onChange={(event) => props.handleChangePassword(event, fieldName)}
        className={classes.textField}
        type="password"
        error={props.resetForm.error[fieldName]}
        helperText={props.resetForm.error[fieldName]}
      />
    </Grid>
  ));

  const renderTitlefield = titleFielsUser.map((titleField) => (
    <Grid item>
      <Box color="primary.main" fontSize={16} paddingTop={1}>{titleField}</Box>
    </Grid>
  ));

  const renderTitlefieldPas = titleFieldsPas.map((titleField) => (
    <Grid item>
      <Box color="primary.main" fontSize={16} paddingTop={1}>{titleField}</Box>
    </Grid>
  ));

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {renderTitlefield}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {renderData}
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">пол</InputLabel>
                <Select value={props.gender} onChange={props.handleChangeGender}>
                  <MenuItem value="man">Мужской</MenuItem>
                  <MenuItem value="woman">Женский</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={props.handleLoginSave}
          >
            Сохранить
          </Button>
        </Grid>
        <hr align="center" width="500" size="2" color="#ff0000" />
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {renderTitlefieldPas}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            {renderFieldPassword}
          </Grid>
        </Grid>
        <Grid xs={12}>
          <center>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={props.handlePasswordSave}
            >
              Изменить пароль
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={props.getUser}
            >
              Отмена
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleClick}
            >
              Удалить профиль
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typographyPopup}>
                Вы уверены, что хотите удалить профиль?
              </Typography>
              <center>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleConfirm}
                >
                  Да
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={handleClose}
                >
                  Нет
                </Button>
              </center>
            </Popover>
          </center>
        </Grid>
      </Grid>
    </div>
  );
}
