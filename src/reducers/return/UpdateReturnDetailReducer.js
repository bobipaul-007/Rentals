import { actionConstants } from "../../actions/ActionConstants";

export default function UpdateReturnDetailReducer(
    state = {
        response: "",
        isSystemError: false
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_UPDATE_RETURN_DETAIL:
            return Object.assign({}, state, {
                response: action.updateReturnDetails,
                isSystemError: false                
            });
        case actionConstants.SYSTEM_ERROR_UPDATE_RETURN_DETAILS:
            return Object.assign({}, state, {
                isSystemError: true
            });
        
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                response: "",
                isSystemError: false
            });

        case actionConstants.RECIEVED_RETURN_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                isSystemError: false
            });

        default:
            return state;
    }
}