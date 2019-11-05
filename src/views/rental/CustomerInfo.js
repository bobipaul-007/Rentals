
import React, {Component} from 'react';
import { Text, Alert, View, TextInput, ActivityIndicator, InputAccessoryView, FlatList, Keyboard, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import * as appColors from "../../styles/shared/appColors.js";
import * as screenImages from "../../config/ImageProperties";
import { Actions } from "react-native-router-flux";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import { actionConstants } from '../../actions/ActionConstants';
import { rentalRequestParams } from "../../request/rentalRequest";
import { commonRequestParams } from "../../request/commonRequest";
import * as appAlignments from "../../styles/shared/appAlignments";
import common from'../../styles/shared/Components.js';
import * as translationProperties from "../../config/TranslationProperties";
import {AppConstants}  from "../../constants/AppConstants";
import * as constant from "../../constants/AppConstants";
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from "react-redux";
import { JsLoggerService } from "../../services/jsLoggerService";
import addressDetails from '../../assets/data/rental/LocationDetails/zip.json'
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js'
import { Util } from '../../utils/utils';
var dataArray = [];
var isEdit = '';
class CustomerInfo extends Component {

  constructor(props) {
    super(props);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.addressDetailsFromZipCode = this.addressDetailsFromZipCode.bind(this);
    this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
    this.callingSearch = this.callingSearch.bind(this);
    this.autoPopulateValues = this.autoPopulateValues.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.valueIsUpdated = this.valueIsUpdated.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.logger = new JsLoggerService();
    this.ninthTextInput = React.createRef();
    this.firstName = React.createRef();
    this.secondTextInput = React.createRef();
    this.thirdTextInput = React.createRef();
    this.fourthTextInput = React.createRef();
    this.sixthTextInput = React.createRef();
    this.state = React.createRef();
    this.fifthTextInput = React.createRef();
    this.eightTextInput = React.createRef();
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      zipCode: '',
      city: '',
      state: '',
      phoneNo: '',
      IsEdit: '',
      customersEmailId: '',
      isNcEnrolled: '',
      DropdownVal: translationProperties.messages.dropDownVariable,
      labelName: [translationProperties.messages.customerInfoLabel],
      loaderText: '',
      loaderStatus: false,
      loaderLabelName: [translationProperties.messages.customerInfoLabel],
      loaderIsLoading: false,
      stateAutoPopulated: false
    }
    this.nextButtonClicked = false;
    this.update = false;
  }

  onLeftSwipe() {
    this.logger.getLogger().info("entering:CustomerInfo: onLeftSwipe");
    if (!Util.isEmpty(this.props.screenProps)) {
      if (this.props.screenProps == "CustomerList") {
        Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LIST);
      }
      else if (this.props.screenProps == "CustomerLookup") {
        Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LOOKUP, this.props.deleteReducer);
      }
    }
    this.logger.getLogger().info("exiting:CustomerInfo: onLeftSwipe");
  }

  space() {
    return (<View style={common.emailDomainSeparator}/>)
  }

  showLoader = () => {
    this.logger.getLogger().info("entering:CustomerInfo:: showLoader");

    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: true
    });
    this.logger.getLogger().info("exiting::CustomerInfo:showLoader");
  };

  hideLoader = () => {
    this.logger.getLogger().info("entering:CustomerInfo:hideLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: false
    });
    this.logger.getLogger().info("exiting::CustomerInfo:hideLoader");
  };

  renderLoader() {
    this.logger.getLogger().info("entering:CustomerInfo: renderLoader");
    if (this.state.loaderIsLoading) {
      return (<View>
        <ActivityIndicator size="large" color= {appColors.colors.$defaultHeaderBackground}/>
      </View>);
    }
    this.logger.getLogger().info("exiting::CustomerInfo: renderLoader");
  }

  onRightSwipe() {
    this.logger.getLogger().info("entering:CustomerInfo: onRightSwipe");
    if (this.props.screenProps == "CustomerList") {
      this.nextButtonClicked = true;
      this.validate();
      isEdit = this.valueIsUpdated();
      let firstName = this.state.firstName;
      let lastName = this.state.lastName;
      let address1 = this.state.address1;
      let address2 = this.state.address2;
      let city = this.state.city;
      let state = this.state.state;
      let postalCode = this.state.zipCode;
      let mobNo = Util.removeHyphensFromNumber(this.state.phoneNo);
      let email_id = this.state.customersEmailId;
      let isNcEnrolled = this.state.isNcEnrolled

      var headerParams = { params: this.props.headerParams.headerParameters };
      headerParams.urlVariable = { rentalNumber: this.props.inspectionQuestions.agreementNumber.rentalNumber, customerID: this.props.custID };
      let deviceParameters = [firstName, lastName, address1, address2, city, state, postalCode, mobNo, email_id, isNcEnrolled];
      if (isEdit === "Y") {

        //console.log("Flag_up_first1", this.props.updateCustomerInfo.custInfoRecieved);
        this.props.getUpdateCust(deviceParameters, headerParams);
      }
      else if (isEdit === "N") {

        //console.log("Flag_up_first2", this.props.updateCustomerInfo.custInfoRecieved);
        //this.props.changeFlag(translationProperties.messages.emptyParam, translationProperties.messages.emptyParam);
        this.props.getUpdateCust(deviceParameters, headerParams);
      }
    }
    else if (this.props.screenProps == "CustomerLookup") {
      this.validate();
      isEdit = this.valueIsUpdated();
      let email_id = this.state.customersEmailId;
      let firstName = this.state.firstName;
      let lastName = this.state.lastName;
      let address1 = this.state.address1;
      let address2 = this.state.address2;
      let city = this.state.city;
      let state = this.state.state;
      let postalCode = this.state.zipCode;
      let isNcEnrolled = this.state.isNcEnrolled;
      let mobNo = Util.removeHyphensFromNumber(this.state.phoneNo);
      var headerParams = { params: this.props.headerParams.headerParameters };
      headerParams.urlVariable = { rentalNumber: this.props.inspectionQuestions.agreementNumber.rentalNumber };
      let deviceParameters = [firstName, lastName, address1, address2, city, state, postalCode, mobNo, email_id, isNcEnrolled];
      if (isEdit === "Y") {
        this.props.getUpdateCust(deviceParameters, headerParams);
      } else {
        this.props.getNewCust(deviceParameters, headerParams);
      }
    }
    this.logger.getLogger().info("entering:CustomerInfo: onRightSwipe");

  }


  componentWillReceiveProps(nextProps) {
    this.logger.getLogger().info("entering:CustomerInfo: componentWillReceiveProps");
    if (!Util.isEmpty(nextProps.updateCustomerInfo.response)) {
      let temp = nextProps.updateCustomerInfo.response;
    }
    if (this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.address1.length > 0 && this.state.zipCode.length > 0 && this.state.city.length > 0 && this.state.DropdownVal != translationProperties.messages.dropDownVariable && Util.isEmailValid(this.state.customersEmailId) && this.state.zipCode.length == 5 && Util.removeHyphensFromNumber(this.state.phoneNo).length == 10) {

      if (!Util.isEmpty(nextProps.newCustomer.response)) {
        if ((nextProps.newCustomer.isSystemError)) {
          console.log("SysError1N", nextProps.newCustomer.isSystemError);
          this.hideLoader();
          alert(translationProperties.messages.errorWentWrong);
        }
        else if (nextProps.newCustomer.responseCode === constant.AppConstants.RESPONSECODE) {
          console.log("SysError2N", nextProps.newCustomer.responseCode);
          this.hideLoader();
          let params = [this.state.customersEmailId, this.state.firstName, this.state.lastName, this.state.address1, this.state.address2, this.state.zipCode, this.state.city, this.state.state, this.state.phoneNo];
          this.props.addCustomerDetails(params);
          Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_DL_INFO, ({ flag: dataArray }));
        }
        else if (nextProps.newCustomer.responseCode != "0") {
          console.log("SysError3N", nextProps.newCustomer.responseCode);
          this.hideLoader();
          Alert.alert(
            translationProperties.messages.errorLableMissingField, translationProperties.messages.errorType1,
            [
              { text: translationProperties.messages.ok, onPress: () => { } },
            ],
            { cancelable: false }
          );
        }
      }
      else if (this.nextButtonClicked) {
        this.nextButtonClicked = false;
        //else
        if (!Util.isEmpty(nextProps.updateCustomerInfo.response)) {
          if ((nextProps.updateCustomerInfo.isSystemError)) {
            console.log("SysError1", nextProps.updateCustomerInfo.isSystemError);
            this.hideLoader();
            alert(translationProperties.messages.errorWentWrong);
          }
          else if (nextProps.updateCustomerInfo.responseCode === constant.AppConstants.RESPONSECODE) {
            console.log("SysError2", nextProps.updateCustomerInfo.responseCode);
            this.hideLoader();
            let params = [this.state.customersEmailId, this.state.firstName, this.state.lastName, this.state.address1, this.state.address2, this.state.zipCode, this.state.city, this.state.state, this.state.phoneNo];
            this.props.addCustomerDetails(params);
            Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_DL_INFO, ({ flag: dataArray }));
          }
          else if (nextProps.updateCustomerInfo.responseCode != "0") {
            console.log("SysError3", nextProps.updateCustomerInfo.responseCode ,nextProps.updateCustomerInfo.message);
            this.hideLoader();
            // Alert.alert(
            //   nextProps.updateCustomerInfo.responseCode, nextProps.updateCustomerInfo.message,
            //   [
            //     { text: translationProperties.messages.ok, onPress: () => { } },
            //   ],
            //   { cancelable: false }
            // );
            let params = [this.state.customersEmailId, this.state.firstName, this.state.lastName, this.state.address1, this.state.address2, this.state.zipCode, this.state.city, this.state.state, this.state.phoneNo];
            this.props.addCustomerDetails(params);
            Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_DL_INFO, ({ flag: dataArray }));

          }
        }
      }
    }
    this.logger.getLogger().info("exiting:CustomerInfo: componentWillReceiveProps");

  }

  validate() {
    console.log("entering:CustomerInfo: validate");
    if (this.state.firstName.length == 0 || this.state.lastName.length == 0 || (Util.isEmpty(this.state.address1) || (this.state.address1.length == 0)) || this.state.zipCode.length == 0 || this.state.city.length == 0 || this.state.DropdownVal == translationProperties.messages.dropDownVariable ||
      (Util.isEmpty(this.state.phoneNo) || (this.state.phoneNo.length == 0)) || (Util.isEmpty(this.state.customersEmailId) || (this.state.customersEmailId.length == 0))) {
      this.hideLoader();
      Alert.alert(
        translationProperties.messages.errorLableMissingField, translationProperties.messages.errorType1,
        [
          { text: translationProperties.messages.ok, onPress: () => { } },
        ],
        { cancelable: false }
      );
    }
    else if (Util.removeHyphensFromNumber(this.state.phoneNo).length != 10 || (this.state.zipCode.length != 5) || (!Util.isEmailValid(this.state.customersEmailId))) {
      this.hideLoader();
      Alert.alert(
        translationProperties.messages.errorLableInvalidFormat, translationProperties.messages.errorType2,
        [
          { text: translationProperties.messages.ok, onPress: () => { } },
        ],
        { cancelable: false }
      );
    }
    console.log("exiting:CustomerInfo: validate")
  }


  valueIsUpdated() {
    if (this.props.screenProps == "CustomerList") {
      if (this.state.firstName == this.props.selectedItem.firstName && this.state.lastName == this.props.selectedItem.lastName && this.state.address1 == this.props.selectedItem.address1 && this.state.address2 == this.props.selectedItem.address2 &&
        this.state.zipCode == this.props.selectedItem.zipcode && this.state.city == this.props.selectedItem.city && this.state.phoneNo == this.props.selectedItem.phoneNumber && this.state.customersEmailId == this.props.selectedItem.emailId) {
        return "N";
      } else {
        return "Y";
      }
    } else if (this.props.screenProps == "CustomerLookup") {
      return "N";
    }
  }

  componentDidMount() {
    this.logger.getLogger().info("entering:CustomerInfo:  componentDidMount", this.state.customersEmailId);

    this.setState({
      customersEmailId: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNo: "",
      isNcEnrolled: "",
      DropdownVal: translationProperties.messages.dropDownVariable,
      stateAutoPopulated: false
    });
    if (this.props.screenProps == "CustomerList") {
      this.setState({
        customersEmailId: this.props.selectedItem.emailId,
        firstName: this.props.selectedItem.firstName,
        lastName: this.props.selectedItem.lastName,
        address1: this.props.selectedItem.address1,
        address2: this.props.selectedItem.address2,
        city: this.props.selectedItem.city,
        state: this.props.selectedItem.state,
        zipCode: this.props.selectedItem.zipcode,
        phoneNo: this.props.selectedItem.phoneNumber,
        DropdownVal: this.props.selectedItem.state,
        isNcEnrolled: this.props.selectedItem.ncEnrolled,
        stateAutoPopulated: true
      });
    }
    else if (this.props.screenProps == "CustomerLookup") {
      this.setState({
        firstName: this.props.newCustomer.firstName,
        lastName: this.props.newCustomer.lastName,
        address1: this.props.newCustomer.address1,
        address2: this.props.newCustomer.address2,
        zipCode: "",
        city: this.props.newCustomer.city,
        state: this.props.newCustomer.state,
        phoneNo: "",
        customersEmailId: this.props.newCustomer.emailId,
      });

    }

    if (this.props.screenProps == "CustomerList") {
      this.autoPopulateValues();
    }
  }


  setEmailId(emailId) {
    this.setState({
      customersEmailId: emailId
    });
  }

  onSubmitHandler(event) {
    this.showLoader();
    this.logger.getLogger().info("entering:CustomerInfo: onSubmitHandler");
    if (Util.isEmailValid(this.state.customersEmailId)) {
      this.hideLoader();
      var headerParams = { params: this.props.headerParams.headerParameters };
      let custId = this.state.customersEmailId;
      let deviceParameters = { "emailAddress": custId };

      this.update = true;

      this.props.searchCustomerByEmail([deviceParameters], headerParams);
      this.showLoader();
      this.callingSearch(custId);
    } else {
      this.hideLoader();
      Alert.alert(
        translationProperties.messages.emptyError, translationProperties.messages.errorType6,
        [
          {
            text: translationProperties.messages.ok, onPress: () => { this.ninthTextInput.current.focus() }
          },

        ],
        { cancelable: false }
      );
    }
    this.logger.getLogger().info("exiting:CustomerInfo: onSubmitHandler");
  }

  checkPhoneNumber() {

    if (Util.removeHyphensFromNumber(this.state.phoneNo).length != 10) {
      Alert.alert(
        translationProperties.messages.emptyError, translationProperties.messages.errorType5,
        [
          {
            text: translationProperties.messages.ok, onPress: () => { this.eightTextInput.current.focus() }
          },

        ],
        { cancelable: false }
      );
    }
  }

  callingSearch(inputId) {
    this.showLoader();
    if (Util.isEmpty(this.props.custSearch.searchCustData)) {
      this.hideLoader();
    }
    else if (!Util.isEmpty(this.props.custSearch.searchCustData)) {
      if (this.props.custSearch.searchCustData.responseMessage == "failure") {
        this.hideLoader();
        this.firstName.current.focus();
      }
      else if (this.props.custSearch.searchCustData.isSystemError) {
        this.hideLoader();
        alert(translationProperties.messages.errorWentWrong);
      }
      else if (inputId === this.props.custSearch.searchCustData.customerList[0].emailId) {

        // -------------- call customer List -------------------//
        if (!Util.isEmpty(this.props.screenProps)) {
          if (this.update) {
            this.update = false;
            if (this.props.screenProps == "CustomerList") {
              this.hideLoader();
              Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LIST);
              Actions.refresh({ flag: this.checkstat });
            }
            else if (this.props.screenProps == "CustomerLookup") {
              console.log("Customerloo>>");
              this.hideLoader();
              Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LIST, ({ flag: "push" }));
            }
          }
        }
      }
      else {
        this.logger.getLogger().info("enteringElse: SubmithandlerCustomerInfo");
        this.hideLoader();
        this.firstName.current.focus();
      }
    }
  }

  render() {
    this.logger.getLogger().info("entering:CustomerInfo: render");

    let agreementNumber = "";
    if (!Util.isEmpty(this.props.inspectionQuestions.agreementNumber)) {
      if (Number(this.props.inspectionQuestions.agreementNumber.responseCode) === 0)
        agreementNumber = this.props.inspectionQuestions.agreementNumber.rentalNumber;
    }
    const emailAccessoryID = translationProperties.messages.uniqueIDCustInfo;
    const phoneNoAccessoryID = translationProperties.messages.uniquePhoneIDCustInfo;
    const zipcodeAccessoryID = translationProperties.messages.uniqueZipcodeCustInfo;
    var emailDomain = AppConstants.EMAILDOMAIN;
    var doneButton = AppConstants.DONE;
    var dataStates = [...new Set(addressDetails.map(data => data.state))]

    dataArray = [];
    dataStates.sort();
    for (i = 0; i < dataStates.length; i++) {
      data = { value: dataStates[i] }
      dataArray.push(data);
    }
    return (
      <View style={common.mainParentView}>
        <HeaderComponent columnStatus = 'true' labelName ={[this.state.labelName, agreementNumber]}/>

        <KeyboardAvoidingView style={common.keybordAvoidingView} keyboardVerticalOffset={5} behavior={"padding"} enabled>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.custEmailAdd}
              </Text>
              <TextInput autoCapitalize={false} autoCorrect={false} key='input-email' keyboardType='email-address' style={common.textInputViews}
                onChangeText={(customersEmailId) => { this.setEmailId(customersEmailId) } }
                onEndEditing={(customersEmailId) => this.onSubmitHandler(customersEmailId) }
                value= {this.props.screenProps == "CustomerList" ? this.state.customersEmailId : this.state.customersEmailId}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"done"}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                ref={this.ninthTextInput}
                inputAccessoryViewID= {emailAccessoryID}

                />
            </View>
            {/* <InputAccessoryView nativeID={emailAccessoryID}>
              <FlatList data={emailDomain} renderItem={this.renderItem} horizontal={true} ItemSeparatorComponent={this.space} keyboardShouldPersistTaps='always'>

              </FlatList>
            </InputAccessoryView> */}
            <View
              style={common.viewSeparator}
              />


            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.firstName}
              </Text>
              <TextInput autoCapitalize={true} autoCorrect={false} style={common.textInputViews}
                maxLength={appAlignments.alignItem.$defaultMaxTextLength}
                onChangeText={this.handleFirstName}
                value= {this.props.screenProps == "CustomerList" ? this.state.firstName : this.state.firstName}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"next"}
                onSubmitEditing={() => { this.secondTextInput.current.focus() } }
                ref={this.firstName}
                />
            </View>
            <View
              style={common.viewSeparator}
              />

            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.lastName}
              </Text>
              <TextInput autoCapitalize={true} autoCorrect={false} style={common.textInputViews}
                maxLength={appAlignments.alignItem.$defaultMaxTextLength}
                value={this.props.screenProps == "CustomerList" ? this.state.lastName : this.state.lastName}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"next"}
                onChangeText= {this.handleLastName}
                onSubmitEditing={() => { this.thirdTextInput.current.focus() } }
                ref={this.secondTextInput}

                />
            </View>
            <View
              style={common.viewSeparator}
              />


            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.address1}
              </Text>
              <TextInput autoCapitalize={true} autoCorrect={false} style={common.textInputViews}
                maxLength={1000}
                onChangeText={this.handleAddress1}
                value={this.props.screenProps == "CustomerList" ? this.state.address1 : this.state.address1}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"next"}
                onSubmitEditing={() => { this.fourthTextInput.current.focus() } }
                ref={this.thirdTextInput}

                />
            </View>
            <View
              style={common.viewSeparator}
              />

            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.address2}
              </Text>
              <TextInput autoCapitalize={true} autoCorrect={false} style={common.textInputViews}
                maxLength={1000}
                onChangeText={this.handleAddress2}
                placeholder ={translationProperties.messages.optionalPlaceholder}
                value={this.props.screenProps == "CustomerList" ? this.state.address2 : this.state.address2}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"next"}
                onSubmitEditing={() => { this.fifthTextInput.current.focus() } }
                ref={this.fourthTextInput}

                />
            </View>
            <View
              style={common.viewSeparator}
              />

            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.zipCode}
              </Text>
              <TextInput autoCorrect={false} key='input-phone' keyboardType='phone-pad' style={common.textInputViews}
                maxLength={5}
                onChangeText={this.handleZipCode}
                value={this.props.screenProps == "CustomerList" ? this.state.zipCode : this.state.zipCode}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"next"}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                onEndEditing={this.addressDetailsFromZipCode}
                onSubmitEditing={() => { this.sixthTextInput.current.focus() } }
                inputAccessoryViewID= {zipcodeAccessoryID}
                ref={this.fifthTextInput}
                />
            </View>

            {/* <InputAccessoryView nativeID={zipcodeAccessoryID}>
              <TouchableOpacity  onPress={() => Keyboard.dismiss() }>
                <View  keyboardShouldPersistTaps={appAlignments.alignItem.keyboardShouldPersistTapAlways}
                  style ={common.enterButton}>
                  <Text style={common.textview}> {translationProperties.messages.doneLable} </Text>
                </View>
              </TouchableOpacity>
            </InputAccessoryView> */}

            <View
              style={common.viewSeparator}
              />


            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.city}
              </Text>
              <TextInput autoCapitalize={true} autoCorrect={false} style={common.textInputViews}
                maxLength={appAlignments.alignItem.$defaultMaxTextLength}
                onChangeText={this.handleCity}
                editable={false}
                value={this.props.screenProps == "CustomerList" ? this.state.city : this.state.city}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                // color={appColors.colors.$defaultInputTextColor}
                returnKeyType={"next"}
                ref={this.sixthTextInput}

                />
            </View>
            <View
              style={common.viewSeparator}
              />
            {this.renderLoader() }

            <View style={[common.textInputMainView, { alignItems: appAlignments.alignItem.$defaultAlignItem }]}>
              <Text style={common.labelViews}>
                {translationProperties.messages.state}
              </Text>

              {this.state.stateAutoPopulated ?

                <TextInput
                  style={common.textInputViews}
                  value={this.state.state}
                  editable={false}
                  />

                :
                <TextInput autoCapitalize={true} autoCorrect={false} style={common.textInputViews}
                  editable={false}
                  value={this.props.screenProps == "CustomerList" ? this.state.state : this.state.state}
                  placeholder ={translationProperties.messages.requiredPlaceholder}/>
              }

            </View>
            <View
              style={common.viewSeparator}
              />

            <View style={common.textInputMainView}>
              <Text style={common.labelViews}>
                {translationProperties.messages.phoneNumber}
              </Text>
              <TextInput key='input-phone' keyboardType='phone-pad' style={common.textInputViews}
                onChangeText={this.handlePhonenumber}
                value={this.props.screenProps == "CustomerList" ? this.state.phoneNo : this.state.phoneNo}
                // color={appColors.colors.$defaultInputTextColor}
                placeholder ={translationProperties.messages.requiredPlaceholder}
                onEndEditing={this.checkPhoneNumber}
                inputAccessoryViewID= {phoneNoAccessoryID}
                ref={this.eightTextInput}

                />
            </View>
            {/* <InputAccessoryView nativeID={phoneNoAccessoryID}>
              <TouchableOpacity  onPress={() => Keyboard.dismiss() }>
                <View  keyboardShouldPersistTaps={appAlignments.alignItem.keyboardShouldPersistTapAlways}
                  style ={common.enterButton}>
                  <Text style={common.textview}> {translationProperties.messages.doneLable} </Text>
                </View>
              </TouchableOpacity>
            </InputAccessoryView> */}

            <View
              style={common.viewSeparator}
              />

          </ScrollView>
        </KeyboardAvoidingView>

        <BottomNavigationComponent leftSwipe = {this.onLeftSwipe} rightSwipe = {this.onRightSwipe} bothSideSwipable = {true}/>

      </View>
    );
  }

  // }

  renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => this.onPressEmailDomain(item) }>
      <View style={common.emailDomainView}>
        <Text style={common.emailDomainText}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressPhoneDomain(item) }>
      <View style={common.emailDomainView}>
        <Text style={common.emailDomainText}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );


  onPressPhoneDomain = (item) => {
    let mail_id = this.state.customersEmailId + item.title + translationProperties.messages.dotCom;
    Keyboard.dismiss()
    this.setEmailId(mail_id);
  }

  onPressEmailDomain = (item) => {
    let mail_id = this.state.customersEmailId + item.title + translationProperties.messages.dotCom;
    Keyboard.dismiss()
    this.setEmailId(mail_id);
  }

  handleFirstName = (name) => {
    name = Util.alphaNumericWithSpacesAndDecimal(name)
    this.setState({
      firstName: name
    })
  }

  onChangeTextPress(value) {
    this.setState({
      state: value,
      DropdownVal: value,
      stateAutoPopulated: false
    })
  }

  handleLastName = (name) => {
    name = Util.alphaNumericWithSpacesAndDecimal(name);

    this.setState({
      lastName: name
    })
  }

  autoPopulateValues() {
    this.logger.getLogger().info("entering:CustomerInfo: autoPopulateValues");
    this.setState({
      customersEmailId: this.props.selectedItem.emailId,
      firstName: this.props.selectedItem.firstName,
      lastName: this.props.selectedItem.lastName,
      address1: this.props.selectedItem.address1,
      address2: this.props.selectedItem.address2,
      city: this.props.selectedItem.city,
      state: this.props.selectedItem.state,
      zipCode: this.props.selectedItem.zipcode,
      phoneNo: Util.formatPhoneNumberWithHyphen(this.props.selectedItem.phoneNumber),
      DropdownVal: this.props.selectedItem.state,
      customerId: this.props.selectedItem.customerId,
      stateAutoPopulated: true
    });
    this.logger.getLogger().info("exiting:CustomerInfo: autoPopulateValues");
  }

  clear = (text) => {
    this.setState({
      customersEmailId: '',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNo: '',
    })
  }

  handleAddress1 = (address) => {
    address = Util.alphaNumericWithSpacesAndHyphens(address)
    this.setState({
      address1: address
    })
  }

  handleAddress2 = (address) => {
    address = Util.alphaNumericWithSpacesAndHyphens(address)
    this.setState({
      address2: address
    })
  }

  handleZipCode = (zipCode) => {
    zipCode = Util.numerics(zipCode)
    this.setState({
      zipCode: zipCode
    })
  }

  handleCity = (city) => {
    city = Util.alphabetsWithSpaces(city)
    this.setState({
      city: city
    })
  }

  handlePhonenumber = (phoneNo) => {
    phoneNo = Util.numerics(phoneNo)
    phoneNo = Util.formatPhoneNumberWithHyphen(phoneNo)
    this.setState({
      phoneNo: phoneNo
    })
  }

  handleCustomersEmailId = (customersEmailId) => {
    this.setState({
      customersEmailId: customersEmailId
    })
  }

  addressDetailsFromZipCode() {
    this.logger.getLogger().info("entering:CustomerInfo: addressDetailsFromZipCode");
    let zipCode = this.state.zipCode
    //--------------- ****** code added for correct zipcode ***** --------------//
    if (zipCode.length == 5) {
      var addressData = addressDetails.filter(data => data.zip === zipCode)
      if (addressData && addressData.length) {
        this.setState({
          city: addressData[0]['city'],
          state: addressData[0]['state'],
          DropdownVal: addressData[0]['state'],
          stateAutoPopulated: true
        })
        this.eightTextInput.current.focus();
      }
      //--------------- ****** code added for incorrect zipcode ***** --------------//
      else {
        Alert.alert(
          translationProperties.messages.emptyError, translationProperties.messages.errorZipCode,
          [
            {
              text: translationProperties.messages.ok, onPress: () => { this.fifthTextInput.current.focus() }
            },

          ],
          { cancelable: false }
        );
      }
    }
    //--------------- ****** code added for incorrect zipcode format ***** --------------//
    else {
      Alert.alert(
        translationProperties.messages.emptyError, translationProperties.messages.errorType7,
        [
          {
            text: translationProperties.messages.ok, onPress: () => { this.fifthTextInput.current.focus() }
          },

        ],
        { cancelable: false }
      );
    }
    this.logger.getLogger().info("exiting:CustomerInfo: addressDetailsFromZipCode");
  }

}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchCustomerByEmail(deviceParams, header) {
      let idparam = deviceParams;
      params = rentalRequestParams(actionConstants.REQUEST_SEARCH_CUSTOMER, idparam);
      params = {
        'parameters': params,
        'headers': header
      };

      dispatch({ type: actionConstants.REQUEST_SEARCH_CUSTOMER, params });

    },
    getUpdateCust(deviceParams, header) {
      {
        let idparam = deviceParams;
        params = rentalRequestParams(actionConstants.UPDATE_CUST_INFO, idparam);
        params = {
          'parameters': params,
          'headers': header
        };
        console.log('updated:', params);
        dispatch({ type: actionConstants.UPDATE_CUST_INFO, params });
      }
    },

    changeFlag(deviceParams, header) {
      let idparam = deviceParams;
      params = rentalRequestParams(actionConstants.FLAG_RESET, idparam);
      params = {
        'parameters': params,
        'headers': header
      };

      dispatch({ type: actionConstants.FLAG_RESET, params });
    },

    getNewCust(deviceParams, header) {
      {
        let idparam = deviceParams;
        params = rentalRequestParams(actionConstants.REQUEST_NEW_CUSTOMER, idparam);
        params = {
          'parameters': params,
          'headers': header
        };

        dispatch({ type: actionConstants.REQUEST_NEW_CUSTOMER, params });
      }
    },

    addCustomerDetails(parameters) {
      let params = rentalRequestParams(actionConstants.REQUEST_CUSTOMER_INFO, parameters);
      dispatch({ type: actionConstants.REQUEST_CUSTOMER_INFO, params });
    }

  };
};
function mapStateToProps(state) {
  return {
    custSearch: state.SearchCustomerReducer,
    newCustomer: state.NewCustomerReducer,
    inspectionQuestions: state.InspectionReducer,
    headerParams: state.HeaderParamsReducer,
    updateCustomerInfo: state.UpdateCustomerReducer,
  }
}

export default CustomerInfo = connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);