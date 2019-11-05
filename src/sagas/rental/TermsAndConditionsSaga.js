import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";


function requestTermsAndConditionsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getTermsAndConditions.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestTermsAndConditions(action) {

    try {
        const payload = yield call(requestTermsAndConditionsService,action.params);
        console.log("REPO: IS: ",payload);
        yield put({
            type: actionConstants.RECIEVED_TERMS_AND_CONDITIONS,
            payload
        });
    }
    catch (e) {
       
        console.log("ERROR in Saga: TermsAndConditionsSaga: with description: " + e);
            yield put({
                type: actionConstants.SYSTEM_ERROR_TERMSANDCONDITIONS
            });
    }
}

export function* getTermsAndConditions() {
    yield takeLatest(actionConstants.REQUEST_TERMS_AND_CONDITIONS, requestTermsAndConditions);
}
