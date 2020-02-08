/* eslint-disable import/prefer-default-export */

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
    imagePreviewUrl: '',
    raitingMove: [],
    favorits: [],
  },
  tracks: [],
  series: [],
  news: [],
  cache: {},
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
    case 'GET_TRACKS':
      return {
        ...state,
        tracks: action.payload,
      };
    case 'GET_SERIES':
      return {
        ...state,
        series: action.payload,
      };
    case 'GET_NEWS':
      return {
        ...state,
        news: action.payload,
      };
    case 'GET_NEWS_IN_CACHE':
      return {
        ...state,
        news: action.payload.news,
        cache: action.payload.cache,
        numberOfPage: action.payload.number,
      };
    case 'RAITING_MOVE':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_FAIVORITS':
      return {
        ...state,
        user: { ...state.user, favorits: action.payload },
      };
    default:
      break;
  }

  return state;
};
