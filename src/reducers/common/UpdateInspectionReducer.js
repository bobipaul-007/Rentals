import { actionConstants } from "../../actions/ActionConstants";

export default function UpdateInspectionReducer (
    state = {
        response: "",
        isSystemError: false
    },
    action
) {
    switch (action.type) {
        case actionConstants.UPDATED_INSPECTION_QUESTIONS:
        console.log("Action has: ",action);
            return Object.assign({}, state, {
                response: action.payload,
                isSystemError: false                
            });

        case actionConstants.SYSTEM_ERROR_UPDATE_QSNS:
            return Object.assign({}, state, {
                isSystemError: true
            })

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

        case actionConstants.RECIEVED_RETURN_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                isSystemError: false
            });    

        default:
            return state;
    }
}
