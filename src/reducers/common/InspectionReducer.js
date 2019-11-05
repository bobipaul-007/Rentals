import { actionConstants } from "../../actions/ActionConstants";

export default function InspectionReducer (
    state = {
        response: "",
        isSystemErrorInRetrieveQsns: false,
        isSystemErrorInGetAgreementNo: false,
        agreementNumber: ""
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECEIVED_INSPECTION_QUESTIONS:
            return Object.assign({}, state, {
                response: action.payload,
                isSystemErrorInRetrieveQsns: false
            });

            case actionConstants.SYSTEM_ERROR_RETRIEVE_QSNS:
            return Object.assign({}, state, {
                isSystemErrorInRetrieveQsns: true
            });

            case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                 response: "",
                 agreementNumber: "",
                 isSystemErrorInRetrieveQsns: false,
                 isSystemErrorInGetAgreementNo: false
            });

            case actionConstants.RECIEVED_RENTAL_AGREEMENT_NUMBER:
            return Object.assign({}, state, {
                agreementNumber: action.payload,
                isSystemErrorInGetAgreementNo: false
            });

            case actionConstants.SYSTEM_ERROR_GET_AGREEMENT_NO:
            return Object.assign({}, state, {
                isSystemErrorInGetAgreementNo: true
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                agreementNumber: "",
                isSystemErrorInRetrieveQsns: false,
                isSystemErrorInGetAgreementNo: false
            });

        case actionConstants.RECIEVED_RETURN_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                agreementNumber: "",
                isSystemErrorInRetrieveQsns: false,
                isSystemErrorInGetAgreementNo: false
            });

        default:
            return state;
    }
}
