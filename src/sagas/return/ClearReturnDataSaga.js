import { actionConstants } from "../../actions/ActionConstants";
import { put, takeLatest } from "redux-saga/effects";

function* requestClearReturnData() {
    try {
        yield put({
            type: actionConstants.RECIEVED_RETURN_DATA_CLEAR
        });
    }
    catch (e) {
        console.log("Error in saga in requestClearReturnData: " + e);
    }
}

export function* checkReturnDataClear() {
    yield takeLatest(actionConstants.REQUEST_RETURN_DATA_CLEAR, requestClearReturnData);
}