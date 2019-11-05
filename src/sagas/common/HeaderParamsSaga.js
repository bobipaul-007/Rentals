import { actionConstants } from "../../actions/ActionConstants";
import { put, takeLatest } from "redux-saga/effects";

function* requestHeaderParams(action) {
    try {
        const headerDetails = action.params;
        yield put({
            type: actionConstants.RECIEVED_HEADER_PARAMS,
            headerDetails
        });
    }
    catch (e) {
        console.log("Error in saga in requestHeaderParams: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR_HEADER_PARAMS
        });
    }
}

export function* checkHeaderParams() {
    yield takeLatest(actionConstants.REQUEST_HEADER_PARAMS, requestHeaderParams);
}


function* requestAppDetails(action) {
    try {
        const appDetails = action.params;
        yield put({
            type: actionConstants.RECIEVED_APP_DETAILS,
            appDetails
        });
    }
    catch (e) {
        console.log("Error in saga in requestAppDetails: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR_APP_DETAILS
        });
    }
}

export function* checkAppDetails() {
    yield takeLatest(actionConstants.REQUEST_APP_DETAILS, requestAppDetails);
}