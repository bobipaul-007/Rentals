import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";

function requestStoreInfoDetailsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getStoreInfo.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestStoreInfoDetails(action) {

    try {
        const storeInfoDetails = yield call(requestStoreInfoDetailsService, action.params);
        const response = {storeInfoDetails: storeInfoDetails, ipValue: action.params.parameters};
        yield put({
            type: actionConstants.RECEIVED_RETRIEVE_STORE_INFO,
            response
        });
    }
    catch (e) {
        console.log("Error in saga in requestStoreInfoDetails: " + e);

        yield put({
            type: actionConstants.SYSTEM_ERROR_STORE_INFO
        });
    }
}

export function* checkStoreInfoDetails() {
    yield takeLatest(actionConstants.REQUEST_RETRIEVE_STORE_INFO, requestStoreInfoDetails);
}


function* requestIpInfoDetails(action) {

    try {
         let parameters = action.params;
        yield put({
            type: actionConstants.RECIEVED_IP,
            parameters
        });
      
    }
    catch (e) {
        console.log("Error in saga in requestIpInfoDetails: " + e);

        yield put({
            type: actionConstants.SYSTEM_ERROR_IP
        });
    }
}

export function* checkIpInfoDetails() {
    yield takeLatest(actionConstants.REQUEST_IP, requestIpInfoDetails);
}
