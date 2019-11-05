import { actionConstants } from "../../actions/ActionConstants";


export default function FillingRentalInfoReducer(
    state = {
        response: "",
        isSystemError: false,
        rentDurationResponse: "",
        storeTiming: ""
    },
    action
) {

    switch (action.type) {
        case actionConstants.RECEIVED_FILLING_RENTAL_INFO:
        console.log("action_filling",action);
            return Object.assign({}, state, {
                response: action.rentalInfo.parameters,
                isSystemError: false
            });

        case actionConstants.SYSTEM_ERROR_FILLINGRENTAL:
            return Object.assign({}, state, {
                isSystemError: true
            });
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                response: "",
                rentDurationResponse: "",
                storeTiming: "",
                isSystemError: false
            });

        case actionConstants.RECEIVED_RETRIEVE_RENT_DURATION:
            return Object.assign({}, state, {
                rentDurationResponse: action.payload
            });


        case actionConstants.RECEIVED_RETRIEVE_STORE_TIMING:
         console.log("action_storeTiming",action);
            return Object.assign({}, state, {
                storeTiming: action.storeTiming
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                rentDurationResponse: "",
                storeTiming: "",
                isSystemError: false
            });
            
        default:
            return state;
    }
}
