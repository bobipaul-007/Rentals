import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";

function getLoginDetailsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getLoginDetails.serviceName;
     console.log("MY HEADERS_login: ", params.headers);
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* getLoginDetailsData(action) {
    try {
        const login_details = yield call(getLoginDetailsService, action.params);
        yield put({
            type: actionConstants.RECIEVED_LOGIN_USER,
            login_details
        });
    }
    catch (e) {
        console.log("error in saga>>", e);
        try {
            yield put({
                type: actionConstants.SYSTEM_ERROR
            });
        } catch (err) {
            console.log("error in inner saga>>", err);
        }

    }
}

export function* checkLoginDetails() {
    yield takeLatest(actionConstants.REQUEST_LOGIN_USER, getLoginDetailsData);
}
