
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
export const rootReduser = (state = initialState, action) => {
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
