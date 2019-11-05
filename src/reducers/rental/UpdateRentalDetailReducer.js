import { actionConstants } from "../../actions/ActionConstants";

export default function UpdateRentalDetailReducer(
    state = {
        response: "",
        isSystemError: false
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_UPDATE_RENTAL_DETAIL:
            return Object.assign({}, state, {
                response: action.updateRentalDetails,
                isSystemError: false                
            });
        case actionConstants.SYSTEM_ERROR_UPDATE_RENT_DETAILS:
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
                isSystemError: false
            });
            
        default:
            return state;
    }
}