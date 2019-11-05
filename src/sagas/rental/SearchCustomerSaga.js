import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";

function requestSearchCustomerDetailsService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.searchCustomer.serviceName;
    console.log("MY HEADERS_searchcust: ", params.headers);
    console.log("MY PARAM_searchcust:", JSON.stringify(params.parameters));
    return providerService.invokeProvider(serviceDef, JSON.stringify(params.parameters), params.headers);
}

function* requestSearchCustomerDetails(action) {

    try {
        const searchCustomerDetails = yield call(requestSearchCustomerDetailsService, action.params);

        yield put({
            type: actionConstants.RECIEVED_SEARCH_CUSTOMER,
            searchCustomerDetails
        });
      
    }
    catch (e) {
        console.log("Error in saga in requestSearchCustomerDetails: " + e);
        try {
            yield put({
                type: actionConstants.SYSTEM_ERROR_SEARCH_CUST
            });

        }
        catch (e) {
            console.log("Error in saga in requestSearchCustomerDetails__: " + e);
        }
    }
}

export function* searchCustomerDetails() {
    yield takeLatest(actionConstants.REQUEST_SEARCH_CUSTOMER, requestSearchCustomerDetails);
}
