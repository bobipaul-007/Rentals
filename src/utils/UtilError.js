import { AppConstants } from '../constants/AppConstants.js';
import { Util } from './utils.js';

export class UtilError {

    /* Constants for Error category */
    static ERROR_CATEGORY = { 'SYSTEM': 'SYSTEM', 'BUSINESS': 'BUSINESS', 'SECURITY': 'SECURITY' };
    /*
	  Function enhances the error Object. It maps the API Error object to
	  form custom Enhanced error object to be consumed by UI.
	  @param Array of errors
      @returns enhanced Error Object
	*/
    enhanceErrorResponse(errorObj) {
        let enhancedErrorObj = [];
        let self = this;
        if ((errorObj !== null) && (!Util.isEmpty(errorObj))) {
            errorObj.forEach(function (error) {
                /*
				  Error code format  - <BUS/SYS>-<PRODUCT>-<J/A/E/I>-<MODULE>-<ErrorCode>
				  SEC - Security,  SYS - Technical, BUS - BUSINESS
				  GroupName - The name of the product and it corresponds to the CSL product.
				  A/S - depending on whether error is in which layer (API, Services)
				  ONL/File - depending on if it is file or online service.
				  Number - Number that corresponds to the error description.
				*/
                let errorModel = self.createErrorModel();
                if (typeof error.errorCode !== "undefined") {
                    /*     let errorDetail = error.errorCode.split('-');*/

                    let errorDetail = [error.code, error.message, error.responseMessage];
                    if (errorDetail.length === AppConstants.ErrorDetails.ERR_DETAIL_LENGTH) {
                        /*errorModel.category = self.getErrorCategory(errorDetail[0]);*/

                        errorModel.errorCode = errorDetail[0];
                        errorModel.description = errorDetail[1];
                        errorModel.responseMessage = errorDetail[2];
                    }
                }
                enhancedErrorObj.push(errorModel);
            });
        }
        return enhancedErrorObj;
    }

	/*
	  Function to initialize the category of the error
	  @param category
      @returns errorCategory
    */


    getErrorCategory(category) {
        let errorCategory;
        errorCategory = UtilError.ERROR_CATEGORY.SYSTEM;

        switch (category.toUpperCase()) {
            case 'BUS':
                errorCategory = UtilError.ERROR_CATEGORY.BUSINESS;
                break;
            case 'SEC':
                errorCategory = UtilError.ERROR_CATEGORY.SECURITY;
                break;
            case 'SYS':
                errorCategory = UtilError.ERROR_CATEGORY.SYSTEM;
                break;
            default:
                errorCategory = UtilError.ERROR_CATEGORY.SYSTEM;
                break;
        }

        return errorCategory;
    }

	/*
	  Function returns new instance of error model
	  @return - errorModel object
	*/
    createErrorModel() {
        let errorModel = {};
        errorModel.errorCode = "";
        errorModel.description = '';
        errorModel.responseMessage = '';
        return errorModel;
    }
}

//Change for TR 