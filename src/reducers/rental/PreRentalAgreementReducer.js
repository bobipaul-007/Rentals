import { actionConstants } from "../../actions/ActionConstants";
export default function PreRentalAgreementReducer(
    state = {
        images: "",
        comments: "",
        tMInitials: "",
        custInitials: "",
        isSystemError: false,
        response: "",
        deleteImageRes:""
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_PRE_RENTAL_INFO:
          
            return Object.assign({}, state, {
                images: action.parameters.parameters.images,
                comments: action.parameters.parameters.comments,
                tMInitials: action.parameters.parameters.tMInitials,
                custInitials: action.parameters.parameters.custInitials,
                isSystemError: false
            });
        case actionConstants.SAVED_PRE_RENTAL_INFO_IMAGES:
            return Object.assign({}, state, {
                response: action.areImagesSaved,
                
                isSystemError: false
            });

        case actionConstants.RECEIVED_RETRIEVE_DELETE_IMAGE:
            return Object.assign({}, state, {
                deleteImageRes: action.payload,
                isSystemError: false
            });
        case actionConstants.SYSTEM_ERROR:
            return Object.assign({}, state, {
                isSystemError: true
            });
        case actionConstants.SYSTEM_ERROR_SAVEIMAGE:
            return Object.assign({}, state, {
                isSystemError: true
            });
        case actionConstants.RECIEVED_LOGIN_USER:
            return Object.assign({}, state, {
                images: "",
                comments: "",
                tMInitials: "",
                custInitials: "",
                isSystemError: false,
                response: ""
            });

        case actionConstants.RECIEVED_RENT_DATA_CLEAR:
            return Object.assign({}, state, {
                images: "",
                comments: "",
                tMInitials: "",
                custInitials: "",
                isSystemError: false,
                response: ""
            });
            
        default:
            return state;
    }
}