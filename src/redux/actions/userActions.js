import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types';
import axios from 'axios';

// Helper to store token in localStorage and set default headers
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
// SIGNUP USER
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      console.log("🔥 SIGNUP ERROR:");
      console.log("Full error:", err);
      console.log("Response data:", err?.response?.data);
      console.log("Response status:", err?.response?.status);
      console.log("Message:", err?.message);
      
      dispatch({
        type: SET_ERRORS,
        payload: err.response?.data || { general: 'Signup failed. Please try again.' }
      });
    });
};
// LOGIN USER
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response?.data || { general: 'Login failed. Please try again.' }
      });
    });
};
// GET USER DATA
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.error(err));
};
// LOGOUT USER
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};
// UPLOAD PROFILE IMAGE
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
    for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);  // ⬅️ this prints "image: File { ... }"
  }
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};
// EDIT USER DETAILS
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};
// MARK NOTIFICATIONS AS READ
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios.post('/notifications', notificationIds)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};
