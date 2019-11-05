import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestRetriveRentalImageService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.retriveRentalImages.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestUpdateRetriveImages(action) {
    try {
        const retriveRentalImages = yield call(requestRetriveRentalImageService, action.params);
        console.log("sage_UpdateCust>>>", retriveRentalImages);
       
       //let retrive_rental_images = {status : retriveRentalImages , details : action.params}
        yield put({
            type: actionConstants.RECEIVED_RETRIVE_RENTAL_IMAGES,
            retriveRentalImages
        });
    }

    catch (e) {
        console.log("Error in saga in retriveRentalImages: " + e);
     
            yield put({
                type: actionConstants.NETWORK_ERROR
            });

       
    }
}

export function* checkUpdateRetriveImages() {
    yield takeLatest(actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES, requestUpdateRetriveImages);
}
