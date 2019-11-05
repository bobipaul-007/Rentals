import { actionConstants } from "../../actions/ActionConstants";
import { put, takeLatest } from "redux-saga/effects";

function* requestClearExtendData() {
    try {
        yield put({
            type: actionConstants.RECIEVED_EXTEND_DATA_CLEAR

        });
    }
    catch (e) {
        console.log("Error in saga in requestClearExtendData: " + e);
    }
}

export function* checkExtendDataClear() {
    yield takeLatest(actionConstants.REQUEST_EXTEND_DATA_CLEAR, requestClearExtendData);
}