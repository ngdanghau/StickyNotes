const initialState = {
    notes: [],
    note: {},
    type: ""
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_NOTES' :
        return {
            ...state,
            notes: action.notes
        }
        case 'VIEW_NOTE':
        return {
            ...state,
            note: action.note
        }
        case 'COMPLETED_NOTE':
        return {
            ...state,
            note: action.note,
            type: "COMPLETED_NOTE"
        }
        case 'CHANGE_COLOR_NOTE':
        return {
            ...state,
            note: action.note,
            type: "CHANGE_COLOR_NOTE"
        }
        case 'ADD_NOTE':
        return {
            ...state,
            note: action.note,
            type: "ADD_NOTE"
        }
        case 'UPDATE_NOTE':
        return {
            ...state,
            note: action.note,
            type: "UPDATE_NOTE"
        }
        case 'REMOVE_NOTE':
        return {
            ...state,
            note: action.note,
            type: "REMOVE_NOTE"
        }
        default:
            return state
    }
}