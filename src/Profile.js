/* eslint-disable react/state-in-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AvatarUpload from './AvatarUpload';
import ProfileInfo from './ProfileInfo';
import CircularIndeterminate from './CircularIndeterminate';
import Request from './Request';

class Profile extends React.Component {
  state = {
    user: {
      name: '',
      id: '',
      age: '',
      gender: '',
    },
    resetPasswordForm: {
      current: '',
      new: '',
      newConfirm: '',
    },
    resetForm: {
      error: { },
    },
    isLoading: true,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({
      isLoading: true,
    });

    const responseUser = await Request({
      url: 'http://localhost:8080/api/users',
    });
    if (responseUser.name) {
      this.setState({
        user: {
          name: responseUser.name,
          id: responseUser.id,
          age: responseUser.age,
        },
        isLoading: false,
      });
    }
  }

  handleChangeGender = (event) => {
    const newState = { ...this.state };
    newState.user.gender = event.target.value;
    this.setState(newState);
  };

  handleChangePassword = (event, id) => {
    const newState = { ...this.state };
    newState.resetPasswordForm[id] = event.target.value;
    this.setState(newState);
  }

  handleChangeData = (event, renderName) => {
    const newState = { ...this.state };
    newState.user[renderName] = event.target.value;
    this.setState(newState);
  };

  handleLoginSave = async () => {
    await Request({
      url: 'http://localhost:8080/api/users',
      method: 'PUT',
      body: { user: this.state.user },
    });
    this.props.history.push('/');
  }

  getResetPasswordError = (passwordData) => {
    const errorObj = {};
    switch (passwordData) {
      case 'password not validation':
        errorObj.current = 'Current password is wrong';
        break;
      case 'the passwords match':
        errorObj.new = 'the new password matches the current one';
        break;
      case "the new password doesn't match":
        errorObj.newConfirm = 'the new password does not match';
        break;
      default:
        break;
    }
    return errorObj;
  }

  handlePasswordSave = async () => {
    const responseUser = await Request({
      url: 'http://localhost:8080/api/users/password-edit',
      method: 'PUT',
      body: { resetPasswordForm: this.state.resetPasswordForm },
    });
    const errorObj = this.getResetPasswordError(responseUser.error);
    this.setState({
      resetForm: {
        error: errorObj,
      },
    });
  }

  render() {
    if (this.state.isLoading) {
      return <CircularIndeterminate />;
    }

    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Paper className={this.props.classes.paper}>
              <Box margin={3}>
                <Typography>
                  <center><p><h2>Данные профиля:</h2></p></center>
                </Typography>
              </Box>
              <Grid container xs={12} direction="row">
                <Grid item xs={4}>
                  <AvatarUpload />
                </Grid>
                <Grid item xs={8} direction="row">
                  <ProfileInfo
                    getUser={this.getUser}
                    handleLoginSave={this.handleLoginSave}
                    handlePasswordSave={this.handlePasswordSave}
                    handleChangeGender={this.handleChangeGender}
                    handleChangeData={this.handleChangeData}
                    stateUser={this.state.user}
                    resetForm={this.state.resetForm}
                    handleChangePassword={this.handleChangePassword}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const useStylesForm = withStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 20,
    maxWidth: 'auto',
    height: 'auto',
    width: 700,
  },
  img: {
    border: 'auto',
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  typographyPopup: {
    padding: theme.spacing(2),
  },
}))(Profile);

export default useStylesForm;
