

import React, { Component } from "react";
import { Provider } from 'react-redux';
import Routes from './src/route/Routes';
import configureStore from "./src/configureStore";
import { JsLoggerService } from "./src/services/jsLoggerService";
import { AppConfig } from "./src/config/AppConfig";
import { Platform,Alert,View,Text,TouchableOpacity  } from "react-native";
import * as platform from "./src/config/TranslationProperties";
import { DeviceInformationService } from "./src/services/deviceInformationService";
import { StorageAsync } from "./src/services/storageAsync";
import {StartUpService} from './src/services/startupService';
import UserInactivity from 'react-native-user-inactivity';
import { commonRequestParams } from "./src/request/commonRequest";
import { actionConstants } from "./src/actions/ActionConstants"
import { Actions } from "react-native-router-flux";
import { AppConstants } from "./src/constants/AppConstants";
import Modal from "react-native-modalbox";
import common from './src/styles/shared/Components.js'
import sessionStyle from './src/styles/shared/sessionPopup.js'
import { Util } from './src/utils/utils';
import * as textLabel from "./src/config/TranslationProperties";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptoken: ""

    };
    this.startupService = new StartUpService();
    this.appConfig = new AppConfig();
    this.jsLogger = this.appConfig.COMMON.LogConfig;
    this.jsLoggerInstance = new JsLoggerService();
    this.deviceInformationService = new DeviceInformationService();
    this.storage = new StorageAsync();
    this.onSessionTimeOut = this.onSessionTimeOut.bind(this);
    this.onTimeout = this.onTimeout.bind(this);
    this.goToLoginScreen = this.goToLoginScreen.bind(this);
    this.cancelRent = this.cancelRent.bind(this);
    this.extendSession = this.extendSession.bind(this);
    this.store = configureStore();   
    this.myTimer = 0;
    this.appVersion = '';
  }

  componentWillMount() {
    this.startupService.initialize();
    this.jsLoggerInstance.initLogger(this.jsLogger);
    this.jsLoggerInstance.getLogger().info("INITIALISING.....");
    this.deviceInformationService.getIpAddress(); 

    const version = this.deviceInformationService.getVersion();
    const build = this.deviceInformationService.getBuildNumber().toString();
    const appVersion = `${version}_${build}`;
    // appData.setApplicationVersion(appVersion);
    this.appVersion = appVersion;
  }

onSessionTimeOut(active) {     
        if (!active) {
           if (this.store.getState().LoginScreenReducer.isloginState) { 
                console.log("Inside Session timeout");
                this.refs.modalView.open();
                this.myTimer = setTimeout(this.onTimeout,this.appConfig.COMMON.HeartBeatConfig._idleTimeoutInterval);
           }
        }  
    }

    onTimeout() {
      this.refs.modalView.close();
      this.goToLoginScreen();
    } 



    goToLoginScreen() {
        clearTimeout(this.myTimer);
        this.refs.modalView.close();
        console.log("Inside goToLoginScreen"); 
        this.cancelRent();

        let headers =  this.store.getState().HeaderParamsReducer.headerParameters;
        console.log("Headers:",headers); 
        params = commonRequestParams(actionConstants.REQUEST_LOGOUT_USER, headers.userId);
        params = {
                    'parameters': params,
                    'headers': headers
                  };
        this.store.dispatch({ type: actionConstants.REQUEST_LOGOUT_USER, params });   
    }

    cancelRent() {      
      let rentalNumber = '';
      if (!Util.isEmpty(this.store.getState().HeaderParamsReducer.appDetails.selectedItem)) { 

          let item = this.store.getState().HeaderParamsReducer.appDetails.selectedItem;

            if (!Util.isEmpty(item.rentalNumber)) {
                rentalNumber = item.rentalNumber;
            }
            else{
              if (!Util.isEmpty(this.store.getState().InspectionReducer.agreementNumber)) {      
                  rentalNumber = this.store.getState().InspectionReducer.agreementNumber.rentalNumber;
              }
            }
      }

      let currentScene = Actions.currentScene;

      if (!Util.isEmpty(rentalNumber) && currentScene != AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU 
          && currentScene != AppConstants.SCREEN_NAMES.RENTAL.TRAILER_TYPE && currentScene != AppConstants.SCREEN_NAMES.COMMON_VIEWS.CURRENT_RENTAL) {

          let headers = {
                "params": this.store.getState().HeaderParamsReducer.headerParameters,
                "urlVariable": { rentalNumber: rentalNumber, action: AppConstants.DEFAULT_CANCEL_ACTION }
            }

          let paramVals = ['']
          let parameters = commonRequestParams(actionConstants.REQUEST_CANCEL_RENT_RETURN, paramVals);
          params = {
                      'parameters': parameters,
                      'headers': headers
                  };
          this.store.dispatch({ type: actionConstants.REQUEST_CANCEL_RENT_RETURN, params });  
       }
      
    }
  
     extendSession() {      
      clearTimeout(this.myTimer);
      this.refs.modalView.close();

       let rentalNumber = '';

        if (!Util.isEmpty(this.store.getState().HeaderParamsReducer.appDetails.selectedItem)) { 

          let item = this.store.getState().HeaderParamsReducer.appDetails.selectedItem;
          
            if (!Util.isEmpty(item.rentalNumber)) {
                rentalNumber = item.rentalNumber;
            }
            else{
              if (!Util.isEmpty(this.store.getState().InspectionReducer.agreementNumber)) {      
                  rentalNumber = this.store.getState().InspectionReducer.agreementNumber.rentalNumber;
              }
            }
      }
      
      let currentScene = Actions.currentScene;
      if (!Util.isEmpty(rentalNumber) && currentScene != AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU 
          && currentScene != AppConstants.SCREEN_NAMES.RENTAL.TRAILER_TYPE && currentScene != AppConstants.SCREEN_NAMES.EXTEND.CURRENT_RENTAL) {

        let headers = {
              "params": this.store.getState().HeaderParamsReducer.headerParameters,
              "urlVariable": { rentalNumber: rentalNumber, action:AppConstants.DEFAULT_EXTEND_SESSION_ACTION }
          }

        let paramVals = ['']
        let parameters = commonRequestParams(actionConstants.REQUEST_CANCEL_RENT_RETURN, paramVals);
        params = {
                    'parameters': parameters,
                    'headers': headers
                };
        this.store.dispatch({ type: actionConstants.REQUEST_CANCEL_RENT_RETURN, params });  
      }
      
    }


  renderModalContent = () => (
    <View style={sessionStyle.modalContent}>
      <Text> {textLabel.messages.sessionTimeout} </Text>

      <View style={common.contentSectionView} >
        <TouchableOpacity onPress={() => this.goToLoginScreen() }>
          <View style = {common.satisfactoryButton} >
          <Text >{textLabel.messages.no}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.extendSession() }>
          <View style = {common.satisfactoryButton}>
          <Text >{textLabel.messages.yes}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
);
  

  render() {
    //const store = configureStore();
    let appValues = {
      "applicationVersion": this.appVersion // this.props.data.applicationVersion
    };   
    
    return (
      <UserInactivity store = {this.store} timeForInactivity = {this.appConfig.COMMON.HeartBeatConfig.idleTimeoutInterval} onAction = {this.onSessionTimeOut}>        
        <Provider store = {this.store}>
          <Routes appValues={appValues} />
          <Modal style = {sessionStyle.modalContent}  position = {"center"} ref = {"modalView"}>
              { this.renderModalContent() }
          </Modal>          
        </Provider>
      </UserInactivity>
    );
  }
}


