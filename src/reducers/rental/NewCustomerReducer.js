import { actionConstants } from "../../actions/ActionConstants";

export default function NewCustomerReducer(
    state = {
        response: "",
        newCustRecieved: false,
        isSystemError: false,
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        MobileNo: "",
        emailAddress: "",
        responseCode: "",
        isEdit: "",
        isloginState: false,

    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_NEW_CUSTOMER:
            console.log("actions_newCust>>>", action.new_customer);
            return Object.assign({}, state, {
                response: action,
                newCustRecieved: true,
                isSystemError: false,
                firstName: action.new_customer.details.parameters.firstName,
                lastName: action.new_customer.details.parameters.lastName,
                address1: action.new_customer.details.parameters.address1,
                address2: action.new_customer.details.parameters.address2,
                city: action.new_customer.details.parameters.city,
                state: action.new_customer.details.parameters.state,
                postalCode: action.new_customer.details.parameters.zipcode,
                MobileNo: action.new_customer.details.parameters.phoneNumber,
                emailAddress: action.new_customer.details.parameters.emailId,
                responseCode: action.new_customer.status.responseCode,
                isEdit: action.new_customer.details.parameters.isEdit,
                isloginState: true,

            });
        case actionConstants.SYSTEM_ERROR_NEW_CUSTOMER:
            return Object.assign({}, state, {
                isSystemError: true
            });

        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                response: "",
                firstName: "",
                lastName: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                postalCode: "",
                MobileNo: "",
                emailAddress: "",
                responseCode: "",
                isEdit: "",
                newCustRecieved: false,
                isSystemError: false,
                isloginState: false,

            });

        case actionConstants.EMPTY_REDUCER:
            return Object.assign({}, state, {
                response: "",
                firstName: "",
                lastName: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                postalCode: "",
                MobileNo: "",
                emailAddress: "",
                responseCode: "",
                isEdit: "",
                newCustRecieved: false,
                isSystemError: false,
                isloginState: false,

            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                firstName: "",
                lastName: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                postalCode: "",
                MobileNo: "",
                emailAddress: "",
                responseCode: "",
                isEdit: "",
                newCustRecieved: false,
                isSystemError: false,
                isloginState: false
            });
            
        default:
            return state;
    }
}