import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";


function requestUpdateReturnService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.updateReturnDetails.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestUpdateReturnData(action) {
    try {
        const updateReturnDetails = yield call(requestUpdateReturnService, action.params);
        yield put({
            type: actionConstants.RECIEVED_UPDATE_RETURN_DETAIL,
            updateReturnDetails
        });
    }

    catch (e) {
        console.log("Error in saga in requestUpdateReturnData: " + e);
            yield put({
                type: actionConstants.SYSTEM_ERROR_UPDATE_RETURN_DETAILS
            });
    }
}

export function* updateReturnDetails() {
    yield takeLatest(actionConstants.REQUEST_UPDATE_RETURN_DETAIL, requestUpdateReturnData);
}
