import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";
// import { Alert } from 'react-native';


//Block Item for Rental

function requestBlockItemService(params) { //api
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.blockItem.serviceName;
    // return providerService.invokeProvider(serviceDef, params.parameters, "");
    console.log("parameters>>", params);
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestItemDetailsData(action) {
    try {

        const payload = yield call(requestBlockItemService, action.params);
        console.log("action.params_filling>>", action.params);
        yield put({ // store value into reducer
            type: actionConstants.RECEIVED_BLOCK_RENTAL_ITEM,
            payload
        });
        console.log("yahaaaa,", payload);
    }

    catch (e) {
        console.log("Error in saga in fillingRentalSaga: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}

export function* checkItemDetails() { //receiving dispatched method from js file; picks up value from that dispatch method and calls middle fn
    yield takeLatest(actionConstants.REQUEST_BLOCK_RENTAL_ITEM, requestItemDetailsData);
}

//Rental Info

function* requestRentalInfoData(action) {

    try {

        const rentalInfo = action.params
        yield put({ // store value into reducer
            type: actionConstants.RECEIVED_FILLING_RENTAL_INFO,
            rentalInfo
        });
        console.log("Params_fillingRental1", rentalInfo);
    }

    catch (e) {

    }
}

export function* checkRentalDetails() { //receiving dispatched method from js file; picks up value from that dispatch method and calls middle fn
    yield takeLatest(actionConstants.REQUEST_FILLING_RENTAL_INFO, requestRentalInfoData);
}


//retrieve rent duration

function requestRentDurationService(params) {

    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.retrieveRentDuration.serviceName;
    console.log("Params_rentDuration", params.parameters, params.headers);
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestRentDuration(action) {

    try {
        const payload = yield call(requestRentDurationService, action.params);
        yield put({
            type: actionConstants.RECEIVED_RETRIEVE_RENT_DURATION,
            payload
        });
        console.log("Params_rentDuration1", payload);
    }
    catch (e) {
        //Please remove console logs and replace them with loggers
        console.log("Error in saga in requestRentDuration: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}

export function* rentDurationDetails() {
    yield takeLatest(actionConstants.REQUEST_RETRIEVE_RENT_DURATION, requestRentDuration);

}



//retrieve store Timing

function requestStoreTimingService(params) {

    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getStoreTiming.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestStoreTiming(action) {

    try {
        const storeTiming = yield call(requestStoreTimingService, action.params);
        yield put({
            type: actionConstants.RECEIVED_RETRIEVE_STORE_TIMING,
            storeTiming
        });

        console.log("storeTiming>>>", JSON.stringify(storeTiming));
    }
    catch (e) {
        //Please remove console logs and replace them with loggers
        console.log("Error in saga in requestStoreTiming: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}

export function* storeTimingDetails() {
    yield takeLatest(actionConstants.REQUEST_RETRIEVE_STORE_TIMING, requestStoreTiming);
}