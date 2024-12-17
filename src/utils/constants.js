export const HOST = "http://localhost:5000";
export const API_URL = `${HOST}/api`;

export const USER_ROUTES = `${API_URL}/users`;
export const TASK_ROUTES = `${API_URL}/tasks`;

export const LOGIN_ROUTE = `${USER_ROUTES}/login`;
export const SIGNUP_ROUTE = `${USER_ROUTES}/register`;
export const LOGOUT_ROUTE = `${USER_ROUTES}/logout`;
export const UPDATE_PASSWORD_ROUTE = `${USER_ROUTES}/update-password`;
export const VERIFY_USER_ROUTE = `${USER_ROUTES}/verify-user`;
export const GET_OTP_ROUTE = `${USER_ROUTES}/get-otp/:email`;
export const FORGET_PASSWORD_ROUTE = `${USER_ROUTES}/forget-password`;

export const GET_TASKS_ROUTE = `${TASK_ROUTES}/`;
export const ADD_TASK_ROUTE = `${TASK_ROUTES}/create`;
export const UPDATE_TASK_ROUTE = `${TASK_ROUTES}/update`;
export const DELETE_TASK_ROUTE = `${TASK_ROUTES}/delete`;
