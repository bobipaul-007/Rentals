import axios from "axios";
//import { AppConstants } from "../constants/AppConstants";

//import { JsLoggerService } from "./jsLoggerService";
//import { UtilError } from "../utils/UtilError";
const Realm = require("realm");
let globalRealm;
let retrive_data;

const databaseOptions = {
  path: Realm.defaultPath,
  schema: [],
  schemaVersion: 0
};

class realmDBService {
  constructor() {
    this.state = {
      realm: null
    };
  }

  componentWillMount() {
    // let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
    // while (nextSchemaIndex < databaseOptions.schema.length) {
    //  const migratedRealm = new Realm(databaseOptions.schema[nextSchemaIndex++]);
    //   migratedRealm.close();
    //  }
    Realm.open(databaseOptions).then(globalRealm => {

    });
  }


  //put all the information in the RealmDb
  put(serviceInfo) {
    console.log("entering:put:realm:service  Put :", JSON.stringify(serviceInfo));

    return new Promise(function (resolve, reject) {
      for (i = 0; i < serviceInfo.length; i++) {
        console.log("serviceInfo[i].storeName.length>>", serviceInfo[i].serviceData);
        try {
          globalRealm.write(() => {
            if (serviceInfo[i].serviceData.length != undefined) {
              for (j = 0; j < serviceInfo[i].serviceData.length; j++) {

                try {
                  console.log("serviceInfo[i].storeNameif>>", serviceInfo[i].storeName);
                  console.log("serviceInfo[i].serviceData[j]>>>", serviceInfo[i].serviceData[j]);
                  globalRealm.create(serviceInfo[i].storeName, serviceInfo[i].serviceData[j]);
                } catch (err) {
                  console.log("Entering realmDB:put create error:" + err);
                  reject(err);
                }
              }

            } else {

              try {
                console.log("serviceInfo[i].storeNameelse>>", serviceInfo[i].storeName);
                globalRealm.create(serviceInfo[i].storeName, serviceInfo[i].serviceData);
              } catch (err) {
                console.log("Entering realmDB:put create error:" + err);
                reject(err);
              }

            }

          });
          console.log(
            "deviceLocator_daggerres>>",
            JSON.stringify(globalRealm.objects(serviceInfo[i].storeName))
          );
        } catch (err) {
          console.log("Entering realmDB:put write error :" + JSON.stringify(err));
          reject(err);
        }
      }
      resolve("success");
    });

  }


  //close realm db
  closeSchema() {
    console.log("close:realm:service");
    try {
      globalRealm.close();
    } catch (err) {
      console.log("closing realm error :" + JSON.stringify(err));
    }

  }

  // open realmDb with schma initialisation 
  openSchema(serviceInfo) {
    console.log("openSchema_length>>", serviceInfo.length);
    return new Promise(function (resolve, reject) {
      try {
        for (i = 0; i < serviceInfo.length; i++) {
          console.log("openSchmea_dbname>>", serviceInfo[i].dbName);
          databaseOptions.schema.push(serviceInfo[i].dbName);
        }
        globalRealm = new Realm(databaseOptions);
        Realm.open(databaseOptions).then(globalRealm => {

        })
        console.log("databaseOptions::", databaseOptions);


      } catch (err) {
        console.log("Entering realmDB:openSchema error :", JSON.stringify(err));
        reject(err);
      }
      resolve("success");
    });
  }


  //delete data from realm db
  deleteAll(serviceInfo) {
    console.log("deleteAll:pouch:service");
    return new Promise(function (resolve, reject) {
      for (i = 0; i < serviceInfo.length; i++) {

        try {
          globalRealm.write(() => {
            try {
              globalRealm.delete(globalRealm.objects(serviceInfo[i].storeName));

            } catch (err) {
              console.log("Entering realmDB:deleteAll error :" + JSON.stringify(err));
              reject("error");
            }
          });
          // });
        } catch (err) {
          console.log("Entering realmDB:deleteAll write error :" + JSON.stringify(err));
          reject(err);

        }
      }
      resolve("success");
    });
  }


  //retrive all the information from the RealmDb
  retriveAllData(serviceInfo) {
    console.log("retrive:realm:service", JSON.stringify(serviceInfo));
    return new Promise(function (resolve, reject) {
      for (i = 0; i < serviceInfo.length; i++) {
        try {
          console.log(">>>>service>>>>", serviceInfo[i].storeName);
          resolve(globalRealm.objects(serviceInfo[i].storeName));
          //resolve("success");
          console.log("WhileRetriving>>", JSON.stringify(globalRealm.objects(serviceInfo[i].storeName)));
        } catch (err) {
          console.log("Entering realmDB:retriveAllData error :" + JSON.stringify(err));
          reject(err);
        }

      }
    });
  }


  /**
     * Gets the JSON
     * @param jsonURL
     */
  getJSON(jsonURL) {
    console.log("entering:getJSON:pouch:service jsonURL " + jsonURL);
    return axios({
      method: 'get',
      url: "../assets/data/deviceLocator/GetDeviceApi.json",
      responseType: 'json'
    })
      .then(response => this.extractData(response))
      .catch(error => {
        console.log("getJSON:pouch:service jsonURL " + jsonURL + " error " + error);
        //return this.handleError(error, this);
      });
  }

  /**
   * Extract the response and return the json
   * @param response
   */
  extractData(response) {
    console.log("entering:extractData:pouch:service response " + JSON.stringify(response));
    if (response.status === 204) {
      return undefined;
    } else {
      return response;
    }
  }
}

//   /**
//    * Handle the error and if required enhance it
//    * @param error and this
//    */
//   handleError(error, that) {
//       this.logger.getLogger().info("entering:handleError:pouch:service");
//       let errEnhanced;
//       if (error instanceof Response) {
//           const body = error.json() || '';
//           const err = body.error || JSON.stringify(body);
//           errEnhanced = `${error.status} - ${error.statusText || ''} ${err}`;
//           that.logger.getLogger().info("errMsg is " + JSON.stringify(errEnhanced));
//       } else {
//           let utilError=new UtilError();
//           let genericError = "SYS- - - -" + error.response.status;
//           let errMsg = [{"errorCode":genericError,"errorDescription": error.response.statusText}];
//           this.logger.getLogger().info("The error message is as follows:");
//           this.logger.getLogger().trace(errMsg);
//           errEnhanced = utilError.enhanceErrorResponse(errMsg);
//           that.logger.getLogger().info("errEnhanced " + JSON.stringify(errEnhanced));
//       }
//       return errEnhanced;
//   }

const ralmService = new realmDBService();
export default ralmService;
