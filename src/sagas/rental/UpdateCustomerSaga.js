import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestUpdateCustomerService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    console.log("MY HEADERS_searchcust: ", params.headers);
    console.log("MY PARAM_searchcust:", params.parameters);
    serviceDef = serviceDef.backendConfig.serviceDefinitions.updateCustomerInfo.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestUpdateCustomerData(action) {
    try {
        const update_customer = yield call(requestUpdateCustomerService, action.params);
        console.log("sage_UpdateCust>>>", update_customer);

        let updateCustomer = { status: update_customer, details: action.params }
            console.log("sage_UpdateCust11>>>", updateCustomer);
        yield put({
            type: actionConstants.UPDATED_CUST_INFO,
            updateCustomer
        });
    }

    catch (e) {
        console.log("Error in saga in requestUpdateCustomerData: " + e);

        yield put({
            type: actionConstants.SYSTEM_ERROR_UPDATE_CUSTOMER
        });


    }
}

export function* checkUpdateCustomerDetails() {
    yield takeLatest(actionConstants.UPDATE_CUST_INFO, requestUpdateCustomerData);
}
