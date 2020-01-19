import { createStore } from 'redux';

const initialState = {
  login: '',
  password: '',
  open: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOGIN':
      return { ...state, login: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload, open: true };
    case 'CHANGE_LOGOUT':
      return { ...state, login: action.payload, password: action.payload, open: false }
  }

  return state;
}
const store = createStore(reducer);

console.log(store.getState());

const changeLogin = {
  type: 'CHANGE_LOGIN',
  payload: 'User',
};

const changePassword = {
  type: 'CHANGE_PASSWORD',
  payload: '123',
};

const chengeLogout = {
  type: 'CHANGE_LOGOUT',
  payload: '',
};

store.dispatch(changeLogin);

console.log(store.getState());

store.dispatch(changePassword);

console.log(store.getState());

store.dispatch(chengeLogout);

console.log(store.getState());
