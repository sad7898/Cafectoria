const initialState = {
    user: {},
    isLogged:false
}
export const authReducer = (state=initialState,action) => {
    switch(action){
        case "SET_CURRENT_USER":
            return {
                user: action.user,
                isLogged: true
            }
        case "LOG_OUT":
            return initialState
        default:
            return initialState
    }
}
