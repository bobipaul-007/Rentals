import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestLogoutDetailsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getLogoutDetails.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, "");
}

function* requestLogoutDetailsData(action) {
    try {
        const logout_details = yield call(requestLogoutDetailsService, action.params);
        yield put({
            type: actionConstants.RECIEVED_LOGOUT_USER,//loggedout
            logout_details
        });
    }

    catch (e) {
        console.log("Error in saga in requestLogoutDetailsData: " + e);
       
            yield put({
                type: actionConstants.SYSTEM_ERROR
            });

    }
}

export function* checkLogoutDetails() {
    yield takeLatest(actionConstants.REQUEST_LOGOUT_USER, requestLogoutDetailsData);
}
