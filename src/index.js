import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import App from './App';
import theme from './theme';
import ProfileContainer from './ProfileContainer';

<<<<<<< HEAD
console.log(ProfileContainer);

const initialState = {
  user: {
    name: '',
    password: '',
    // id: '',
    age: '',
    gender: '',
    email: '',
    web: '',
  },
  /* resetPasswordForm: {
    current: '',
    new: '',
    newConfirm: '',
  },
  resetForm: {
    error: { },
  },
  isLoading: true, */
};

const rootReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
    case 'USER_LOGIN':
    case 'USER_LOGOUT':
      console.log(state);
      return {
        ...state,
        user: action.payload,
      };
    /* case 'PASSWORD_CHANGE_ERROR':
      return {
        ...state,
        resetForm: { ...state.user, error: action.payload },
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        resetPasswordForm: action.payload,
      }; */
=======
const initialState = {
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

const loginActio = (newName) => ({
  type: 'ACTION_CHANGE_LOGIN',
  payload: {
    name: newName,
    age: '23',
    gender: 'man',
    id: '1',
  },
});

const checkPasswordAction = () => ({
  type: 'ACTION_CHANGE_PASSWORD',
  payload: {
    current: '123',
    new: '123456',
    newConfirm: '123456',
  },
});

const rootReduser = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };
    case 'CHANGE_USER':
      return action.payload;
>>>>>>> 0ea5f1a3fa8b371b0dc3a973931c2dc2cbcc4576
    default:
      break;
  }

  return state;
};

const store = createStore(rootReduser);

console.log(store.getState());

class MainComponent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App 
            store={this.props}
            />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const WrappedMainComponent = connect(mapStateToProps)(MainComponent);

ReactDOM.render(<Provider store={store}>
  <WrappedMainComponent />
</Provider>, document.getElementById('root'));
