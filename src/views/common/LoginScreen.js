
import React, {Component} from 'react';
import {KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from "react-redux";
import { JsLoggerService } from '../../services/jsLoggerService';
//import { StorageAsync } from '../../services/storageAsync';
import { actionConstants } from '../../actions/ActionConstants';
import * as textLabel from "../../config/TranslationProperties";
//import { ServiceConfig } from "../../config/ServiceConfig.js";
import * as constant from "../../constants/AppConstants";
import styles from "../../styles/common/LoginScreenStyle";
import * as screenImages from "../../config/ImageProperties";
import * as appAlignments from "../../styles/shared/appAlignments";
import * as appColors from "../../styles/shared/appColors";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import { commonRequestParams } from "../../request/commonRequest";
import { Alert, ScrollView, Image, InputAccessoryView, TextInput, TouchableOpacity, Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Util } from '../../utils/utils';
import commonComponents from '../../styles/shared/Components';
import Spinner from "../common/shared/Spinner.js";
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import RNPrint from 'react-native-print'
import { PrintService } from '../../services/printService';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.logger = new JsLoggerService();
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.myTextInput = React.createRef();
    this._OnPressButton = this._OnPressButton.bind(this);
    this.isHeaderParams = true;
    this.state = {
      text: '',
      status: false,
      labelName: [textLabel.messages.login],
      isLoading: false
    };
  }
  //-----****  showLoader called to get the loader activated  //-----****
  showLoader = () => {
    this.logger.getLogger().info("entering::LoginScreen: showLoader");
    this.setState({
      text: this.state.text,
      status: this.state.status,
      labelName: this.state.labelName,
      isLoading: true
    });
    this.logger.getLogger().info("exiting::LoginScreen: showLoader");
  };
  //-----****  hideLoader called to get the loader de-activated  //-----****
  hideLoader = () => {
    this.logger.getLogger().info("entering::LoginScreen: hideLoader");
    this.setState({
      text: this.state.text,
      status: this.state.status,
      labelName: this.state.labelName,
      isLoading: false
    });
    this.logger.getLogger().info("exiting ::LoginScreen: hideLoader");
  };
  //-----****  renderItem called to add the loader to UI in the screen  //-----****
  renderItem() {
    this.logger.getLogger().info("entering::LoginScreen: renderItem");
    if (this.state.isLoading) {
      Keyboard.dismiss()
      return (<Spinner animating = {this.state.isLoading}/>);
    }
    this.logger.getLogger().info("exiting:::LoginScreen: renderItem");
  }
  //-----****  clear called to clear the value for the field  //-----****
  clear = () => {
    this.logger.getLogger().info("entering::LoginScreen: clear()");
    this.myTextInput.current.clear();
    this.logger.getLogger().info("exiting::LoginScreen:  clear()");
  }

  componentDidMount() {
    this.logger.getLogger().info("entering:LoginScreen: componentDidMount");

    this.logger.getLogger().info("exiting:LoginScreen: componentDidMount");
  }

  remotePrint = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 10, y: 10 })
    if (selectedPrinter) {
      await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
    // await RNPrint.print({ filePath: 'http://t1ratmm501.ssc.tsc:8080/TMM-Rentals/RentalJsonService/item/051508132019101/agreement/RENTAL' })
    // this.setState({ selectedPrinter })
    }
  }

  printPdf = () => {
    let printService = new PrintService();
    let pdfUrl = printService.createPdfUrl({ rentalNumber: '051508132019101', type: 'RENTAL' })
    // printService.remotePrint(pdfUrl);
  }

  //-----****  _OnPressButton is method called on entering the user id //-----****
  _OnPressButton() {
    this.printPdf()
    this.remotePrint();
    console.log("Print Complete");

    // this.logger.getLogger().info("entering:LoginScreen: _OnPressButton");
    // let text = this.myTextInput.current._lastNativeText;
    // //-----****  Condition to check empty user id //-----****
    // if (Util.isEmpty(text)) {
    //   this.logger.getLogger().info("entering:LoginScreen: componentDidMount :: Empty id");
    //   Alert.alert(
    //     textLabel.messages.error, textLabel.messages.errorUI3,
    //     [
    //       {
    //         text: textLabel.messages.ok,
    //       },
    //     ],
    //     { cancelable: false },
    //   );
    // }
    // //-----**** Condition to check length of user id  //-----****
    // else if ((text.length !== constant.AppConstants.LENGTH)) {
    //   this.logger.getLogger().info("entering:LoginScreen: componentDidMount :: invalid id");
    //   Alert.alert(
    //     textLabel.messages.errorInvalidUserId, textLabel.messages.emptyError,
    //     [
    //       {
    //         text: textLabel.messages.ok,
    //       },
    //     ],
    //     { cancelable: false },
    //   );
    // }
    // //-----****  condition to to give call to the api  //-----****
    // else {
    //   this.logger.getLogger().info("entering:LoginScreen: componentDidMount:: calling the api");
    //   this.isHeaderParams = true;
    //   let headerParams = this.props.headerParams.headerParameters;
    //   let deviceParameters = [text];
    //   this.showLoader();
    //   this.props.getLogin(deviceParameters, headerParams);

    //   //setTimeout(function(){
    //   //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    //   //this.props.getLogin(deviceParameters, headerParams);
    //   // }, 5000);

    //   let temp = this.props.loginUser.userLoginData.response;
    //   let temp1 = this.props.loginUser.retcodeVal;
    //   let retVal = this.props.loginUser.retcodeVal;
    //   if (Util.isEmpty(temp)) {
    //     this.logger.getLogger().debug("entering:Loginscreen:response is not valid", retVal);
    //   }
    //   else {
    //     this.logger.getLogger().debug("entering:Loginscreen:response is  valid", temp);
    //   }
    // }
    // this.logger.getLogger().info("exiting:LoginScreen: _OnPressButton");
  }
  //-----**** emptyUserIDstate method to clear the state of the field before navigation  //-----****
  emptyUserIDstate() {
    this.logger.getLogger().info("entering::LoginScreen: emptyUserIDstate");
    this.myTextInput.current.clear();
    this.logger.getLogger().info("exiting::LoginScreen: emptyUserIDstate");
  }

  componentWillReceiveProps(nextProps) {
    this.logger.getLogger().info("entering:LoginScreen: componentWillReceiveProps");

    if (nextProps.headerParams.headerParameters.userId === '' && (nextProps.loginUser.retcodeVal === constant.AppConstants.SUCCESSRETCODE)) {
      let params = [nextProps.headerParams.headerParameters.deviceName, nextProps.headerParams.headerParameters.storeId, nextProps.headerParams.headerParameters.applicationVersion, nextProps.loginUser.userLoginData.response["operator-id"], nextProps.headerParams.headerParameters.channelType, nextProps.headerParams.headerParameters.localTimeZone, nextProps.headerParams.headerParameters.storeName, nextProps.headerParams.headerParameters.storeType, nextProps.headerParams.headerParameters.ipAddress];
      this.props.updateHeaderParams(params);
      this.myTextInput.current.clear();
      this.hideLoader();
      Actions.push(constant.AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU, ({ id: this.myTextInput.current._lastNativeText, deleteId: this.emptyUserIDstate() }));

    }

    //-----****  condition to check whether the response is for valid userid //-----****

    // if ((nextProps.loginUser.retcodeVal === constant.AppConstants.SUCCESSRETCODE)) {
    //   this.logger.getLogger().debug("userId", this.myTextInput.current._lastNativeText);
    //   this.myTextInput.current.clear();


    // if (this.isHeaderParams) {
    //   this.isHeaderParams = false;
    //   let params = [nextProps.headerParams.headerParameters.deviceName, nextProps.headerParams.headerParameters.storeId, nextProps.headerParams.headerParameters.applicationVersion, nextProps.loginUser.userLoginData.response.ftpuserid, nextProps.headerParams.headerParameters.channelType, nextProps.headerParams.headerParameters.localTimeZone];
    //   this.props.updateHeaderParams(params);
    //   this.hideLoader();
    //   Actions.push(constant.AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU, ({ id: this.myTextInput.current._lastNativeText, deleteId: this.emptyUserIDstate() }));
    // }
    // }

    //-----**** condition to check whether the system error is coming or not//-----****
    else if (nextProps.loginUser.isSystemError) {
      this.logger.getLogger().info("ERROR ::LoginScreen: componentDidMount :: System error");
      this.hideLoader();
      alert(textLabel.messages.errorWentWrong);
    }
    //-----**** condition to check whether the response is for invalid userid  //-----****
    else if ((nextProps.loginUser.isloginState === true) && (nextProps.loginUser.retcodeVal !== constant.AppConstants.SUCCESSRETCODE)) {
      this.logger.getLogger().debug("userId_invalid", this.myTextInput.current._lastNativeText);
      this.hideLoader();
      Alert.alert(
        textLabel.messages.errorInvalidUserId, textLabel.messages.emptyError,
        [
          {
            text: textLabel.messages.ok,
          },
        ],
        { cancelable: false },
      );
    }

    this.logger.getLogger().info("exiting::LoginScreen: componentWillReceiveProps");
    //Actions.push(constant.AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU)
  }

  //-----**** rendering the components on the screen device ****-----//
  render() {
    this.logger.getLogger().info("entering:LoginScreen: render()");
    const inputAccessoryViewID = textLabel.messages.uniqueIdLoginScreen;
    return (
      <View style={styles.view}>
        <HeaderComponent columnStatus = {appAlignments.alignItem.$defaultHeaderStatusBoolean} labelName ={this.state.labelName} viewCount={appAlignments.alignItem.$defaultHeaderViewCount}/>
        <ScrollView keyboardDismissMode={appAlignments.alignItem.$defaultKeyboardDismissMode} scrollEnabled={false}>
          <View style={[commonComponents.mainParentView, styles.loginContentView]}>
              <Image
                style={{ height: 150, width: 160, alignItems: "center", justifyContent: "center" }}
                source={screenImages.images.tscLogo}
                />
            <View style= {styles.contentView}>
              <Text style ={styles.applicationNameText}>{textLabel.messages.appName}</Text>
              <Text style ={styles.applicationVersionText}>{textLabel.messages.appVersionNo}</Text>
            </View>
            <View style={[commonComponents.borderedTextInput, styles.userIdtextInput]}>
              <TextInput
                keyboardType={textLabel.messages.keyboardType}
                placeholder= {textLabel.messages.enterUserId} style = { styles.loginTextInput }
                placeholderTextColor={appColors.colors.$defaultLoginEmptyFontColor}
                inputAccessoryViewID={inputAccessoryViewID}
                autoFocus = {true}
                onChangeText = {(text) => this.setState({ text: text }) }
                ref={this.myTextInput}
                />
              <View style={commonComponents.clearIconView}>
                <TouchableOpacity onPress={this.clear}>
                  <Image
                    style={commonComponents.clearIcon}
                    source={screenImages.images.clearIcon}
                    />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.renderItem() }
        </ScrollView>
        {/* <InputAccessoryView nativeID={inputAccessoryViewID}>
          <TouchableOpacity  onPress={() => this._OnPressButton() }>
            <View  keyboardShouldPersistTaps={appAlignments.alignItem.keyboardShouldPersistTapAlways}
              style ={commonComponents.enterButton}>
              <Text style={commonComponents.textview}>
                {textLabel.messages.enterLabel}
              </Text>
            </View>
          </TouchableOpacity>
        </InputAccessoryView> */}
        <KeyboardAccessoryView androidAdjustResize>
        <TouchableOpacity
                style={commonComponents.enterButton}
                onPress={() => this._OnPressButton()}
              >
                <Text style={commonComponents.textview}>
                  {textLabel.messages.enterLabel}
                </Text>
              </TouchableOpacity>
        </KeyboardAccessoryView>
      </View>
    );

  }
}


const mapDispatchToProps = (dispatch) => {

  return {

    //-----**** getLogin() method to give the request call to the Login user ****-----//
    getLogin(deviceParams, header) {

      if (Util.isEmpty(deviceParams[0])) {//check for requirement
        Alert.alert(
          textLabel.messages.error, textLabel.messages.errorUI3,
          [
            { text: textLabel.messages.ok },
          ],
          { cancelable: false }
        );
      }

      else {
        let idparam = deviceParams;
        params = commonRequestParams(actionConstants.REQUEST_LOGIN_USER, idparam);
        params = {
          'parameters': params,
          'headers': header
        };
        dispatch({ type: actionConstants.REQUEST_LOGIN_USER, params });
      }
    },

    updateHeaderParams(parameters) {

      let params = commonRequestParams(actionConstants.REQUEST_HEADER_PARAMS, parameters);
      dispatch({ type: actionConstants.REQUEST_HEADER_PARAMS, params });
    }
  };
};
//-----**** mapStateToProps to give call to the reducer ****-----//
function mapStateToProps(state) {
  return {
    loginUser: state.LoginScreenReducer,
    headerParams: state.HeaderParamsReducer,
    storeInfo: state.RetrieveStoreInfoReducer
  }
}

export default LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);



