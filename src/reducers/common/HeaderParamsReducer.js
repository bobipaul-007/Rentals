import { actionConstants } from "../../actions/ActionConstants";


export default function HeaderParamsReducer(
    state = {
        headerParameters: "",
        appDetails: "",
        isSystemErrorInHeaderParams: false,
        isSystemErrorInAppDetails: false
    },
    action
) {

    switch (action.type) {
        case actionConstants.RECIEVED_HEADER_PARAMS:
        console.log("action_header",action)
            return Object.assign({}, state, {
                headerParameters: action.headerDetails,
                isSystemErrorInHeaderParams: false
            });

            case actionConstants.SYSTEM_ERROR_HEADER_PARAMS:
            return Object.assign({}, state, {
                isSystemErrorInHeaderParams: true
            });

            case actionConstants.RECIEVED_APP_DETAILS:
            return Object.assign({}, state, {
                appDetails: action.appDetails,
                isSystemErrorInAppDetails: false
            });

        case actionConstants.SYSTEM_ERROR_APP_DETAILS:
            return Object.assign({}, state, {
                isSystemErrorInAppDetails: true
            });

        case actionConstants.RECIEVED_LOGIN_USER:

            let obj = state.headerParameters;
            obj.userId = '';

            return Object.assign({}, state, {
                headerParameters: obj,
                appDetails: "",
                isSystemErrorInHeaderParams: false,
                isSystemErrorInAppDetails: false
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                appDetails: "",
                isSystemErrorInHeaderParams: false,
                isSystemErrorInAppDetails: false
            });

        case actionConstants.RECIEVED_RETURN_DATA_CLEAR:
            return Object.assign({}, state, {
                appDetails: "",
                isSystemErrorInHeaderParams: false,
                isSystemErrorInAppDetails: false
            });

        default:
            return state;
    }
}
