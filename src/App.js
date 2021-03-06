import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HomePage from './HomePage';
import RegistrationPage from './RegistrationPage';
import Header from './Header';
import Favorites from './Favorites';
import SerieDetail from './SerieDetail';
import Profile from './Profile';
import TabPanel from './TabPanel';
import NewsList from './NewsList';
import LoginPage from './LoginPage';

export default function App(props) {
  console.log(props.store);
  return (
    <Router>
      <Header />
      <Grid container direction="row">
        <Grid item xs={2}>
          <TabPanel />
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route path="/LoginPage" exact component={LoginPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/detail/:seriesDitals" component={SerieDetail} />
            <Route path="/profile" component={Profile} />
            <Route path="/news/:page" component={NewsList} />
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}
