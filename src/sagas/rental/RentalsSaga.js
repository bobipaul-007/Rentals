import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";
import {Alert} from 'react-native';
import * as textLabel from "../../config/TranslationProperties";



function getCurrentRentalsService(params) {
    const providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.currentRentals.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, "");
}

function* getCurrentRentals(action) {
    try {
        const rentals = yield call(getCurrentRentalsService, action.params);
        console.log("sage>>>", rentals.response);
        yield put({
                type: actionConstants.RECIEVED_CURRENT_RENTALS,
                rentals
            });
    } catch (e) {
        console.log("Error in saga in getCurrentRentals: " + e);       
            yield put({
                type: actionConstants.NETWORK_ERROR
            });
    }
}

export function* currentRentals() {
    yield takeLatest(actionConstants.REQUEST_CURRENT_RENTALS, getCurrentRentals);
}
