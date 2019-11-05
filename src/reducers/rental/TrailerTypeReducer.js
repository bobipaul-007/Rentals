import { actionConstants } from "../../actions/ActionConstants";


export default function TrailerTypeReducer(
    state = {
        trailerTypeData: "",
        trailerTypeDataRecieved: false,
        isNetworkError: false,
        isRequestFailed: false,
        isloginState: false,
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_TRAILER_TYPE_DETAIL:
            console.log("actiontrailerType1>>", JSON.stringify(action.trailerTypeDetails.itemTypes));
            return Object.assign({}, state, {
                trailerTypeData: action.trailerTypeDetails,
                trailerTypeDataRecieved: true,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: true,
            });
        case actionConstants.SYSTEM_ERROR:
            return Object.assign({}, state, {
                isNetworkError: true
            });
        case actionConstants.Request_Failed:
            return Object.assign({}, state, {
                isRequestFailed: true
            });
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                trailerTypeData: "",
                trailerTypeDataRecieved: false,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: false,
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                trailerTypeData: "",
                trailerTypeDataRecieved: false,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: false,
            });

        default:
            return state;
    }
}