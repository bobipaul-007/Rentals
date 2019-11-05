import { actionConstants } from "../../actions/ActionConstants";

export default function UpdateCustomerReducer(
    state = {
        response: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        tel1work: "",
        emailAddress: "",
        responseCode: "",
        message: "",
        isEdit: "",
        custInfoRecieved: false,
        isSystemError: false,
        isRequestFailed: false,
        isloginState: false,

    },
    action
) {
    switch (action.type) {
        case actionConstants.UPDATED_CUST_INFO:
            console.log("chck", action.updateCustomer);
            console.log("chck1", action);
            return Object.assign({}, state, {
                response: action.updateCustomer,
                firstName: action.updateCustomer.details.parameters.firstName,
                lastName: action.updateCustomer.details.parameters.lastName,
                address1: action.updateCustomer.details.parameters.address1,
                address2: action.updateCustomer.details.parameters.address2,
                city: action.updateCustomer.details.parameters.city,
                state: action.updateCustomer.details.parameters.state,
                postalCode: action.updateCustomer.details.parameters.postalCode,
                tel1work: action.updateCustomer.details.parameters.tel1work,
                emailAddress: action.updateCustomer.details.parameters.emailId,
                responseCode: action.updateCustomer.status.responseCode,
                message: action.updateCustomer.status.message,
                isEdit: action.updateCustomer.details.parameters.isEdit,
                custInfoRecieved: "",
                isSystemError: false,
                isRequestFailed: false,
                isloginState: true,
            });
        case actionConstants.SYSTEM_ERROR_UPDATE_CUSTOMER:
            return Object.assign({}, state, {
                isSystemError: true
            });
        case actionConstants.Request_Failed:
            return Object.assign({}, state, {
                isRequestFailed: true
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
                tel1work: "",
                emailAddress: "",
                responseCode: "",
                message: "",
                isEdit: "",
                custInfoRecieved: false,
                isSystemError: false,
                isRequestFailed: false,
                isloginState: false,

            });
        case actionConstants.FLAG_RESET:
            console.log("action_Flag", action);
            return Object.assign({}, state, {
                custInfoRecieved: true
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
                tel1work: "",
                emailAddress: "",
                responseCode: "",
                message: "",
                isEdit: "",
                custInfoRecieved: false,
                isSystemError: false,
                isRequestFailed: false,
                isloginState: false
            });

        default:
            return state;
    }
}