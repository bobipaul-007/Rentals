import { ServiceConfig } from '../config/ServiceConfig.js';
import { AppConfig } from '../config/AppConfig.js';
import { RESTService } from './restService.js';
import { environment } from '../config/environment.js';
import { AppConstants } from '../constants/AppConstants.js';
import { JsLoggerService } from "./jsLoggerService";
import { Util } from '../utils/utils.js';
import ralmService from './realmDBService';
import realmHandlerObj from '../handler/realmHandler';
import addressDetails from '../assets/data/rental/LocationDetails/zip.json'
var stateDetails = [];


export class ProviderService {
    constructor() {
        this.logger = new JsLoggerService();
        this.serviceConfig = new ServiceConfig();
        this.createRequestHeaders = this.createRequestHeaders.bind(this);
    }

    /**
     * Return the Header based on Service Defn
     * @param {string} serviceName
     * @returns headers
     */
    createRequestHeaders(headerParam) {
        this.logger.getLogger().info("entering:createRequestHeaders");
        console.log("createRequestHeaders called with params: ", headerParam);
        let headers;
        let defaultAppState = this.serviceConfig.backendConfig.serviceDefaults.defaultApplicationHeader;
        this.logger.getLogger().debug("checking whether the header parameters are empty or not");
        if (Util.isEmpty(headerParam)) {
            this.logger.getLogger().debug("inside condition: header parameters are empty");
            headers = defaultAppState;
        }
        else {
            this.logger.getLogger().debug("inside condition: header parameters are not empty");
            //headers = Object.assign(defaultAppState, headerParam);
            //=====
            headers = Object.assign(defaultAppState, headerParam.params);
            console.log("ELseHEEDER",headers ,headerParam.params);
            //=====
        }
        // //=====
        headers = {
            "params": headers,
            "urlVariable": headerParam.urlVariable
        }
        // //====
        this.logger.getLogger().info("exiting:createRequestHeaders");
        return headers;
    }

    async invokeProvider(serviceName, request, headerValues) {
        this.logger.getLogger().info("entering:invokeProvider:provider:service");
        this.logger.getLogger().info("Invoke provider invoked with service ID : " + serviceName + " request : " + request);
        let serviceconfig = new ServiceConfig();
        let appConfig = new AppConfig();
        let appConfiguration = appConfig.environmentConfiguration(environment.name);
        this.setAppConfig(appConfiguration);
        let serviceDef = serviceconfig.getServiceDefinition(serviceName, this.appConfig);

        let restService = new RESTService();
        let headerParam = headerValues;
        //need to check
        if (Util.isEmpty(headerValues) || typeof headerValues === "undefined") {
            this.logger.getLogger().debug("inside condition: header values are empty");
            headerParam = "";
        }
        this.logger.getLogger().debug("creating headers:11 ", headerParam);
        let headers = this.createRequestHeaders(headerParam);
        console.log("NEWHEADER",headers);
        let requestType = serviceconfig.backendConfig.serviceDefinitions[serviceName].httpMethod;
        this.logger.getLogger().debug("Checking request type");

        let devicesList;
        let isInDemoMode = serviceconfig.getDemoModeValue();

        console.log("isInDemoMode>>>", isInDemoMode);

        if (isInDemoMode) {
            //realm code start ****************
            let serviceInfo = [];
            let obj = {};
            let storeNameInvokeProvider = serviceDef['demo']['storeName'];
            let dbNameInvokeProvider = serviceDef["demo"]["DBName"];
            let isArrayInvokeProvider = serviceDef['demo']['isArray'];
            let handleNameInvokeProvider = serviceDef["demo"]["handleName"];
            let objectArrayInvokeProvider = serviceDef["demo"]["objectArray"];

            obj["storeName"] = storeNameInvokeProvider;
            obj["dbName"] = dbNameInvokeProvider;
            obj["isArray"] = isArrayInvokeProvider;
            obj["handleName"] = handleNameInvokeProvider;
            obj["objectArray"] = objectArrayInvokeProvider;


            serviceInfo.push(obj);
            console.log("serviceinfoinsideInvoke>>", JSON.stringify(serviceInfo));

            if (serviceInfo[0].storeName != undefined) {
                try {
                    await realmHandlerObj.realmDataParser(serviceInfo, serviceName).then(function (result) {
                        console.log("loadInitialData : retrive all successful with result as11 " + JSON.stringify(result));
                        if (serviceName == "inspectionQuestions" || serviceName == "getItemStatus" || serviceName == "retrieveRentDuration" || serviceName == "searchCustomer") {
                            console.log("AA GYAAA: ", result);
                            result = JSON.parse(result.response[0].response);

                        }

                        if (serviceName == "getTermsAndConditions") {
                            console.log("Yoaoao: ", result.response.response);
                            result = JSON.parse(result.response.response);
                        }
                        devicesList = result;
                        console.log("deviceList inner>>", devicesList);

                    },
                        function (err) {
                            console.log("retriveData failed with error " + err);
                        });

                } catch (e) {
                    console.log("exception>>>", e);
                }

            }
            return devicesList;

            //realm code end ****************

        } else {

            console.log("SERVICEDEF!: ", serviceDef);
            console.log("REQUEST!", request);
            console.log("HEADERS!", headers);
            //API call if demodb flag is 'false' ****************
            if (requestType.toUpperCase() === AppConstants.HTTP_Methods.API_GET) {
                this.logger.getLogger().debug("inside condition: request is GET");

                return restService.serviceGET(serviceDef, request, headers);
            } else if (requestType.toUpperCase() === AppConstants.HTTP_Methods.API_POST) {

                this.logger.getLogger().debug("inside condition: request is POST");
                return restService.servicePOST(serviceDef, request, headers);
            } else if (requestType.toUpperCase() === AppConstants.HTTP_Methods.API_DELETE) {

                this.logger.getLogger().debug("inside condition: request is DELETE");
                return restService.serviceDELETE(serviceDef, request, headers);
            }
            this.logger.getLogger().info("exiting:invokeProvider:provider:service");
        }
    }

    loadInitialData() {
        const that = this
        let serviceInfo = []; // this array will have reference to service url and storename for all offline services
        let serviceConfig = new ServiceConfig();
        let initalLoadConfig = serviceConfig.getDemoDBStoreList();

        for (let i = 0; i < initalLoadConfig.length; i++) {
            console.log("initalLoadConfig>>", initalLoadConfig);
            let serviceDef = serviceConfig.getServiceDefinition(initalLoadConfig[i], that.appConfig);
            console.log("serviceDef>>", serviceDef);
            let serviceData = serviceDef["demo"]["serviceData"];
            let storeName = serviceDef["demo"]["storeName"];
            let dbName = serviceDef["demo"]["DBName"];
            let objectArray = serviceDef["demo"]["objectArray"];
            console.log("serviceInfo1>>", JSON.stringify(serviceData));
            console.log("storeName1>>", storeName);
            console.log("dbName1>>", dbName);
            console.log("objectArray>>", objectArray);
            let obj = {};
            obj["serviceData"] = serviceData;
            obj["storeName"] = storeName;
            obj["dbName"] = dbName;
            obj["objectArray"] = objectArray;
            console.log("obj>>>", obj);
            console.log("NAMA: ", obj["dbName"].name);
            if (obj["dbName"].name == "InspectionQuestionsDB" || obj["dbName"].name == "StoreTimingDB" || obj["dbName"].name == "ItemStatusDB" || obj["dbName"].name == "TermsAndConditionsDB" || obj["dbName"].name == "RetrieveRentDurationDB" || obj["dbName"].name == "SearchCustomerDB") {
                console.log("OBJECT_IS1: ", obj);
                obj["serviceData"] = { response: JSON.stringify(serviceData) }
                console.log("OBJECT_IS: " + typeof (obj["serviceData"].response));
            }
            serviceInfo.push(obj);
            console.log("serviceInfo>>", serviceInfo);
            console.log("storeName>>", obj["storeName"]);
            console.log("dbName>>", obj["dbName"]);


        }

        console.log("serviceInfo---->>", serviceInfo);
        // ralmService.openSchema(serviceInfo);
        ralmService.openSchema(serviceInfo).then(function (result) {
            console.log("loadInitialData :Open realm schema successfully with result " + result);

            if (result == "success") {

                ralmService.deleteAll(serviceInfo).then(function (result) {

                    console.log("loadInitialData : delete all successful with result as " + result);
                    if (result == "success") {
                        console.log("serviceinfowhileput>>", JSON.stringify(serviceInfo));
                        ralmService.put(serviceInfo).then(function (result) {
                            console.log("loadInitialData : delete all successful with result as ", JSON.stringify(result));
                            if (result == "success") {
                                console.log("serviceinfowhileretirve>>", JSON.stringify(serviceInfo));
                                ralmService.retriveAllData(serviceInfo).then(function (result) {
                                    console.log("loadInitialData : retrive all successful with result as ", JSON.stringify(result));
                                    console.log("result_retriveAllData>>>", result);
                                    // if (result == "success") {
                                    //  ralmService.closeSchema();
                                    //}
                                },
                                    function (err) {
                                        console.log("retriveData failed with error " + err);
                                    });
                            }
                        },
                            function (err) {
                                console.log("put failed with error " + err);
                            });
                    }
                },
                    function (err) {
                        console.log("delete failed with error " + err);
                    });

            }
        },
            function (err) {
                console.log("openSchema failed with error " + err);
            });


    }

    getAddressdetails() {
        for (var i = 0; i < addressDetails.length; i++) {
            var state = { value: addressDetails[i].state }
            stateDetails.push(state);
        }

        for (var i = 0; i < stateDetails.length; i++) {
            // var state = { value: stateDetails[i] }
            console.log("state--->>", stateDetails[i]);
        }
    }



    setAppConfig(appConfig) {
        this.logger.getLogger().info("inside: setAppConfig");
        this.logger.getLogger().info("invoking setAppConfig with appConfig as : " + appConfig);
        this.appConfig = appConfig;
    }
}


