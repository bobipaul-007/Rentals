import { actionConstants } from "../../actions/ActionConstants";
import { JsLoggerService } from '../../services/jsLoggerService';
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";


function* requestDLInfoParams(action) {
    let data = action.params;
    const customer_DL_details = data;
    let insurance_details = { status: customer_DL_details, details: action.params }
    yield put({
        type: actionConstants.RECIEVED_DL_CUSTOMER,
        insurance_details
    });
}

export function* checkDriverLicenceParams() {
    yield takeLatest(actionConstants.REQUEST_DL_CUSTOMER, requestDLInfoParams);
}

function requestInsuranceImageSave(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.uploadImages.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}



function* requestInsuranceImgSave(action) {
    try {
        const areImagesSaved = yield call(requestInsuranceImageSave, action.params);
        yield put({
            type: actionConstants.SAVED_CUST_INSURANCE_IMAGES,
            areImagesSaved
        })
    }
    catch (e) {
        let logger = new JsLoggerService();
        logger.getLogger().info("ERROR in saga in CustomerDLInfo: with description: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}


export function* checkDLinsuranceImagesSaved() {
    yield takeLatest(actionConstants.SAVE_CUST_INSURANCE_IMAGES, requestInsuranceImgSave);
}

function requestCustomerDLDeleteImage(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.deleteImage.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}


function* requestdeleteImage(action) {
    try {
        const payload = yield call(requestCustomerDLDeleteImage, action.params);
        yield put({
            type: actionConstants.RECEIVED_RETRIEVE_DELETE_IMAGE,
            payload
        })
    }
    catch (e) {
        let logger = new JsLoggerService();
        console.log("ERROR in saga in PreRentalAgreementSaga: with requestdeleteImage>>: " + e);
        try{
         yield put({
            type: actionConstants.SYSTEM_ERROR
        });
        }catch(e){
        console.log("system err",e)
        }
       
    }
}


export function* customerDLDeleteImage() {
    yield takeLatest(actionConstants.REQUEST_RETRIEVE_DELETE_IMAGE, requestdeleteImage);
}


