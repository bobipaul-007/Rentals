import { actionConstants } from "../../actions/ActionConstants";


export default function CustomerDLInfoReducer(
    state = {
        newCustRecieved: false,
        isNetworkError: false,
        isRequestFailed: false,
        isloginState: false,
        driverLicenceParameters: "",
        DriverLicenseNumber: '',
        DriverLicenseState: '',
        DriverLicenseExpiration: '',
        InsuranceCompanyName: '',
        insurancePolicyNumber: '',
        imageArray: '',
        DOB: '',
        response: "",
        isSystemError: false,

    },
    action
) {

    switch (action.type) {
        case actionConstants.RECIEVED_DL_CUSTOMER:

            return Object.assign({}, state, {
                newCustRecieved: true,
                isNetworkError: false,
                isRequestFailed: false,
                driverLicenceParameters: action,
                imageArray: action.insurance_details.details.parameters.imageArray,
                DriverLicenseNumber: action.insurance_details.details.parameters.DriverLicenseNumber,
                DriverLicenseState: action.insurance_details.details.parameters.DriverLicenseState,
                DriverLicenseExpiration: action.insurance_details.details.parameters.DriverLicenseExpiration,
                InsuranceCompanyName: action.insurance_details.details.parameters.InsuranceCompanyName,
                insurancePolicyNumber: action.insurance_details.details.parameters.insurancePolicyNumber,
                DOB: action.insurance_details.details.parameters.DOB,
                isloginState: true,
            });
        case actionConstants.SAVED_CUST_INSURANCE_IMAGES:
            return Object.assign({}, state, {
                response: action.areImagesSaved,
                isSystemError: false
            });
        case actionConstants.RECEIVED_RETRIEVE_DELETE_IMAGE:
            return Object.assign({}, state, {
                deleteImageRes: action.payload,
                isSystemError: false
            });

        case actionConstants.NETWORK_ERROR_DLSCREEN:
            return Object.assign({}, state, {
                isNetworkError: true
            });
        case actionConstants.Request_Failed:
            return Object.assign({}, state, {
                isRequestFailed: true
            });
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                driverLicenceParameters: "",
                DriverLicenseNumber: '',
                DriverLicenseState: '',
                DriverLicenseExpiration: '',
                InsuranceCompanyName: '',
                insurancePolicyNumber: '',
                DOB: '',
                newCustRecieved: false,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: false,
            });
        case actionConstants.EMPTY_IMAGE_REDUCER:
            return Object.assign({}, state, {
                deleteImageRes: "",

            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                driverLicenceParameters: "",
                DriverLicenseNumber: '',
                DriverLicenseState: '',
                DriverLicenseExpiration: '',
                InsuranceCompanyName: '',
                insurancePolicyNumber: '',
                DOB: '',
                deleteImageRes: "",
                newCustRecieved: false,
                isNetworkError: false,
                isRequestFailed: false,
                isloginState: false,
            });
            
        default:
            return state;
    }
}
