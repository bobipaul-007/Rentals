import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";


function requestUpdateRentalService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.updateRentalDetails.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestUpdateRentalData(action) {
    try {
        const updateRentalDetails = yield call(requestUpdateRentalService, action.params);
        yield put({
            type: actionConstants.RECIEVED_UPDATE_RENTAL_DETAIL,
            updateRentalDetails
        });
    }

    catch (e) {
        console.log("Error in saga in requestUpdateRentalData: " + e);
            yield put({
                type: actionConstants.SYSTEM_ERROR_UPDATE_RENT_DETAILS
            });
    }
}

export function* updateRentalDetails() {
    yield takeLatest(actionConstants.REQUEST_UPDATE_RENTAL_DETAIL, requestUpdateRentalData);
}
