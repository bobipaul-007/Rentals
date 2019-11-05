import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestNewCustomerService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.createNewCustomer.serviceName;
    console.log("MY HEADERS_newcust: ", params.headers);
    console.log("MY PARAM_newcust:",params.parameters);
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}
function* requestNewCustomerData(action) {
    try {
        const new_user = yield call(requestNewCustomerService, action.params);
        let new_customer = {status : new_user , details : action.params}
        yield put({
            type: actionConstants.RECIEVED_NEW_CUSTOMER,
            new_customer
        });
    }

    catch (e) {
        console.log("Error in saga in requestNewCustomerData: " + e);
       
            yield put({
                type: actionConstants.SYSTEM_ERROR_NEW_CUSTOMER
            });

       
    }
}

export function* checkNewCustomerDetails() {
    yield takeLatest(actionConstants.REQUEST_NEW_CUSTOMER, requestNewCustomerData);
}
