import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import App from './App';
import theme from './theme';
import ProfileContainer from './ProfileContainer';

console.log(ProfileContainer);

const initialState = {
  user: {
    name: '',
    password: '',
    id: '',
    age: '',
    gender: '',
    email: '',
    web: '',
    secret: '',
  },
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
