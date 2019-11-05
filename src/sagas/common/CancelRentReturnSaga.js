import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";


function requestCancelRentReturnService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.cancelRentReturn.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestCancelRentReturnData(action) {
    try {
        const cancelDetails = yield call(requestCancelRentReturnService, action.params);
        yield put({
            type: actionConstants.RECIEVED_CANCEL_RENT_RETURN,
            cancelDetails
        });
    }

    catch (e) {
        console.log("Error in saga in requestCancelRentReturnData: " + e);
            yield put({
                type: actionConstants.SYSTEM_ERROR_CANCEL_RENT_RETURN
            });
    }
}

export function* cancelRentReturnDetails() {
    yield takeLatest(actionConstants.REQUEST_CANCEL_RENT_RETURN, requestCancelRentReturnData);
}
