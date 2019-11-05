import { actionConstants } from "../../actions/ActionConstants";


export default function ExtendItemRentalReducer(
    state = {
        extendRentalData: "",
        extendRentalDataRecieved: false,
        isSystemError: false,
        isloginState: false,
        returnTime: ""

    },
    action
) {
    switch (action.type) {
        case actionConstants.RECEIVED_EXTEND_ITEM_RENTAL:
            console.log("actionExtendRental11>>", action);
            return Object.assign({}, state, {
                extendRentalData: action.rental.status,
                extendRentalDataRecieved: true,
                isSystemError: false,

            });
        case actionConstants.SYSTEM_ERROR_EXTENDITEM:
            return Object.assign({}, state, {
                isSystemError: true
            });
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                extendRentalData: "",
                extendRentalDataRecieved: false,
                isSystemError: false,

            });


        case actionConstants.RECIEVED_EXTEND_DATA_CLEAR:
           console.log("actionExtend>>", action.rental);
            return Object.assign({}, state, {
                extendRentalData: "",
                isSystemError: false,
            });

        default:
            return state;
    }
}