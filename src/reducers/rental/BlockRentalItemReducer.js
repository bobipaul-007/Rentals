import { actionConstants } from "../../actions/ActionConstants";

export default function BlockRentalItemReducer (
    state = {
        response: "",
        isSystemError: false
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECEIVED_BLOCK_RENTAL_ITEM:
          console.log("block_item>>",action.payload);
            return Object.assign({}, state, {
                response: action.payload,
                isSystemError: false
            });

        case actionConstants.SYSTEM_ERROR_BLOCK_ITEM:
            return Object.assign({}, state, {
                isSystemError: true
            });
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

        default:
            return state;
    }
}
