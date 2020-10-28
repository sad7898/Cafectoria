export const setCurrentUser = (user) => {
    return {
        type : "SET_CURRENT_USER",
        data : user
    }
}
export const LogOut = () => {
    return {
        type: "LOG_OUT"
    }
}