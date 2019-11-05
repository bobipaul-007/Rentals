import { actionConstants } from "../../actions/ActionConstants";

export default function CancelRentReturnReducer(
    state = {
        response: "",
        isSystemError: false
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_CANCEL_RENT_RETURN:
            return Object.assign({}, state, {
                response: action.cancelDetails,
                isSystemError: false                
            });
        case actionConstants.SYSTEM_ERROR_CANCEL_RENT_RETURN:
            return Object.assign({}, state, {
                isSystemError: true
            });
        
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                response: "",
                isSystemError: false
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                isSystemError: false,
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