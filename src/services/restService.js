import axios from 'axios';
import { Util } from '../utils/utils.js';
import { AppConstants } from '../constants/AppConstants.js';

import { ServiceConfig } from '../config/ServiceConfig.js';
import { JsLoggerService } from "./jsLoggerService";
import { StorageAsync } from './storageAsync';
import { environment } from '../config/environment';
let g = "";

export class RESTService {
    constructor() {
        this.logger = new JsLoggerService();
        this.serviceConfig = new ServiceConfig();
        this.storage = new StorageAsync();
    }
    serviceGET(serviceDef, parameters, headerParam) {
        this.logger.getLogger().info("entering:serviceGET:rest-service");
        this.logger.getLogger().info("entering:serviceDef " + JSON.stringify(serviceDef) + " parameters " + JSON.stringify(parameters) + "HEADER::" + headerParam)
        return this.invokeRESTApi(serviceDef, AppConstants.HTTP_Methods.API_GET, parameters, headerParam);
    }


    servicePOST(serviceDef, parameters, headerParam) {
        this.logger.getLogger().info("entering:servicePOST:rest-service");
        this.logger.getLogger().info("entering:serviceDef " + JSON.stringify(serviceDef) + " parameters " + JSON.stringify(parameters) 
        + "HEADER_POST::" + JSON.stringify(headerParam))
        return this.invokeRESTApi(serviceDef, AppConstants.HTTP_Methods.API_POST, parameters, headerParam);
    }

    serviceDELETE(serviceDef, parameters, headerParam) {
        this.logger.getLogger().info("entering:serviceDELETE:rest-service");
        this.logger.getLogger().info("entering:serviceDef " + JSON.stringify(serviceDef) + " parameters " + parameters)
        return this.invokeRESTApi(serviceDef, AppConstants.HTTP_Methods.API_DELETE, parameters, headerParam);
    }





    /**
     * Return the url string based on input
     * @param {requestedMethod} requestedMethod
     * @param {url} urlString
     * @param {urlParameters} inputParameter
     * @returns url
     */
    insertVariableInURL(url, variableName) {
        console.log("url name is: ", url);
        let urlVal = String(url).substring(String(url).indexOf("{") + 1);
        urlVal = urlVal.substring(0, urlVal.indexOf("}") + 1);
        console.log("Variable name is: ", variableName);
        url = url.replace("{" + urlVal, variableName[urlVal.substring(0, urlVal.length - 1)]);
        console.log("URLA: ", url);
        return url;
    }
    createURL(requestedMethod, url, urlParameters, urlVariable) {
        console.log("VARIABLE NAME: ", urlVariable);
        this.logger.getLogger().info("entering:createURL:rest-service:service");
        this.logger.getLogger().info("METHOD is " + requestedMethod + " URL is " + url
            + " URL Parameters are " + JSON.stringify(urlParameters));


        let numberOfVariables = Number(String(url).split("{").length) - 1;
        for (let i = 0; i < numberOfVariables; i++) {
            console.log("i is: " + i);
            url = this.insertVariableInURL(url, urlVariable);
        }

        console.log("url>>>", url);
        let urlParameter;

        if (((requestedMethod === "GET")) && ((urlParameters != undefined) && !Util.isEmpty(urlParameters))) {
            this.logger.getLogger().debug("The requested Method is GET and parameters are not empty");
            if (!Util.isEmpty(urlParameters)) {
                urlParameter = Object.keys(urlParameters).map((i) => i + '=' + urlParameters[i]).join('&')
                // var splitUrlParameter = urlParameter.split("&");
                // urlParameter = splitUrlParameter[1]

            }
            let encodedUrlParameter = encodeURIComponent(urlParameter);
            console.log("The URL with params is " + url + "?" + urlParameter);
            return url + "?" + urlParameter;

        } else {
            this.logger.getLogger().info("The URL " + url);
            return url;
        }
    }


    //     /**
    //      * Return the url string based on input
    //      * @param {requestedMethod} requestedMethod
    //      * @param {url} urlString
    //      * @param {urlParameters} inputParameter
    //      * @returns url
    //      */

    async invokeRESTApi(serviceDef, httpVerb, parameters, headerParam) {
        this.logger.getLogger().info("entering invokeRESTApi");
        this.logger.getLogger().info("entering invokeRESTApi with service defination: " + serviceDef + " http: " + httpVerb + " parameters: " + parameters + " and header parameters: " + JSON.stringify(headerParam));
        console.log("HERE: URL PARAMS: ", parameters);
        let urlParam = parameters;
        let requestedMethod;
        this.logger.getLogger().debug("Checking the request method");
        switch (httpVerb) {
            case AppConstants.HTTP_Methods.API_GET:
                this.logger.getLogger().debug("requestmethod GET");
                requestedMethod = AppConstants.HTTP_Methods.API_GET;
                break;
            case AppConstants.HTTP_Methods.API_POST:
                this.logger.getLogger().debug("requestmethod POST");
                requestedMethod = AppConstants.HTTP_Methods.API_POST;
                break;
            case AppConstants.HTTP_Methods.API_DELETE:
                this.logger.getLogger().debug("requestmethod DELETE");
                requestedMethod = AppConstants.HTTP_Methods.API_DELETE;
                break;
            case AppConstants.HTTP_Methods.API_PUT:
                this.logger.getLogger().debug("requestmethod PUT");
                requestedMethod = AppConstants.HTTP_Methods.API_PUT;
                break;
            default:
                this.logger.getLogger().debug("requestmethod default");
                requestedMethod = AppConstants.HTTP_Methods.API_GET;
        }
        this.logger.getLogger().info("Requested method is " + requestedMethod);
        this.logger.getLogger().info("URL Parameters are " + urlParam);
        let requestBody = (httpVerb !== AppConstants.HTTP_Methods.API_GET) ? urlParam : null;

        this.retryCount++;
        let urlPath = "";



        if (serviceDef.serviceFlag === AppConstants.BASE_URLS.BASE_URL1) {

            urlPath = environment.storeBaseUrl + serviceDef.online.serviceURL
            const data = await this.storage.retrieveItem("storeName");
            var str = urlPath;
            str = str.replace("storeName", Util.getStoreName(data));
           // str = str.replace("storeName","t0525srvr");
            urlPath = str;
            console.log("pathh", urlPath);
        }
        else if (serviceDef.serviceFlag === AppConstants.BASE_URLS.BASE_URL2) {

            urlPath = environment.centerBaseURL + serviceDef.online.serviceURL

        } else {
            urlPath = environment.getStoreInfoBaseURL + serviceDef.online.serviceURL
        }

        console.log("headerParam>>>", requestedMethod);
        console.log("headerParam1>>>", requestBody);
        console.log("headerParam2>>>", this.createURL(requestedMethod, urlPath, urlParam, headerParam.urlVariable));
        console.log("headerParam3>>>", headerParam.params);
        console.log("headerParam 4>>>", this.serviceConfig.backendConfig.serviceDefaults["withCredentials"]);
        return axios({
            method: requestedMethod,
            url: this.createURL(requestedMethod, urlPath, urlParam, headerParam.urlVariable),
            data: requestBody,
            headers: headerParam.params,
            withCredentials: this.serviceConfig.backendConfig.serviceDefaults["withCredentials"],
        })
            .then((response) => {

                  return Promise.resolve(response.data);

            })
            .catch((error) => {
                console.log("headerPAram5>>>>", error);
                //this.logger.getLogger().error("entering:invokeRESTApi : error block " + error);
                this.errorEnhancer(error.response, serviceDef, httpVerb, parameters);
                if (!Util.isEmpty(error.response)) {
                    this.errorEnhancer(error.response, serviceDef, httpVerb, parameters);
                    console.log("restERROR>>>", error.response);
                } else {
                    //this.logger.getLogger().error("Network Error");
                }
                console.log("Testing1>>");
                return Promise.reject(error);
            })
    }

    async constructLoginUrl(urlPath) {
        consol.log("Inside construct");
        const data = await this.storage.retrieveItem("storeName");//use from header
        var str = urlPath;
        str = str.replace("storeName", data);
        urlPath = str;
        console.log("newUrl1", str);
        console.log("newUrl", urlPath);
        return urlPath;
    }

    errorEnhancer(error, serviceDef, httpVerb, parameters) {
        //this.logger.getLogger().error("entering:errorEnhancer:rest-service:entering");
        let isRetryRequired = false;
        let errEnhanced = null;
        if (error) {
            let genericErr = "SYS - - - " + error.status;
            let errMessage = [{ "errorCode": genericErr, "errorMessage": error.statusText }];
            //this.logger.getLogger().error("The error message is as follows:");
            this.logger.getLogger().trace(errMessage);

            if ((isRetryRequired) && this.retryCount < 3) {
                this.invokeRESTApi(serviceDef, httpVerb, parameters);
            }
            else {
                //this.logger.getLogger().error("The enhanced error is:");
                this.logger.getLogger().trace(error);

            }
        }
        else {
            //this.logger.getLogger().error("The error enhanced is:" + error);
        }
        return errEnhanced;
    }
}



