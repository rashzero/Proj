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

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOGIN':
    case 'CHANGE_LOGOUT':
      return {
        ...state,
        user: action.payload,
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        resetPasswordForm: action.payload,
      };
    case 'CHANGE_ERROR':
      return {
        ...state,
        resetForm: action.payload,
      };
    case 'CHANGE_NAME':
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };
    default:
      break;
  }

  return state;
}
const store = createStore(reducer);

console.log(store.getState());

const loginActio = () => ({
  type: 'CHANGE_LOGIN',
  payload: {
    name: 'User',
    age: '23',
    gender: 'man',
    id: '1',
  },
});

const logoutAction = () => ({
  type: 'CHANGE_LOGOUT',
  payload: {
    name: '',
    age: '',
    gender: '',
    id: '',
  },
});

const checkPasswordAction = () => ({
  type: 'CHANGE_PASSWORD',
  payload: {
    current: '123',
    new: '123456',
    newConfirm: '123456',
  },
});

const errorAction = () => ({
  type: 'CHANGE_ERROR',
  payload: {
    error: 'password not validation',
  },
});

const changeNameAction = () => ({
  type: 'CHANGE_NAME',
  payload: 'Avtor',
});

store.dispatch(loginActio());

console.log(store.getState());

store.dispatch(checkPasswordAction());

console.log(store.getState());

store.dispatch(errorAction());

store.dispatch(changeNameAction());

console.log(store.getState());

store.dispatch(logoutAction());

console.log(store.getState());
