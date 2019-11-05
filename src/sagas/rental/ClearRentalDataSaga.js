import { actionConstants } from "../../actions/ActionConstants";
import { put, takeLatest } from "redux-saga/effects";

function* requestClearRentalData() {
    try {
        yield put({
            type: actionConstants.RECIEVED_RENT_DATA_CLEAR
        });
    }
    catch (e) {
        console.log("Error in saga in requestClearRentalData: " + e);
    }
}

export function* checkRentDataClear() {
    yield takeLatest(actionConstants.REQUEST_RENT_DATA_CLEAR, requestClearRentalData);
}