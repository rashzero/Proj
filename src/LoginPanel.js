/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import GuestGreeting from './GuestGreeting';
import UserGreeting from './UserGreeting';
import Request from './Request';

class LoginPanel extends React.Component {
  state = {
    login: '',
    password: '',
    open: false,
  };

  componentDidMount() {
    window.addEventListener('storage', this.authListener);
    this.getUser();
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.authListener);
  }

  authListener = async (event) => {
    if (event.key !== 'message') return;
    switch (event.newValue) {
      case 'logout':
        this.props.setUseUser('');
        break;
      case 'login':
        if (this.props.useUser) {
          return;
        }
        this.getUser();
        break;
      default:
        break;
    }
  }

  getUser = async () => {
    console.log(this.state.login);
    const responseUser = await Request({
      url: 'http://localhost:8080/api/users',
    });
    if (responseUser.name) {
      this.props.setUseUser(responseUser.name);
      this.setState({
        login: responseUser.name,
      });
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
    await Request({
      url: (`http://localhost:8080/api/logout?name=${this.state.login}`),
    });

    localStorage.setItem('message', 'logout');
    this.setState({
      login: '',
    });
    this.props.setUseUser('');
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
    const responseLoginStatus = await Request({
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
      this.props.setUseUser(this.state.login);
      this.setState({
        open: true,
      });
    } else {
      // eslint-disable-next-line no-alert
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
    return (
      <Greeting
        login={this.state.login}
        handleLogout={this.handleLogout}
        handleChangeLogin={this.handleChangeLogin}
        handleChangePassword={this.handleChangePassword}
        handleLogin={this.handleLogin}
        handleRegister={this.handleRegister}
        handleProfile={this.handleProfile}
        useUser={this.props.useUser}
        open={this.state.open}
        handleClose={this.handleClose}
      />
    );
  }
}

function Greeting(props) {
  if (props.useUser) {
    return (
      <UserGreeting
        handleLogout={props.handleLogout}
        handleProfile={props.handleProfile}
        login={props.login}
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

export default withRouter(LoginPanel);
