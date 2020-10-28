export const navReducer = (state,action) => {
    switch(action){
        case 'CAN_NAV_BACK':
            return {
                able : action.bool
            }
        default:
            return false
    }
}