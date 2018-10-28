import axios from 'axios';

const url = "/api/";

export function loadNotes () {
    return (dispatch) => {
        axios.get(`${url}notes`)
        .then((res) => {
            let notes = res.data;
            dispatch({type:'LOAD_NOTES', notes})
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function getNote (note_id) {
    return (dispatch) => {
        axios.get(`${url}notes/${note_id}`)
        .then((res) => {
            let note = res.data
            dispatch({type: 'VIEW_NOTE', note})
        }).catch((err) => console.log(err))
    }
}

export function completedNote (note_id,status) {
    return (dispatch) => {
        axios.put(`${url}notes/${note_id}`, {
            completed: !status
        })
        .then((res) => {
            let note = res.data;
            dispatch({type: 'COMPLETED_NOTE', note})
        }).catch((err) => console.log(err))
    }
}

export function changeColorNote (note_id,color) {
    return (dispatch) => {
        axios.put(`${url}notes/${note_id}`, {
            color: color
        })
        .then((res) => {
            let note = res.data;
            dispatch({type: 'CHANGE_COLOR_NOTE', note})
        }).catch((err) => console.log(err))
    }
}

export function addNote (item) {
    return (dispatch) => {
        axios.post(`${url}notes/`, item)
        .then((res) => {
            let note = res.data;
            dispatch({type: 'ADD_NOTE', note})
        }).catch((err) => console.log(err))
    }
}

export function updateNote (item) {
    return (dispatch) => {
        axios.put(`${url}notes/${item._id}`, item)
        .then((res) => {
            let note = res.data;
            dispatch({type: 'UPDATE_NOTE', note})
        }).catch((err) => console.log(err))
    }
}

export function removeNote (note) {
    return (dispatch) => {
        axios.delete(`${url}notes/${note._id}`)
        .then(() => {
            dispatch({type: 'REMOVE_NOTE', note})
        }).catch((err) => console.log(err))
    }
}