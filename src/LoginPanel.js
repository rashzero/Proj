/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GuestGreeting from './GuestGreeting';
import UserGreeting from './UserGreeting';
import request from './Request';

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

  getUser = async () => {
    const responseUser = await request({
      url: 'http://localhost:8080/api/users',
    });
    if (responseUser) {
      this.props.getUserAction(responseUser);
    }
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
    const responseLogoutStatus = await request({
      url: (`http://localhost:8080/api/logout?name=${this.props.state.user.id}`),
    });

    localStorage.setItem('message', 'logout');
    this.setState({
      login: '',
    });
    this.props.outUserAction(responseLogoutStatus);
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
    const responseLoginStatus = await request({
      url: 'http://localhost:8080/api/users/login',
      method: 'POST',
      redirect: 'follow',
      body: {
        name: this.state.login,
        password: this.state.password,
      },
    });

    if (responseLoginStatus) {
      localStorage.setItem('message', 'login');
      this.props.getUserAction(responseLoginStatus);
      this.setState({
        open: true,
      });
    } else {
      alert('Данные неверные');
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

const getUserActionObject = (data) => ({
  type: 'USER_LOGIN',
  payload: data,
});

const outUserActionObject = (data) => ({
  type: 'USER_LOGOUT',
  payload: data,
});

function mapDispatchToProps(dispatch) {
  return {
    getUserAction(data) {
      const userActionResult = getUserActionObject(data);
      dispatch(userActionResult);
    },
    outUserAction(data) {
      const userActionResult = outUserActionObject(data);
      dispatch(userActionResult);
    },
  };
}


const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPanel));
