import { actionConstants } from "../../actions/ActionConstants";

export default function MainMenuReducer(
    state = {
        storeNo: "",
        storeType: "",
        storeName: "",
        status: "",
        rentals: [],
        retrieveStatus:"",
        isNetworkError: false,
        islogoutState: true
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_STORE_ID:
            return Object.assign({}, state, {
                storeNo: action.devices.response.storeNo,
                storeType: action.devices.response.storeType,
                storeName: action.devices.response.storeName,
                status: action.devices.response.status,
                isNetworkError: false
            });
        case actionConstants.NETWORK_ERROR:
            return Object.assign({}, state, {
                isNetworkError: true
            });

        case actionConstants.UPDATED_STORE_ID:
            return Object.assign({}, state, {
                storeNo: actifon.devices.parameters.response.storeNo,
                storeType: actifon.devices.parameters.response.storeType,
                storeName: action.devices.parameters.response.storeName,
                status: action.devices.parameters.response.status,
                isNetworkError: false
            });
        case actionConstants.RECIEVED_LOGOUT_USER:
            return Object.assign({}, state, {
                storeNo: "",
                storeType: "",
                storeName: "",
                status: "",
                isNetworkError: false,
                islogoutState: true
            });
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                storeNo: "",
                storeType: "",
                storeName: "",
                status: "",
                isNetworkError: false,
                islogoutState: false
            });

        case actionConstants.RECIEVED_CURRENT_RENTALS:
        console.log("action_main",action.rentals.response)
            return Object.assign({}, state, {
                storeNo: state.storeNo,
                storeType: state.storeType,
                storeName: state.storeName,
                status: state.status,
                rentals: action.rentals.response,
                retrieveStatus:"",
                isNetworkError: false,
                islogoutState: false
            });


        default:
            return state;
    }
}
