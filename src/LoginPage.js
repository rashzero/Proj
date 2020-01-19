import React from 'react';
import { withRouter } from 'react-router-dom';
import Request from './Request';
import GuestPage from './GuestPage';
import redux from './redux';

class LoginPage extends React.Component {
  state = {
    login: '',
    password: '',
  };

  componentDidMount() {
    window.addEventListener('storage', this.authListener);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.authListener);
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

  handleLogin = async () => {
    const responseLoginStatus = await Request({
      url: 'http://localhost:8080/api/users/login',
      method: 'POST',
      body: {
        name: this.state.login,
        password: this.state.password,
      },
    });

    if (responseLoginStatus) {
      localStorage.setItem('message', 'login');
    } else {
      alert('Данные неверные');
    }
  }

  handleRegister = () => {
    this.props.history.push('/registration');
  }

  render() {
    return (
      <Greeting
        login={this.state.login}
        handleChangeLogin={this.handleChangeLogin}
        handleChangePassword={this.handleChangePassword}
        handleLogin={this.handleLogin}
        handleRegister={this.handleRegister}
        useUser={this.props.useUser}
      />
    );
  }
}

function Greeting(props) {
  if (props.useUser) {
    return (
      null
    );
  }
  return (
    <GuestPage
      handleChangeLogin={props.handleChangeLogin}
      handleChangePassword={props.handleChangePassword}
      handleLogin={props.handleLogin}
      handleRegister={props.handleRegister}
    />
  );
}

export default withRouter(LoginPage);
