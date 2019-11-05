import { Util } from '../utils/utils.js';
import { AppConstants } from "../constants/AppConstants";
import { JsLoggerService } from '../services/jsLoggerService.js';

var getUserLoginDetails = require('../assets/data/common/login.json');
import { UserLoginDB, USERLOGINDB } from '../assets/data/common/Schemas/loginSchema.js';

var getStoreInfo = require('../assets/data/common/retrieveStoreInfo.json');
import { GetStoreInfoDB, GETSTOREINFODB } from '../assets/data/common/Schemas/retrieveStoreInfoSchema.js';

var updateCustomerInfo = require('../assets/data/rental/updateCustomerInfo.json');
import { UpdateCustInfoDB, UPDATECUSTINFODB } from '../assets/data/rental/Schemas/updateCustomeInfoSchema.js';

var createNewCustomer = require('../assets/data/rental/createNewCustomer.json');
import { createNewCustomerDB, CREATENEWCUSTOMERODB } from '../assets/data/rental/Schemas/createNewCustomerSchema.js';

var updateRentalDetails = require('../assets/data/rental/updateRentalDetails.json');
import { UpdateRentalDetailsDB, UPDATERENTALDETAILSDB } from '../assets/data/rental/Schemas/updateRentalDetailsSchema.js';

var searchCustomer = require('../assets/data/rental/searchCustomer.json');
import { SearchCustomerDB, SEARCHCUSTOMERDB } from '../assets/data/rental/Schemas/searchCustomerSchema.js';

var getUserLogout = require('../assets/data/common/logout.json');
import { UserLogoutDB, USERLOGOUTDB } from '../assets/data/common/Schemas/logoutSchema.js';

var blockItem = require('../assets/data/rental/blockItem.json');
import { BlockItemDB, BLOCKITEMDB } from '../assets/data/rental/Schemas/blockItemSchema.js';

var trailerType = require('../assets/data/rental/trailerType.json');
import { TrailerTypeDB, TRAILERTYPEDB } from '../assets/data/rental/Schemas/trailerTypeSchema.js';

var retriveRentalImages = require('../assets/data/return/retriveRentalImages.json');
import { RetriveRentalImagesDB, RETRIVERENTALIMAGEDB } from '../assets/data/return/Schemas/retriveRentalImages.js';

var uploadImages = require('../assets/data/common/uploadImages.json');
import { uploadImagesDB, UOLOADIMAGESDB } from '../assets/data/common/Schemas/uploadImagesSchema.js';

var inspectionQuestions = require('../assets/data/common/inspectionQuestions.json');
import { InspectionQuestionsDB, INSPECTIONQUESTIONSDB } from '../assets/data/common/Schemas/inspectionQuestionsSchema.js';

var Rentals = require('../assets/data/common/Rentals.json');
import { RentalsDB, RENTALSDB } from '../assets/data/common/Schemas/RentalsSchema.js';

var getItemStatus = require('../assets/data/common/getItemStatus.json');
import { ItemStatusDB, ITEMSTATUSDB } from '../assets/data/common/Schemas/getItemStatusSchema.js';

var updateInspectionQuestions = require('../assets/data/common/updateInspectionQuestions.json');
import { UPDATEINSPECTIONQUESTIONSDB, UpdateInspectionQuestionsDB } from '../assets/data/common/Schemas/updateInspectionQuestionsSchema.js';

var termsAndConditions = require('../assets/data/rental/termsAndConditions.json');
import {TermsAndConditionsDB, TERMSANDCONDITIONSDB} from '../assets/data/rental/Schemas/termsAndConditionsSchema.js';

var AgreementNumber = require('../assets/data/common/agreementNumber.json');
import {AGREEMENTNUMBERDB, AgreementNumberDB} from '../assets/data/common/Schemas/agreementNumberSchema.js';

var extendItemRental = require('../assets/data/extend/extendItemRental.json');
import {ExtendItemRentalDB, EXTENDITEMRENTALDB} from '../assets/data/extend/Schemas/extendItemRentalSchema.js';

var retrieveRentDuration = require('../assets/data/common/retrieveRentDuration.json');
import {RetrieveRentDurationDB, RETRIEVERENTDURATIONDB} from '../assets/data/common/Schemas/retrieveRentDurationSchema.js';

var getStoreTiming = require('../assets/data/common/getStoreTiming.json');
import {StoreTimingDB, STORETIMINGDB} from '../assets/data/common/Schemas/getStoreTimingSchema.js';

var updateReturnDetails = require('../assets/data/return/updateReturnDetails.json');
import { UpdateReturnDetailsDB, UPDATERETURNDETAILSDB } from '../assets/data/return/Schemas/updateReturnDetailsSchema.js';

var cancelRentReturn = require('../assets/data/common/cancelRentReturn.json');
import { CancelRentReturnDB, CANCELRENTRETURNDB } from '../assets/data/common/Schemas/cancelRentReturnSchema.js';


export class ServiceConfig {
    constructor() {
        this.logger = new JsLoggerService();
    }
    backendConfig = {
        demoDb: true,
        serviceDefaults: {
            "isSecured": true,
            "httpMethod": AppConstants.HTTP_Methods.API_POST,
            "retryAllowed": false,
            "server": "API",

            /******************************************************************** */
            "data": {},
            "timeout": 1000,
            "withCredentials": false,
            "defaultApplicationHeader": {
                "content-Type": AppConstants.APP_JSON,
                "Access-Control-Allow-Origin": AppConstants.ASTERISK,
                "Accept": AppConstants.APP_JSON,
                "responseType": AppConstants.JSON_RESPONSE_TYPE
            },
            /***************************Application Specific Header Params******************************************* */
            "customApplicationheaders": {
                'deviceId': '',
                'storeId': '',
                'applicationVersion': '',
                'userId': '',
                'channelType': '',
                'localTimeZone': ''
            }

            /*********************************************************************** */
        },

        serviceDefinitions: {
            /** Get login user details  **/
            "getLoginDetails": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "getLoginDetails",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL1,
                "online": {
                    "serviceURL": "TMM-store-config/login-user"
                },
              
                "demo": {
                    // "serviceURL": "TMM-store-config/login-user",
                    "serviceData": getUserLoginDetails.response,
                    "storeName": USERLOGINDB,
                    "DBName": UserLoginDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },

            /** User Logout**/
            "getLogoutDetails": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "getLogoutDetails",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL1,
                "online": {
                    "serviceURL": "TMM-store-config/logout-user"
                },
                "demo": {
                    // "serviceURL": "TMM-store-config/login-user",
                    "serviceData": getUserLogout.response,
                    "storeName": USERLOGOUTDB,
                    "DBName": UserLogoutDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },

            /** Get Store Info**/
            "getStoreInfo": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "getStoreInfo",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL3,
                "online": {
                    "serviceURL": "TMM-config/Get-Store-Info"
                },
                "demo": {
                    "serviceData": getStoreInfo.response,
                    "storeName": GETSTOREINFODB,
                    "DBName": GetStoreInfoDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },
            /** create new customer**/
            "createNewCustomer": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "createNewCustomer",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{rentalNumber}/customer"
                },
                "demo": {
                    "serviceData": createNewCustomer,
                    "storeName": CREATENEWCUSTOMERODB,
                    "DBName": createNewCustomerDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },
            /** Update customer info details  **/
            "updateCustomerInfo": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "updateCustomerInfo",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{rentalNumber}/customer/{customerID}"
                },
                "demo": {
                    "serviceData": updateCustomerInfo,
                    "storeName": UPDATECUSTINFODB,
                    "DBName": UpdateCustInfoDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },
            /** retrieve item status details  **/
            "getItemStatus": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "getItemStatus",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item-status"
                },
                "demo": {
                    "serviceData": getItemStatus, //.Items,
                    "storeName": ITEMSTATUSDB,
                    "DBName": ItemStatusDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"
                    //"objectArray": "null"

                }
            },

            /** Search customer info details  **/
            "searchCustomer": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "searchCustomer",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "customers"
                },
                "demo": {
                    "serviceData": searchCustomer,
                    "storeName": SEARCHCUSTOMERDB,
                    "DBName": SearchCustomerDB,
                    "isArray": false,
                    "handleName": "response",// "customerList",
                    "handler": "realmHandler",
                    "function": "realmDataParser",


                }
            },
          
            /** Block item for rental  **/
            "blockItem": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "blockItem",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{itemStoreId}/block-item/{rentalNumber}"
                },
                "demo": {
                    "serviceData": blockItem,
                    "storeName": BLOCKITEMDB,
                    "DBName": BlockItemDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },

            //updateRentalDetails
            "updateRentalDetails": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "updateRentalDetails",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{rentalNumber}/rental/{action}"
                },
                "demo": {
                    "serviceData": updateRentalDetails,
                    "storeName": UPDATERENTALDETAILSDB,
                    "DBName": UpdateRentalDetailsDB,
                    "isArray": "null",//false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },


            /** trailer type for rental  **/
            "trailerType": {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "trailerType",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "{itemNumber}/item-types"
                },
                "demo": {
                    "serviceData": trailerType.itemTypes,
                    "storeName": TRAILERTYPEDB,
                    "DBName": TrailerTypeDB,
                    "isArray": true,
                    "handleName": "itemTypes",//handleName needs to be changed/removed
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"
                }
            },

        

            //retriveRentalImages on Return flow
            "retriveRentalImages": {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "retriveRentalImages",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "images/{rentalNumber}"
                },
                "demo": {
                    "serviceData": retriveRentalImages,
                    "storeName": RETRIVERENTALIMAGEDB,
                    "DBName": RetriveRentalImagesDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },


            //upload capture images
            "uploadImages": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "uploadImages",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{itemId}/images/{rentalNumber}"
                   
                },
                "demo": {
                    "serviceData": uploadImages,
                    "storeName": UOLOADIMAGESDB,
                    "DBName": uploadImagesDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"

                }
            },

            /** Inspection questions for rental and return  **/
            "inspectionQuestions": {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "inspectionQuestions",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{itemId}/question"
                },
                "demo": {
                    "serviceData": inspectionQuestions,
                    "storeName": INSPECTIONQUESTIONSDB,
                    "DBName": InspectionQuestionsDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"

                }
            },

            //Get Rentals
            "currentRentals": {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "currentRentals",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL3,
                "online": {
                    "serviceURL": "item/{rentalNumber}?rentalType=rental"
                },
                "demo": {
                    "serviceData": Rentals.rentedItems.Items,
                    "storeName": RENTALSDB,
                    "DBName": RentalsDB,
                    "isArray": true,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"
                }
            },

            /** Update Inspection Questions  **/
            "updateInspectionQuestions": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "updateInspectionQuestions",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{itemId}/question/{rentalNumber}"
                },
                "demo": {
                    "serviceData": updateInspectionQuestions,
                    "storeName": UPDATEINSPECTIONQUESTIONSDB,
                    "DBName": UpdateInspectionQuestionsDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },

            //Terms and Conditions

            'getTermsAndConditions': {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "getTermsAndConditions",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{itemNumber}/item-types/{itemId}"
                },
                "demo": {
                    "serviceData": termsAndConditions,
                    "storeName": TERMSANDCONDITIONSDB,
                    "DBName": TermsAndConditionsDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"
                }
            },

            'getAgreementNumber': {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "getAgreementNumber",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                   "serviceURL": "item/rental-number"

                },
                "demo": {
                    "serviceData": AgreementNumber,
                    "storeName": AGREEMENTNUMBERDB,
                    "DBName": AgreementNumberDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"
                }
            },

            /** Extend Item Rental  **/
            "extendItemRental": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "extendItemRental",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{rentalNumber}/rental/extend"
                },
                "demo": {
                    "serviceData": extendItemRental,
                    "storeName": EXTENDITEMRENTALDB,
                    "DBName": ExtendItemRentalDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"

                }
            },

            /** Retrieve Rent Duration  **/
            "retrieveRentDuration": {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "retrieveRentDuration",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{itemId}/rent-duration"
                },
                "demo": {
                    "serviceData": retrieveRentDuration,
                    "storeName": RETRIEVERENTDURATIONDB,
                    "DBName": RetrieveRentDurationDB,
                    "isArray": false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"

                }
            },

              /** getStoreTiming **/
            "getStoreTiming": {
                "httpMethod": AppConstants.HTTP_Methods.API_GET,
                "serviceName": "getStoreTiming",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "store-timing/00525"
                },
                "demo": {
                    "serviceData": getStoreTiming,
                    "storeName": STORETIMINGDB,
                    "DBName": StoreTimingDB,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"

                }
            },

             "deleteImage":{
                  "httpMethod": AppConstants.HTTP_Methods.API_DELETE,
                "serviceName": "deleteImage",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "{rentalNumber}/images/{imageId}"
                },
                "demo": {
                    "serviceData":"" ,
                    "storeName":"" ,
                    "DBName":"" ,
                    "isArray": "null",
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser"

                }

            },

            //update Return Details
            "updateReturnDetails": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "updateReturnDetails",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{rentalNumber}/rental/{action}"
                },
                "demo": {
                    "serviceData": updateReturnDetails,
                    "storeName": UPDATERETURNDETAILSDB,
                    "DBName": UpdateReturnDetailsDB,
                    "isArray": "null",//false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"
                }
            },
           

            //cancel Rent Return
            "cancelRentReturn": {
                "httpMethod": AppConstants.HTTP_Methods.API_POST,
                "serviceName": "cancelRentReturn",
                "serviceFlag": AppConstants.BASE_URLS.BASE_URL2,
                "online": {
                    "serviceURL": "item/{rentalNumber}/rental/{action}"
                },
                "demo": {
                    "serviceData": cancelRentReturn,
                    "storeName": CANCELRENTRETURNDB,
                    "DBName": CancelRentReturnDB,
                    "isArray": "null",//false,
                    "handleName": "response",
                    "handler": "realmHandler",
                    "function": "realmDataParser",
                    "objectArray": "null"
                }
            },


        },
    }

    /*
    * Returns the service definition for the given service id
    * @param serviceId the service id
    * @return the service definition
    */
    getServiceDefinition(serviceId, envConfig) {
        //let serviceDefaults = this.backendConfig.serviceDefinitions['serviceDefaults'];
        this.logger.getLogger().info("entering: getServiceDefinition");
        this.logger.getLogger().info("entering getServiceDefinition with service id: " + serviceId + " and environment config: " + envConfig);
        let serviceDefaults = this.backendConfig.serviceDefaults;
        let serviceDefinition = this.backendConfig.serviceDefinitions[serviceId];
        this.logger.getLogger().debug("checking whether service definition is empty");
        if (Util.isEmpty(serviceDefinition)) {
            this.logger.getLogger().debug("inside condition: service definition is empty");
            this.logger.getLogger().error("Cannot find a definition for service" + serviceId);
        }
        let serverUrl = this.getServerUrlPrefix(envConfig);
        let onlineServiceUrl = this.constructServiceUrl(serviceDefinition, serverUrl);

        serviceDefinition.online.serviceURL = '';
        serviceDefinition.serviceId = serviceId;
        serviceDefinition.online.serviceURL = onlineServiceUrl;
        this.logger.getLogger().info("exiting: getServiceDefinition");
        return Object.assign({}, serviceDefaults, serviceDefinition);
    }


    /*
    * Returns the server url prefix for the given server
    * @param serverName the server name
    * @param isSecured true if the channel need to be secured
    * @return the server url prefix
    */
    getServerUrlPrefix(envConfig) {
        this.logger.getLogger().info("entering: getServerUrlPrefix");
        this.logger.getLogger().info("entering getServiceDefinition with environment config: " + envConfig);
        let serverUrls = envConfig.serverPrefixType;
        let serverEntry = envConfig.serverURLs[serverUrls];
        let urlPrefix = "";
        this.logger.getLogger().debug("checking if server entry is not there");
        if (!(Util.isEmpty(serverEntry))) {
            this.logger.getLogger().debug("Inside condition: server logger is not there");
            urlPrefix = serverEntry.trim();
        }
        this.logger.getLogger().info("exiting: getServerUrlPrefix");
        return urlPrefix;
    }

    /*
    * Returns the service url
    * @param service Definition
    * @return the complete service url
    */
    constructServiceUrl(serviceDefinition, serverUrl) {
        this.logger.getLogger().info("entering: constructServiceUrl");
        this.logger.getLogger().info("entering constructServiceUrl with service definition: " + serviceDefinition + " and server URL: " + serverUrl);
        let serviceUrl = "";
        this.logger.getLogger().debug("checking condition service definition or serverurl is empty");
        if (!(Util.isEmpty(serviceDefinition)) && !(Util.isEmpty(serverUrl))) {
            this.logger.getLogger().debug("inside condition: service definition or serverurl is empty");
            serviceUrl = serverUrl + serviceDefinition.online.serviceURL;
        }
        this.logger.getLogger().info("exiting: constructServiceUrl");
        return serviceUrl.trim();
    }


    getDemoModeValue() {
        return this.backendConfig['demoDb'];
    }

    getDemoDBStoreList() {
        return ["getLoginDetails", "updateCustomerInfo", "createNewCustomer", "uploadImages", "updateRentalDetails", "searchCustomer", "getLogoutDetails", "blockItem", "retriveRentalImages", "trailerType", "currentRentals", "getItemStatus", "inspectionQuestions", "updateInspectionQuestions", "getTermsAndConditions", "getStoreInfo", "getAgreementNumber", "extendItemRental", "retrieveRentDuration","getStoreTiming", "updateReturnDetails", "cancelRentReturn"];

    }
}