/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GuestGreeting from './GuestGreeting';
import UserGreeting from './UserGreeting';
import request from './Request';
import { getUserActionObject, outUserActionObject } from './actions/actions';

class LoginPanel extends React.Component {
  state = {
    login: '',
    password: '',
    open: false,
  };

  componentDidMount() {
    window.addEventListener('storage', this.authListener);
    this.getUser();
    console.log(this.props);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.authListener);
  }

  authListener = async (event) => {
    if (event.key !== 'message') return;
    switch (event.newValue) {
      case 'logout':
        this.props.outUserAction({});
        break;
      case 'login':
        if (this.props.state.user) {
          return;
        }
        this.getUser();
        break;
      default:
        break;
    }
  }

  getUser = () => {
    this.props.getUserAction();
  }

  handleChangeLogin = (event) => {
    this.setState({
      login: event.target.value,
    });
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  handleLogout = async () => {
    localStorage.setItem('message', 'logout');
    this.setState({
      login: '',
    });
    this.props.outUserAction(this.props.state.user.id);
    this.props.history.push('/');
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false,
    });
  };

  handleLogin = async () => {
    this.props.loginAction(this.state.login, this.state.password);
    if (this.state.login) {
      this.setState({
        open: true,
      });
    }
  }

  handleRegister = () => {
    this.props.history.push('/registration');
  }

  handleProfile = () => {
    this.props.history.push('/profile');
  }

  render() {
    console.log(this.props.state);
    return (
      <Greeting
        handleLogout={this.handleLogout}
        handleChangeLogin={this.handleChangeLogin}
        handleChangePassword={this.handleChangePassword}
        handleLogin={this.handleLogin}
        handleRegister={this.handleRegister}
        handleProfile={this.handleProfile}
        user={this.props.state.user}
        open={this.state.open}
        handleClose={this.handleClose}
      />
    );
  }
}

function Greeting(props) {
  if (props.user.name) {
    return (
      <UserGreeting
        user={props.user}
        handleLogout={props.handleLogout}
        handleProfile={props.handleProfile}
        open={props.open}
        handleClose={props.handleClose}
      />
    );
  }
  return (
    <GuestGreeting
      handleChangeLogin={props.handleChangeLogin}
      handleChangePassword={props.handleChangePassword}
      handleLogin={props.handleLogin}
      handleRegister={props.handleRegister}
    />
  );
}

function mapDispatchToProps(dispatch) {
  return {
    async getUserAction() {
      const responseUser = await request({
        url: 'http://localhost:8080/api/users',
      });
      const userActionResult = getUserActionObject(responseUser);
      dispatch(userActionResult);
    },

    async outUserAction(data) {
      const responseLogoutStatus = await request({
        url: (`http://localhost:8080/api/logout?name=${data}`),
      });
      const userActionResult = outUserActionObject(responseLogoutStatus);
      dispatch(userActionResult);
    },

    async loginAction(login, pas) {
      const responseLoginStatus = await request({
        url: 'http://localhost:8080/api/users/login',
        method: 'POST',
        body: {
          name: login,
          password: pas,
        },
      });
      console.log(responseLoginStatus);
      if (responseLoginStatus.name) {
        localStorage.setItem('message', 'login');
        this.getUserAction();
      } else {
        alert('Данные неверные');
      }
    },
  };
}


const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPanel));
