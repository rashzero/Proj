import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import App from './App';
import theme from './theme';
import ProfileContainer from './ProfileContainer';

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
