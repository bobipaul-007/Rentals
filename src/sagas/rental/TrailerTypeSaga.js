import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";

function requestTrailerTypeDetailsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.trailerType.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, "");
}

function* requestTrailerTypeDetails(action) {

    try {
        const trailerTypeDetails = yield call(requestTrailerTypeDetailsService, action.params);
        yield put({
            type: actionConstants.RECIEVED_TRAILER_TYPE_DETAIL,
            trailerTypeDetails
        });
    }
    catch (e) {
        console.log("Error in saga in requestTrailerTypeDetails: " + e);

        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}

export function* checktrailerTypeDetails() {
    yield takeLatest(actionConstants.REQUEST_TRAILER_TYPE_DETAIL, requestTrailerTypeDetails);
}
