import ralmService from '../services/realmDBService';
import { ServiceConfig } from '../config/ServiceConfig';
let response = [];
let Devices = [];
let devicesList = {};

class realmHandler {

    //***constructor for realmHandler****//
    constructor() {
        this.serviceConfig = new ServiceConfig()
    }


    //***Handler for object/array creation***//
    realmHandler(serviceName, result, serviceData) {
        Devices = [];
        response = [];
        devicesList = {};
        let serviceConfig = new ServiceConfig();
        let initalLoadConfig = serviceConfig.getDemoDBStoreList();

        console.log("DEVICE_isArray>>", Devices);
        console.log("DEVICE_isArray1>>", JSON.stringify(result));
        if (serviceData[0].isArray  ===  "null") {
              console.log("serviceData[0].isArray >>",result[0]);
              devicesList = result[0];
        } else {

            //if (serviceData[0].isArray == true) {
            for (i = 0; i < result.length; i++) {
                console.log("DEVICE_isArray2>>", result[i]);
                Devices.push(result[i]);
                console.log("DEVICE_is>>", Devices);
                devicesList[serviceData[0].handleName] = Devices;
                console.log("devicesListiff>", JSON.stringify(devicesList));

                if (serviceData[0].isArray == false) {
                    var someString = JSON.stringify(devicesList);

                    var i = someString.indexOf('[');
                    var partOne = someString.slice(0, i).trim();
                    var partTwo = someString.slice(i + 1, someString.length).trim();
                    someString = partOne + partTwo;

                    var i = someString.indexOf(']');
                    var partOne = someString.slice(0, i).trim();
                    var partTwo = someString.slice(i + 1, someString.length).trim();
                    someString = partOne + partTwo;

                    devicesList = JSON.parse(someString);


                }

            }
        }

        // } 
    }
    //***getting and passing data***//
    async realmDataParser(serviceInfo, serviceName) {
        console.log("realmDataParser>>", JSON.stringify(serviceInfo));
        try {
            await ralmService.retriveAllData(serviceInfo).then(function (result) {
                console.log("serviceInfoInsideHnadler>>", JSON.stringify(serviceInfo));
                console.log("loadInitialData : retrive all handler" + JSON.stringify(result));
                realmHandlerObj.realmHandler(serviceName, result, serviceInfo);
                //ralmService.closeSchema();
            },
                function (err) {
                    console.log("retriveData failed with error handler " + err);
                });

        } catch (e) {
            console.log("exception handler>>>", e);
        }

        console.log("loadInitialData : retrive all handler deviceList" + JSON.stringify(devicesList));

        return new Promise(function (resolve, reject) {
            if (devicesList != undefined) {
                console.log("ending_devicelist>>", devicesList);
                if(serviceInfo[0].objectArray != "null"){
                    console.log("objectArray_notNull",serviceInfo[0].objectArray);
                    //[{},{}]//servicecong
                    //deviceList --realm res ---- {[]}
                    //array iterate servicevon
                    //object ka value
                  
                }
                resolve(devicesList);
            } else {
                reject("fail");
            }
        });
    }
}


const realmHandlerObj = new realmHandler();
export default realmHandlerObj;
