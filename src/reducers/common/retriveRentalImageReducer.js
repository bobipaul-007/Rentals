import { actionConstants } from "../../actions/ActionConstants";




export default function retriveRentalImageReducer(
    state = {
        response: "",
        isNetworkError: false,
        isRequestFailed: false,
     

    },
    action
) {
    switch (action.type) {
        case actionConstants.RECEIVED_RETRIVE_RENTAL_IMAGES:
         console.log("RECEIVED_RETRIVE_RENTAL_IMAGES>>>",JSON.stringify(action));

            return Object.assign({}, state, {
                response: action.retriveRentalImages,
                isNetworkError: false,
                isRequestFailed: false,
                
            });
        case actionConstants.NETWORK_ERROR:
            return Object.assign({}, state, {
                isNetworkError: true
            });
        case actionConstants.Request_Failed:
            return Object.assign({}, state, {
                isRequestFailed: true
            });

       
        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                isNetworkError: false,
                isRequestFailed: false
            });
            
        case actionConstants.RECIEVED_RETURN_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                isNetworkError: false,
                isRequestFailed: false
            });

        default:
            return state;
    }
}