import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestItemStatusService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getItemStatus.serviceName;
    console.log("MY HEADERS_itemstatus: ", params.headers);
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestItemStatusData(action) {
    try {
        const item_status = yield call(requestItemStatusService, action.params);
        console.log("sage_itemStatus>>>", item_status);
        yield put({
            type: actionConstants.RECIEVED_ITEM_STATUS,
            item_status
        });
    }

    catch (e) {
        console.log("Error in saga in requestItemStatusData: " + e);
        try {
            yield put({
                type: actionConstants.SYSTEM_ERROR_ITEMSTATUS
            });

        }
        catch (e) {
            console.log("Error in saga in requestItemStatusData: " + e);
        }
    }
}

export function* checkItemStatusDetails() {
    yield takeLatest(actionConstants.REQUEST_ITEM_STATUS, requestItemStatusData);
}
