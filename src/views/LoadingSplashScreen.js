

import React, { Component } from 'react';
import { JsLoggerService } from '../services/jsLoggerService';
import { StorageAsync } from '../services/storageAsync';
import { View, Text, ActivityIndicator} from 'react-native';
import { connect } from "react-redux";
import styles from '../styles/shared/activityIndicator';
import { commonRequestParams } from "../request/commonRequest";
import * as textLabel from "../config/TranslationProperties";
import * as appColors from "../styles/shared/appColors.js";
import { actionConstants } from "../actions/ActionConstants";
import { Util } from '../utils/utils';
import { Actions } from 'react-native-router-flux';
import { AppConstants } from '../constants/AppConstants';
import { DeviceInformationService } from "../services/deviceInformationService";

class LoadingSplashScreen extends Component {
    constructor(props) {
        super(props);
        this.logger = new JsLoggerService();
        this.storage = new StorageAsync();
        this.deviceInformationService = new DeviceInformationService();
        this.nextButtonClicked = false;
        this.storeValue = false;
        this.checkAsyncStorage = this.checkAsyncStorage.bind(this);
        this.sendStoreAPI = this.sendStoreAPI.bind(this);
        this.goToMainMenu = this.goToMainMenu.bind(this);
        this.hasNavigated = false;
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
        this.calledIpAddress = false;
        this.isHeaderParams = true;
        this.state = {
            status: false,
            store_number: '',
            store_name: '',
            loaderText: '',
            val: '',
            loaderStatus: false,
            loaderLabelName: [textLabel.messages.loadingSplash],
            loaderIsLoading: false,
        }

    }

    //-----****  checkAsyncStorage called to get the IPAddress of the device  //-----****
    checkAsyncStorage(key) {
        this.logger.getLogger().info("entering:LoadingSplashScreen: checkAsyncStorage");
        let ip;
        this.storage.retrieveItem(key).then((valueRecieved) => {
            if (key === textLabel.messages.ipAddress) {

                ip = valueRecieved;
                this.logger.getLogger().debug("entering: LoadingSplashScreen::IPaddress", ip);
                if (Util.isEmpty(ip)) {
                    this.logger.getLogger().info("entering: LoadingSplashScreen: Ipaddress is empty");
                    this.logger.getLogger().debug("entering: LoadingSplashScreen: Ipvalue with value: " + ip);
                }
                else if (this.calledIpAddress === false) {
                    console.log("getIp");
                    this.props.getIpAddress(ip);
                    this.calledIpAddress = true;
                    this.logger.getLogger().debug("exiting: LoadingSplashScreen: Ipvalue with value: " + ip);
                }
            }
        }).done();
        this.logger.getLogger().info("exiting:LoadingSplashScreen: checkAsyncStorage");
    }

    //-----****  showLoader method to activate the loader  //-----****
    showLoader = () => {
        this.logger.getLogger().info("entering:LoadingSplashScreen:: showLoader");
        this.setState({
            loaderText: this.state.loaderText,
            loaderStatus: this.state.loaderStatus,
            loaderLabelName: this.state.loaderLabelName,
            loaderIsLoading: true
        });
        this.logger.getLogger().info("exiting::LoadingSplashScreen:showLoader");
    };

    //-----****  hideLoader method to de-activate the loader  //-----****
    hideLoader = () => {
        this.logger.getLogger().info("entering:LoadingSplashScreen:hideLoader");
        this.setState({
            loaderText: this.state.loaderText,
            loaderStatus: this.state.loaderStatus,
            loaderLabelName: this.state.loaderLabelName,
            loaderIsLoading: false
        });
        this.logger.getLogger().info("exiting::LoadingSplashScreen:hideLoader");
    };

    //-----****  renderLoader method to show the loader  //-----****
    renderLoader() {
        this.logger.getLogger().info("entering:LoadingSplashScreen: renderLoader");
        if (this.state.isLoading) {
            this.logger.getLogger().info(":LoadingSplashScreen: renderLoader: isLoading condition true");
            Keyboard.dismiss();
            return (<Spinner animating={this.state.isLoading} />);
        }
        this.logger.getLogger().info("exiting::LoadingSplashScreen: renderLoader");
    }
    //-----****  goToMainMenu method to navigate to the Main menu ****-----//
    goToMainMenu() {

        this.logger.getLogger().info("entering:LoadingSplashScreen: goToMainMenu");
        if (this.hasNavigated === false) {
            this.hasNavigated = true;
            this.logger.getLogger().info("entering:LoadingSplashScreen: Call to LoginScreen");
            (Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.LOGIN_SCREEN));
            //  Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.INSPECTION, ({ flow: 'rentalFlow', selectedItem : "2001" }));
        }
        this.logger.getLogger().info("exiting:LoadingSplashScreen: goToMainMenu");
    }


    shouldComponentUpdate(nextProps) {
        this.logger.getLogger().info("entering:LoadingSplashScreen: shouldComponentUpdate");
        this.nextButtonClicked = true;

        if (nextProps.storeInf.storeValueFlag != '') {
            console.log("storename::::::", nextProps.storeInf.storeValueFlag, nextProps.storeInf.storeInfo.response.storeNo, nextProps.storeInf.storeInfo.response.storeName);
            this.storage.storeItem("storeFlag", nextProps.storeInf.storeValueFlag);
            this.storage.storeItem("storeNo", nextProps.storeInf.storeInfo.response.storeNo);
            this.storage.storeItem("storeName", nextProps.storeInf.storeInfo.response.storeName);
            this.storage.storeItem("storeType", nextProps.storeInf.storeInfo.response.storeType);
        }

        console.log("shouldComponentUpdate>>>>");
        // this.checkAsyncStorage("ipAddress");
        // return true;

    }


    componentWillReceiveProps(nextProps) {
        this.logger.getLogger().info("entering:LoadingSplashScreen: componentWillReceiveProps");
        if (this.nextButtonClicked) {
            this.nextButtonClicked = false;
            if (!Util.isEmpty(nextProps.storeInf.storeInfo.response)) {
                // if ((nextProps.storeInf.storeInfo.response === AppConstants.RESPONSECODE)) {

                if (!Util.isEmpty(nextProps.storeInf.storeInfo.response)) {
                    if (this.isHeaderParams) {
                        // this.storage.retrieveItem('ipAddress').then((Ip) => {
                        // let ipAddress = Util.getIp(Ip);
                        let ipAddress = nextProps.storeInf.ipAddress;
                        this.isHeaderParams = false;
                        let deviceDetails = this.deviceInformationService.getDeviceDetails();
                        let storeNo = nextProps.storeInf.storeInfo.response.storeNo;
                        let storeName = nextProps.storeInf.storeInfo.response.storeName;
                        let storeType = nextProps.storeInf.storeInfo.response.storeType;
                        let channelType = this.deviceInformationService.isTablet() ? AppConstants.DEFAULT_CHANNEL_TYPE_TABLET : AppConstants.DEFAULT_CHANNEL_TYPE_MOBILE;
                        let params = [deviceDetails.deviceName, storeNo, this.props.screenProps.applicationVersion, '', channelType, this.deviceInformationService.getTimezone(), storeName, storeType, ipAddress];
                        this.props.addHeaderParams(params);
                        // }).done();
                    }
                }
                else if (Util.isEmpty(nextProps.storeInf.storeInfo.response)) {
                    this.hideLoader();
                    alert("Something went wrong!!Please try later");
                }
            }
            else if (nextProps.storeInf.isSystemErrorInStoreInfo) {
                this.hideLoader();
                alert(textLabel.messages.errorWentWrong);
            }

            if (nextProps.headerParams.headerParameters) {
                this.hideLoader();
                this.goToMainMenu();
            }
        }
        // else if ((nextProps.storeInf.storeInfo.response !== AppConstants.RESPONSECODE)) {
        //     this.hideLoader();
        //     Alert.alert(
        //         textLabel.messages.noService, textLabel.messages.emptyError,
        //         [
        //             {
        //                 text: textLabel.messages.ok,
        //             },
        //         ],
        //         { cancelable: false },
        //     );
        // }
        // }
        this.logger.getLogger().info("entering:LoginScreen: componentWillReceiveProps");

    }

    componentDidMount() {
        this.logger.getLogger().info("entering: LoadingSplashScreen: componentDidMount");

        this.nextButtonClicked = true;
        this.storage.retrieveItem('storeFlag').then((flag) => {
            console.log("flag_Val", flag);
            if (Util.isEmpty(flag)) {
                this.storage.retrieveItem('storeNumber').then((Ip) => {
                    console.log("ipppp", Ip);
                    if (Util.isEmpty(Ip)) {
                        let that = this;
                        that.checkAsyncStorage("ipAddress");
                        //this.sendStoreAPI();
                    }
                    else {
                        this.logger.getLogger().debug("entering: LoadingSplashScreen: componentDidMount :: IP" + Ip);
                        this.logger.getLogger().debug("entering: LoadingSplashScreen: Ipaddress with value: " + Ip);
                        // that.props.updateStoreNumber(Ip); ask whether required or not
                    }
                    this.sendStoreAPI();
                })

            }
            else if (flag === true) {
                console.log("CMD_Flag", flag);
                console.log("REtrievedValues");
                this.storage.retrieveItem('storeNo').then((storeNo) => {
                    console.log("storeNumber", storeNo);
                    this.storage.retrieveItem('storeName').then((name) => {
                        this.storage.retrieveItem('storeType').then((type) => {
                            this.storage.retrieveItem('ipAddress').then((Ip) => {
                                let ipAddress = Util.getIp(Ip);
                                console.log("editorrr", ipAddress);
                                let deviceDetails = this.deviceInformationService.getDeviceDetails();
                                let channelType = this.deviceInformationService.isTablet() ? AppConstants.DEFAULT_CHANNEL_TYPE_TABLET : AppConstants.DEFAULT_CHANNEL_TYPE_MOBILE;
                                let params = [deviceDetails.deviceName, storeNo, this.props.screenProps.applicationVersion, '', channelType, this.deviceInformationService.getTimezone(), name, type, ipAddress];
                                this.props.addHeaderParams(params);
                            }).done();
                        }).done();
                    }).done();
                }).done();

                this.logger.getLogger().info("exiting: LoadingSplashScreen: componentDidMount");
            }
            this.logger.getLogger().info("exiting: LoadingSplashScreen: componentDidMount");
        })
    }

    //-----****  sendStoreAPI method to send the request param ****-----//
    sendStoreAPI() {
        this.logger.getLogger().info("entering: LoadingSplashScreen:: sendStoreAPI: inputFieldValue with value: ");

        this.logger.getLogger().info("entering: LoadingSplashScreen :: In else condition sendStoreAPI");
        this.isHeaderParams = true;
        this.storage.retrieveItem('ipAddress').then((Ip) => {
            console.log("reducer_ip11", Ip);
            let headerParams = this.props.headerParams.headerParameters;
            let ipAddress = Util.getIp(Ip);
            let rentalParams = [ipAddress];
            this.props.storeInformation(rentalParams, headerParams, );
        }).done();
        this.logger.getLogger().debug("exiting: LoadingSplashScreen:: sendStoreAPI");
    }

    //-----****  render method to show items on the screen ****-----//
    render() {
        this.logger.getLogger().debug("entering: LoadingSplashScreen: render");
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color={appColors.colors.$defaultHeaderBackground} />
            </View >
        )
    }
}

//-----****  mapDispatchToProps to call API for the screen ****-----//
const mapDispatchToProps = (dispatch) => {
    let logger = new JsLoggerService();
    logger.getLogger().info("entering: LoadingSplashScreen: mapDispatchToProps");
    return {
        //-----**** getIpAddress to get the 3 octets of IPaddress ****-----//

        getIpAddress(number) {
            let ipAddress = Util.getIp(number);
            let idParams = [ipAddress];
            let params = commonRequestParams(actionConstants.REQUEST_IP, idParams);
            console.log("checkIPP", params);
            dispatch({ type: actionConstants.REQUEST_IP, params });
        },
        //-----**** updateStoreNumber to update the storeID ****-----//
        updateStoreNumber(number) {
            let idParams = [number];
            let params = commonRequestParams(actionConstants.UPDATE_STORE_ID, idParams);
            params = {
                'parameters': params,
                'headers': ""
            };
            dispatch({ type: actionConstants.UPDATE_STORE_ID, params });
        },
        //-----****  storeInformation method to retrieve store info ****-----//
        storeInformation(rentalParams, header) {
            let idparam = rentalParams;
            params = commonRequestParams(actionConstants.REQUEST_RETRIEVE_STORE_INFO, idparam);
            params = {
                'parameters': params,
                'headers': header
            };
            console.log("DtoreInf", params);
            dispatch({ type: actionConstants.REQUEST_RETRIEVE_STORE_INFO, params });

        },

        addHeaderParams(parameters) {
            let params = commonRequestParams(actionConstants.REQUEST_HEADER_PARAMS, parameters);
            console.log("parammmm_loading", params);
            dispatch({ type: actionConstants.REQUEST_HEADER_PARAMS, params });
        }
    };
};

//-----****  mapStateToProps method to call the reducers utilize in the screen ****-----//
function mapStateToProps(state) {
    return {
        storeInf: state.RetrieveStoreInfoReducer,
        headerParams: state.HeaderParamsReducer
    };
}

export default LoadingSplashScreen = connect(mapStateToProps, mapDispatchToProps)(LoadingSplashScreen);