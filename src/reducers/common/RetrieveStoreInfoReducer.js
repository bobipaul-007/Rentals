import { actionConstants } from "../../actions/ActionConstants";


export default function RetrieveStoreInfoReducer(
    state = {
        storeInfo: "",
       	ipAddress: "",
        storeValueFlag: "",
        storeInfoRecieved: false,
        isSystemErrorInStoreInfo: false,
        isSystemErrorInIP: false,
        isloginState: false,
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECEIVED_RETRIEVE_STORE_INFO:
        console.log("action_storeInf",action.response);
            return Object.assign({}, state, {
                storeInfo: action.response.storeInfoDetails,
                ipAddress: action.response.ipValue.ipAddress,
                storeValueFlag: true,
                storeInfoRecieved: true,
                isSystemErrorInStoreInfo: false,
                isloginState: true,
            });

        case actionConstants.SYSTEM_ERROR_STORE_INFO:
            return Object.assign({}, state, {
                isSystemErrorInStoreInfo: true
            });

        case actionConstants.RECIEVED_LOGOUT_USER:
            return Object.assign({}, state, {
                storeInfo: "",
                ipAddress: "",
                storeValueFlag: "",
                storeInfoRecieved: false,
                isSystemErrorInStoreInfo: false,
                isSystemErrorInIP: false,
                isloginState: false,
            });

        case actionConstants.RECIEVED_IP:
            return Object.assign({}, state, {
                IpAddd: action.parameters.ipAddress,
                isSystemErrorInIP: false,
            });

        case actionConstants.SYSTEM_ERROR_IP:
            return Object.assign({}, state, {
                isSystemErrorInIP: true
            });

        default:
            return state;
    }
}