import { GET_TASK_LIST, GET_ONE_TASK, ADD_TASK, UPDATE_TASK, DELETE_TASK } from 'actions/taskList';


const initState = {
    taskList: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_TASK_LIST:
            return {
                ...state,
                taskList: action.payload
            };
        case GET_ONE_TASK:
            return {
                ...state,
                taskList: action.payload,
            };
        default:
            return state;
    }
}