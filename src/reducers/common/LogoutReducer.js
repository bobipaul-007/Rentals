import { actionConstants } from "../../actions/ActionConstants";




export default function LogoutReducer(
    state = {
        userLogoutData: "",
        userLogoutRecieved: false,
        isNetworkError: false,
        isRequestFailed: false,
        isloginState: false,
        retcodeVal: "",


    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_LOGOUT_USER:
            console.log("action_Logout>>>", JSON.stringify(action.logout_details.response.retcode));

            return Object.assign({}, state, {
                userLogoutData: action.logout_details.response,
                userLogoutRecieved: true,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: true,
                retcodeVal: action.logout_details.response.retcode,
            });
        case actionConstants.SYSTEM_ERROR:
            return Object.assign({}, state, {
                isNetworkError: true
            });
        case actionConstants.Request_Failed:
            return Object.assign({}, state, {
                isRequestFailed: true
            });
        case actionConstants.RECIEVED_LOGOUT_USER:
            return Object.assign({}, state, {
                userLogoutData: "",
                userLogoutRecieved: false,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: false,
                retcodeVal: "",
            });

        default:
            return state;
    }
}