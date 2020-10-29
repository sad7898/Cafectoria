const initialState = {
    user: {},
    isLogged:false
}
export const authReducer = (state=initialState,action) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            return {
                user: action.data,
                isLogged: true
            }
        case "LOG_OUT":
            return initialState
        default:
            return initialState
    }
}
