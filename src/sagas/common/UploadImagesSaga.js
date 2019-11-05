import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestUploadImagesService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.uploadImages.serviceName;
 
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestUploadImagesData(action) {
    try {
        const uploadImages = yield call(requestUploadImagesService, action.params);
        console.log("ABC>>>", JSON.stringify(uploadImages));
       // let new_customer = {status : new_user , details : action.params}
        yield put({
            type: actionConstants.RECEIVED_UPLOAD_IMAGES,
            uploadImages
        });
    }

    catch (e) {
        console.log("Error in saga in requestUpdateRentalData: " + e);
      
            yield put({
                type: actionConstants.SYSTEM_ERROR
            });

       
    }
}

export function* uploadImagesDetails() {
    yield takeLatest(actionConstants.REQUEST_UPLOAD_IMAGES, requestUploadImagesData);
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
        logger.getLogger().info("ERROR in saga in retrunTrailerSaga: with requestdeleteImage>>: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}


export function* preRentalAgreementDeleteImage() {
    yield takeLatest(actionConstants.REQUEST_RETRIEVE_DELETE_IMAGE, requestdeleteImage);
}


function* requestReturnInfo(action) {
    try {
        let parameters = action.params;
        yield put({
            type: actionConstants.RECIEVED_PRE_RETURN_INFO,
            parameters
        });
    }
    catch (e) {
        let logger = new JsLoggerService();
        logger.getLogger().error("ERROR in Saga: storingRtailerReturn: with description: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR
        });
    }
}

export function* checkTrailerReturnInfo() {
    yield takeLatest(actionConstants.REQUEST_PRE_RETURN_INFO, requestReturnInfo);
}

