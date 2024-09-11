import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const getAllTodos = () => axios.get(`${BASE_REST_API_URL}/all`);

export const saveTodo = (todo) => axios.post(`${BASE_REST_API_URL}/save`, todo);

export const getTodo = (id) => axios.get(`${BASE_REST_API_URL}/get/${id}`);

export const updateTodo = (id,todo) => axios.put(`${BASE_REST_API_URL}/update/${id}`, todo);

export const deleteTodo = (id) => axios.delete(`${BASE_REST_API_URL}/delete/${id}`);

export const completeTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/completed`);

export const incompleteTodo = (id) => axios.patch(`${BASE_REST_API_URL}/${id}/incompleted`);
