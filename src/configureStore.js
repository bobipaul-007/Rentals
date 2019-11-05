import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers/Reducer";
import createSagaMiddleware from "redux-saga";
import { currentRentals } from "./sagas/rental/RentalsSaga";
import { checkLoginDetails } from "./sagas/common/LoginScreenSaga";
import { checkLogoutDetails } from "./sagas/common/UserLogoutSaga";
import { checkNewCustomerDetails } from "./sagas/rental/NewCustomerSaga";
import { checkDriverLicenceParams, customerDLDeleteImage } from "./sagas/rental/CustomerDLInfoSaga";
import { searchCustomerDetails } from "./sagas/rental/SearchCustomerSaga";
import { updateRentalDetails } from "./sagas/rental/UpdateRentalDetailsSaga";
import { checkUpdateCustomerDetails } from "./sagas/rental/UpdateCustomerSaga";
import { checktrailerTypeDetails } from "./sagas/rental/TrailerTypeSaga";
import { checkItemDetails, checkRentalDetails, rentDurationDetails, storeTimingDetails } from "./sagas/rental/FillingRentalInfoSaga";
import { checkUpdateRetriveImages } from "./sagas/common/retriveRentalImageSaga";
import { uploadImagesDetails, checkTrailerReturnInfo } from "./sagas/common/UploadImagesSaga";
import { checkItemStatusDetails } from "./sagas/common/ItemStatusSaga";
import { checkPreRentalAgreementInfo } from './sagas/rental/PreRentalAgreementSaga';
import { checkPreRentalAgreementInfo2, preRentalAgreementDeleteImage } from './sagas/rental/PreRentalAgreementSaga';
import {getTermsAndConditions} from './sagas/rental/TermsAndConditionsSaga';
import { checkExtendRentalDetails} from './sagas/extend/ExtendItemRentalSaga';
import { checkStoreInfoDetails, checkIpInfoDetails} from './sagas/common/RetrieveStoreInfoSaga';
import {checkDLinsuranceImagesSaved} from "./sagas/rental/CustomerDLInfoSaga";
import { inspectionQuestionsDetails, updatedInspectionQuestionsDetails, checkAgreementNumber } from "./sagas/common/InspectionSaga";
import { checkHeaderParams, checkAppDetails } from "./sagas/common/HeaderParamsSaga";
import { checkCustomerInfoParams } from "./sagas/rental/CustomerInfoSaga";
import { updateReturnDetails } from "./sagas/return/UpdateReturnDetailsSaga";
import { cancelRentReturnDetails } from "./sagas/common/CancelRentReturnSaga";
import { checkRentDataClear } from "./sagas/rental/ClearRentalDataSaga";
import { checkReturnDataClear } from "./sagas/return/ClearReturnDataSaga";
import { checkExtendDataClear } from "./sagas/extend/ClearExtendDataSaga";


export default function configureStore(preloadedState) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const logger = createLogger();
    middlewares.push(logger);
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            ...middlewares
        ));

    sagaMiddleware.run(checkLoginDetails);
    sagaMiddleware.run(checkHeaderParams);
    sagaMiddleware.run(checkLogoutDetails);
    sagaMiddleware.run(checkNewCustomerDetails);
    sagaMiddleware.run(checkDriverLicenceParams);
    sagaMiddleware.run(searchCustomerDetails);
    sagaMiddleware.run(updateRentalDetails);
    sagaMiddleware.run(checkUpdateCustomerDetails);
    sagaMiddleware.run(checktrailerTypeDetails);
    sagaMiddleware.run(checkItemDetails);
    sagaMiddleware.run(checkRentalDetails);
    sagaMiddleware.run(checkUpdateRetriveImages);
    sagaMiddleware.run(currentRentals);
    sagaMiddleware.run(uploadImagesDetails);
    sagaMiddleware.run(checkItemStatusDetails);
    sagaMiddleware.run(checkPreRentalAgreementInfo);
    sagaMiddleware.run(checkPreRentalAgreementInfo2);
    sagaMiddleware.run(inspectionQuestionsDetails);
    sagaMiddleware.run(getTermsAndConditions);
    sagaMiddleware.run(updatedInspectionQuestionsDetails);
    sagaMiddleware.run(checkAgreementNumber);
    sagaMiddleware.run(checkExtendRentalDetails);
    sagaMiddleware.run(checkStoreInfoDetails);
    sagaMiddleware.run(checkDLinsuranceImagesSaved);
    sagaMiddleware.run(rentDurationDetails);
    sagaMiddleware.run(checkIpInfoDetails);
    sagaMiddleware.run(storeTimingDetails);
    sagaMiddleware.run(preRentalAgreementDeleteImage);
    sagaMiddleware.run(customerDLDeleteImage);
    sagaMiddleware.run(checkAppDetails);
    sagaMiddleware.run(checkCustomerInfoParams);
    sagaMiddleware.run(checkTrailerReturnInfo);
    sagaMiddleware.run(updateReturnDetails);
    sagaMiddleware.run(cancelRentReturnDetails);
    sagaMiddleware.run(checkRentDataClear);
    sagaMiddleware.run(checkReturnDataClear);
    sagaMiddleware.run(checkExtendDataClear);

    return store;
}