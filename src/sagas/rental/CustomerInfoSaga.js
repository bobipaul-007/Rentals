import { actionConstants } from "../../actions/ActionConstants";
import { put, takeLatest } from "redux-saga/effects";

function* requestCustomerInfoParams(action) {
    try {
        const customerInfo = action.params;
        yield put({
            type: actionConstants.RECIEVED_CUSTOMER_INFO,
            customerInfo
        });
    }
    catch (e) {
        console.log("Error in saga in requestCustomerInfoParams: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR_CUSTOMER_INFO
        });
    }
}

export function* checkCustomerInfoParams() {
    yield takeLatest(actionConstants.REQUEST_CUSTOMER_INFO, requestCustomerInfoParams);
}