import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"

export const addSecond = () => {
    return dispatch => {
        dispatch({
            type: "ADD_SECOND"
        });
    }
}
export const clearCount = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_COUNT"
        });
    }
}

export const handleStop = () => {
    return dispatch => {
        dispatch({
            type: "HANDLE_STOP"
        });
    }
}

export const handleReset = () => {
    return dispatch => {
        dispatch({
            type: "HANDLE_RESET"
        });
    }
}

export const handleCheckpoint = () => {
    return dispatch => {
        dispatch({
            type: "HANDLE_CHECKPOINT"
        });
    }
}

export const handleFinish = () => {
    return dispatch => {
        dispatch({
            type: "HANDLE_FINISH"
        });
    }
}

export const clearChores = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_CHORES"
        });
    }
}
export const submitChore = (chore) => {
    return dispatch => {
        dispatch({
            type: "SUBMIT_CHORE",
            chore
        })
    }
}

const initialState = {
    seconds: 0,
    toggleStart: true,
    chore: "",
    choreList: [],
    checkpoints: [],
    checkpointCounter: 0,
    finished: false,
    finishTime: 0
}

export const reducer = (prevState = initialState, action) => {
    switch(action.type) {
        case "ADD_SECOND":
            return {
                ...prevState,
                seconds: prevState.seconds + 1,
                toggleStart: false
            }
        case "HANDLE_STOP":
            return {
                ...prevState,
                toggleStart: true
            }
        case "CLEAR_COUNT":
            return {
                ...prevState,
                seconds: 0,
                toggleStart: true
            }
        case "HANDLE_RESET":
            return {
                ...prevState,
                toggleStart: true,
                seconds: 0,
                chore: "",
                choreList: [],
                checkpoints: []
            }
        case "HANDLE_CHECKPOINT":
            return {
                ...prevState,
                checkpoints: prevState.checkpoints.concat(prevState.seconds),
                checkpointCounter: prevState.checkpointCounter + 1
            }
        case "HANDLE_FINISH":
            return {
                ...prevState,
                toggleStart: true,
                finishTime: prevState.seconds,
                finished: true,
                checkpointCounter: 0
            }
        case "CLEAR_CHORES":
            return {
                ...prevState,
                chore: "",
                choreList: []
            }
        case "SUBMIT_CHORE":
            return {
                ...prevState,
                choreList: prevState.choreList.concat(action.chore),
            }

        default:
        return prevState;
    }
}


export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
