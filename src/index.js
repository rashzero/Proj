import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import theme from './theme';
import { rootReduser } from './reducers/reducer';


const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

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
