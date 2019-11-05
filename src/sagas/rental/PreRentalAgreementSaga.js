import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";

import { JsLoggerService } from '../../services/jsLoggerService';


function* requestPreRentalInfo(action) {
    try {
        let parameters = action.params;
        yield put({
            type: actionConstants.RECIEVED_PRE_RENTAL_INFO,
            parameters
        });
    }
    catch (e) {
        let logger = new JsLoggerService();
        logger.getLogger().error("ERROR in Saga: PreRentalAgreementSaga: with description: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}

export function* checkPreRentalAgreementInfo() {
    yield takeLatest(actionConstants.REQUEST_PRE_RENTAL_INFO, requestPreRentalInfo);
}

function requestPreRentalInfoSave(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.uploadImages.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestPreRentalInfo2(action) {
    try {
        const areImagesSaved = yield call(requestPreRentalInfoSave, action.params);
        yield put({
            type: actionConstants.SAVED_PRE_RENTAL_INFO_IMAGES,
            areImagesSaved
        })
    }
    catch (e) {
        let logger = new JsLoggerService();
        logger.getLogger().info("ERROR in saga in PreRentalAgreementSaga: with description>>: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR_SAVEIMAGE
        });
    }
}


export function* checkPreRentalAgreementInfo2() {
    yield takeLatest(actionConstants.SAVE_PRE_RENTAL_INFO_IMAGES, requestPreRentalInfo2);
}

function requestPreRentalDeleteImage(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.deleteImage.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}


function* requestdeleteImage(action) {
    try {
        const payload = yield call(requestPreRentalDeleteImage, action.params);
        yield put({
            type: actionConstants.RECEIVED_RETRIEVE_DELETE_IMAGE,
            payload
        })
    }
    catch (e) {
        let logger = new JsLoggerService();
        logger.getLogger().info("ERROR in saga in PreRentalAgreementSaga: with requestdeleteImage>>: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}


export function* preRentalAgreementDeleteImage() {
    yield takeLatest(actionConstants.REQUEST_RETRIEVE_DELETE_IMAGE, requestdeleteImage);
}
