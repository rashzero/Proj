import { createStore } from 'redux';

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

function reducer(state = initialState.user, action) {
  switch (action.type) {
    case 'CHANGE_LOGIN':
      return {
        ...state,
        name: action.payload1,
        age: action.payload2,
        gender: action.payload3,
        id: action.payload4,
      };
    case 'CHANGE_LOGOUT':
      return {
        ...state,
        name: action.payload,
        age: action.payload,
        gender: action.payload,
        id: action.payload,
      };
    default:
      break;
  }

  return state;
}
const store = createStore(reducer);

console.log(store.getState());

const changeLogin = {
  type: 'CHANGE_LOGIN',
  payload1: 'User',
  payload2: '23',
  payload3: 'man',
  payload4: '1',
};

const chengeLogout = {
  type: 'CHANGE_LOGOUT',
  payload: '',
};

store.dispatch(changeLogin);

console.log(store.getState());

store.dispatch(chengeLogout);

console.log(store.getState());
