
export const setUserTextActionObject = (data) => ({
  type: 'CHANGE_USER',
  payload: data,
});

export const getUserActionObject = (data) => async (dispatch) => {
  dispatch({
    type: 'USER_LOGIN',
    payload: data,
  });
};

export const geSeriesActionObject = (data) => async (dispatch) => {
  dispatch({
    type: 'GET_SERIES',
    payload: data,
  });
};

export const geNewsActionObject = (data) => async (dispatch) => {
  dispatch({
    type: 'GET_NEWS',
    payload: data,
  });
};

export const geNewsActionObjectInCache = (news, cache, number) => async (dispatch) => {
  dispatch({
    type: 'GET_NEWS_IN_CACHE',
    payload: {
      news,
      cache,
      number,
    },
  });
};

export const getMoviRaitingActionObject = (data) => ({
  type: 'RAITING_MOVE',
  payload: data,
});

export const geFaivoritsActionObject = (data) => ({
  type: 'GET_FAIVORITS',
  payload: data,
});

export const outUserActionObject = (data) => ({
  type: 'USER_LOGOUT',
  payload: data,
});

const nockApiData = ['123', '456', '789', '987', '654'];

export const getTracksActionObject = () => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: 'GET_TRACKS', payload: nockApiData });
  }, 2000);
};
