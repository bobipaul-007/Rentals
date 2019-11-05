import { actionConstants } from "../../actions/ActionConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { ProviderService } from "../../services/providerService";
import { ServiceConfig } from "../../config/ServiceConfig";



function requestInspectionQuestionsService(params) {

    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.inspectionQuestions.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* requestInspectionQuestions(action) {
    
    try {
        const payload = yield call(requestInspectionQuestionsService, action.params);
        yield put({
            type: actionConstants.RECEIVED_INSPECTION_QUESTIONS,
            payload
        });
    }
    catch (e) {
        //Please remove console logs and replace them with loggers
        console.log("Error in saga in requestInspectionQuestions: " + e);
            yield put({
                type: actionConstants.SYSTEM_ERROR_RETRIEVE_QSNS
            });
    }
}

export function* inspectionQuestionsDetails() {
    yield takeLatest(actionConstants.REQUEST_INSPECTION_QUESTIONS, requestInspectionQuestions);
}

//updated inspections questions

function updateInspectionQuestionsService(params) {

    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.updateInspectionQuestions.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* updateInspectionQuestions(action) {
    
    try {
        const payload = yield call(updateInspectionQuestionsService, action.params);
        yield put({
            type: actionConstants.UPDATED_INSPECTION_QUESTIONS,
            payload
        });
    }
    catch (e) {
        //Please remove console logs and replace them with loggers
        console.log("Error in saga in updateInspectionQuestions: " + e);
            yield put({
                type: actionConstants.SYSTEM_ERROR_UPDATE_QSNS
            });
    }
}

export function* updatedInspectionQuestionsDetails() {
    yield takeLatest(actionConstants.UPDATE_INSPECTION_QUESTIONS, updateInspectionQuestions);
}


//rental agreement number

function getAgreementNumberService(params) {
    let providerService = new ProviderService();
    let serviceDef = new ServiceConfig();
    serviceDef = serviceDef.backendConfig.serviceDefinitions.getAgreementNumber.serviceName;
    return providerService.invokeProvider(serviceDef, params.parameters, params.headers);
}

function* getAgreementNumber(action) {
    try {
        const payload = yield call(getAgreementNumberService, action.params);
        yield put({
            type: actionConstants.RECIEVED_RENTAL_AGREEMENT_NUMBER,
            payload
        });
    }
    catch (e) {
         console.log("Error in saga in getAgreementNumberService: " + e);
        yield put({
            type: actionConstants.SYSTEM_ERROR_GET_AGREEMENT_NO
        });
    }
}

export function* checkAgreementNumber() {
    yield takeLatest(actionConstants.REQUEST_RENTAL_AGREEMENT_NUMBER, getAgreementNumber);
}

