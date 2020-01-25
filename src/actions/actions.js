export const setUserTextActionObject = (data) => ({
  type: 'CHANGE_USER',
  payload: data,
});

export const getUserActionObject = (data) => ({
  type: 'USER_LOGIN',
  payload: data,
});

export const outUserActionObject = (data) => ({
  type: 'USER_LOGOUT',
  payload: data,
});
