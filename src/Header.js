import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LoginPanel from './LoginPanel';
// import TimerLogout from './TimerLogout';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [useUser, setUseUser] = useState('');

  function handleHome() {
    history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container xs={12} alignItems="center">
            <Grid item xs={1}>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" className={classes.title} onClick={handleHome}>
                Жир войны
              </Typography>
            </Grid>
            <Grid container xs={3} justify="flex-end">
              {// <TimerLogout useUser={useUser} setUseUser={setUseUser}/>
}
            </Grid>
            <Grid container xs={6} justify="flex-end">
              <LoginPanel />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}