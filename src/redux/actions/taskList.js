import axios from 'axios';
import { message } from 'antd';

export const GET_TASK_LIST = "taskList/GET_TASK_LIST";
export const GET_ONE_TASK = "taskList/GET_ONE_TASK";
export const ADD_TASK = "taskList/ADD_TASK";
export const UPDATE_TASK = "taskList/UPDATE_TASK";
export const DELETE_TASK = "taskList/DELETE_TASK";

export function getTaskList() {
    return dispatch => {
        axios.get('/api/tasklist')
            .then((res) => {
                let data = res.data;
                dispatch({
                    type: GET_TASK_LIST,
                    payload: data
                });
            })
            .catch(function (error) {
                message.error(error);
            });
    }
}
export function getOneTask(params) {
    return dispatch => {
        axios.get('/api/tasklist/getOneTask', { params })
            .then(function (response) {
                console.log(response);
                let data = response.data;
                dispatch({
                    type: GET_ONE_TASK,
                    payload: data
                });
            })
            .catch(function (error) {
                message.error(error);
            });
    }
}
export function addTask(params, fn) {
    return dispatch => {
        axios.post('/api/tasklist/addTask', params)
            .then((res) => {
                let data = res.data;
                dispatch({
                    type: ADD_TASK,
                    payload: data
                });
                if (fn) { fn(data); }
            })
            .catch(function (error) {
                message.error(error);
            });
    }
}
export function updateTask(params, fn) {
    return dispatch => {
        axios.put('/api/tasklist/updateTask', params)
            .then((res) => {
                let data = res.data;
                dispatch({
                    type: UPDATE_TASK,
                    payload: data
                });
                if (fn) { fn(data); }
            })
            .catch(function (error) {
                message.error(error);
            });
    }
}
export function deleteTask(params, fn) {
    return dispatch => {
        axios.delete('/api/tasklist/deleteTask', { data: params })
            .then((res) => {
                let data = res.data;
                dispatch({
                    type: DELETE_TASK,
                    payload: data
                });
                if (fn) { fn(data); }
            })
            .catch(function (error) {
                message.error(error);
            });
    }
}