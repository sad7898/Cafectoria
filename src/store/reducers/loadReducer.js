export const loadReducer = (state,action) => {
    switch(action.type){
        case 'IS_LOADING':
            return action.value
        default:
            return false
    }
}