const initialState = {
    notes: [],
    note: {}
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
            note: action.note
        }
        case 'CHANGE_COLOR_NOTE':
        return {
            ...state,
            note: action.note
        }
        case 'ADD_NOTE':
        return {
            ...state,
            note: action.note
        }
        case 'UPDATE_NOTE':
        return {
            ...state,
            note: action.note
        }
        case 'REMOVE_NOTE':
        return {
            ...state,
            note: action.note
        }
        default:
            return state
    }
}
