import { actionConstants } from "../../actions/ActionConstants";


export default function CustomerInfoReducer(
    state = {
        customerInfo: "",
        isSystemError: false,
    },
    action
) {

    switch (action.type) {
        case actionConstants.RECIEVED_CUSTOMER_INFO:
            console.log("customerInfo_action", action.customerInfo);
            return Object.assign({}, state, {
                customerInfo: action.customerInfo,
                isSystemError: false
            });

            case actionConstants.SYSTEM_ERROR_CUSTOMER_INFO:
            return Object.assign({}, state, {
                isSystemError: true
            });

        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                customerInfo: "",
                isSystemError: false
            });
            
        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                customerInfo: "",
                isSystemError: false
            });
            
        default:
            return state;
    }
}
