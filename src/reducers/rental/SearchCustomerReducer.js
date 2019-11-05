import { actionConstants } from "../../actions/ActionConstants";

export default function SearchCustomerReducer(
    state = {
        searchCustData: "",
        searchCustDataRecieved: false,
        isSystemError: false,
        isloginState: false,
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_SEARCH_CUSTOMER:
            console.log("actions>>>", action.searchCustomerDetails);
            return Object.assign({}, state, {
                searchCustData: action.searchCustomerDetails,
                searchCustDataRecieved: true,
                isSystemError: false,
                isloginState: true,
                
            });
        case actionConstants.SYSTEM_ERROR_SEARCH_CUST:
            return Object.assign({}, state, {
                isSystemError: true
            });

        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                searchCustData: "",
                searchCustDataRecieved: false,
                isSystemError: false,
                isloginState: false,
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                searchCustData: "",
                searchCustDataRecieved: false,
                isSystemError: false,
                isloginState: false
            });
            

        default:
            return state;
    }
}