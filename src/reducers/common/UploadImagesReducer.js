import { actionConstants } from "../../actions/ActionConstants";
export default function UploadImagesReducer(
    state = {
        response: "",
        isSystemError: false,
        isRequestFailed: false,
        comments: '',
        tMInitials: '',
        custInitials: ''

    },
    action
) {
    switch (action.type) {
        case actionConstants.RECEIVED_UPLOAD_IMAGES:
            return Object.assign({}, state, {
                response: action.uploadImages,
                isSystemError: false,
                isRequestFailed: false,

            });
        case actionConstants.SYSTEM_ERROR_UPLOAD_IMAGE:
            return Object.assign({}, state, {
                isSystemError: true
            });

        case actionConstants.RECEIVED_RETRIEVE_DELETE_IMAGE:
            return Object.assign({}, state, {
                deleteImageRes: action.payload,
                isSystemError: false
            });
        case actionConstants.Request_Failed:
            return Object.assign({}, state, {
                isRequestFailed: true
            });
        case actionConstants.SYSTEM_ERROR_UPLOAD_DELETE_IMAGE:
            return Object.assign({}, state, {
                isSystemError: true
            });
        case actionConstants.RECIEVED_PRE_RETURN_INFO:
            return Object.assign({}, state, {

                comments: action.parameters.parameters.comments,
                tMInitials: action.parameters.parameters.tMInitials,
                custInitials: action.parameters.parameters.custInitials,
                isSystemError: false
            });
        case actionConstants.SYSTEM_ERROR_RETURN_INFO:
            return Object.assign({}, state, {
                isSystemError: true
            });

        case actionConstants.RECIEVED_RETURN_DATA_CLEAR:
            return Object.assign({}, state, {
                response: "",
                isSystemError: false,
                isRequestFailed: false,
                comments: '',
                tMInitials: '',
                custInitials: '',
                deleteImageRes: ''
            });

        default:
            return state;
    }
}