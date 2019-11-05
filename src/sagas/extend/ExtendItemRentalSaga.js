import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";

function requestExtendRentalDetailsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.extendItemRental.serviceName;
    console.log("ExtendItem_parameters>>", params.parameters);
    console.log("ExtendItem_headers>>", params.headers);
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestExtendRentalDetails(action) {

    try {
        const extendRental = yield call(requestExtendRentalDetailsService, action.params);
        let rental = { status: extendRental, details: action.params }
        yield put({
            type: actionConstants.RECEIVED_EXTEND_ITEM_RENTAL,
            rental
        });
    }
    catch (e) {
        console.log("Error in saga in requestExtendRentalDetails: " + e);

        yield put({
            type: actionConstants.SYSTEM_ERROR_EXTENDITEM
        });
    }
}

export function* checkExtendRentalDetails() {
    yield takeLatest(actionConstants.REQUEST_EXTEND_ITEM_RENTAL, requestExtendRentalDetails);
}
