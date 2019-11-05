import { actionConstants } from "../../actions/ActionConstants";

export default function ItemStatusReducer(
    state = {
        itemStatusData: "",
        itemStatusDataRecieved: false,
        isSystemError: false,
        logoutState: '',
        inServiceItems :"",
        RentedItems :"",
        responseCode:""
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_ITEM_STATUS:
            console.log("action.itemstatus",action.item_status.inserviceItems)
            return Object.assign({}, state, {
                itemStatusData: action.item_status,
                itemStatusDataRecieved: true,
                isSystemError: false,
                isRequestFailed: false,
                inServiceItems :action.item_status.inserviceItems,
                RentedItems :action.item_status.rentedItems,
                responseCode:action.item_status.responseCode
            });
        case actionConstants.SYSTEM_ERROR_ITEMSTATUS:
            return Object.assign({}, state, {
                isSystemError: true
            });
        
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                itemStatusData: "",
                itemStatusDataRecieved: false,
                isSystemError: false,
                logoutState: '',
                inServiceItems :"",
                RentedItems :"",
                responseCode:""

            });

        default:
            return state;
    }
}