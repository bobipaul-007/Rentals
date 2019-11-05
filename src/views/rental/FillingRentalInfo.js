import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import * as textLabel from "../../config/TranslationProperties";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import common from '../../styles/shared/Components.js';
import styles from '../../styles/rental/FillingRentalInfoStyle.js';
import appColors from '../../styles/shared/appColors.js';
import { Actions } from "react-native-router-flux";
import * as screenImages from "../../config/ImageProperties";
import { Util } from '../../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from "moment"
import { connect } from 'react-redux';
import { rentalRequestParams } from '../../request/rentalRequest';
import { commonRequestParams } from "../../request/commonRequest";
import { actionConstants } from '../../actions/ActionConstants';
import { AppConstants } from '../../constants/AppConstants';
import Spinner from "../common/shared/Spinner.js";
import { JsLoggerService } from "../../services/jsLoggerService";


class FillingRentalInfo extends Component {

  constructor(props) {
    super(props);
    this.vinListValue = []
    this.rentDurationValues = []
    this.today = new Date()
    this.vinList = []
    this.agreementNumber = " "
    this.itemStatusData = ""
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Tuesday", "Friday", "Saturday"]
    this.state = {
      labelName: [],
      trailerDamages: false,
      selectedRentDuration: '',
      tmName: '',
      VIN: '',
      dateTimeRented: '',
      returnDateTime: '',
      height: 0,
      storeClosing: '',
      storeOpening: '',
      trailerLicense: '',
      isDateTimePickerVisible: false,
      dateType: '',
      loaderText: '',
      loaderStatus: false,
      loaderLabelName: [textLabel.messages.fillingRentalInfo],
      loaderIsLoading: false

    }
    this.nextButtonClicked = false;
    this.logger = new JsLoggerService();
    this.handleRentDuration = this.handleRentDuration.bind(this);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.progressIndicatorRenderItem = this.progressIndicatorRenderItem.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
  }


  componentDidMount() {

    this.itemStatusData = this.props.headerParams.appDetails.selectedItem;

    console.log("data>>>>.", this.itemStatusData.itemNumber);

    // let header = {
    //   "params": {
    //     deviceName: this.props.headerParams.headerParameters.deviceName,
    //     storeId: this.props.headerParams.headerParameters.storeId,
    //     applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
    //     userId: this.props.headerParams.headerParameters.userId,
    //     channelType: this.props.headerParams.headerParameters.channelType,
    //     localTimeZone: 'America/New_York'
    //   },

    //   "urlVariable": { itemId: itemStatusData.itemNumber }
    // };
    var headerParams = { params: this.props.headerParams.headerParameters };
    headerParams.urlVariable = { itemId: this.itemStatusData.itemNumber };

    this.props.getRentDuration('', headerParams);
  }

  //-----****  showLoader call for showing activityIndicator //-----****
  showLoader = () => {
    this.logger.getLogger("entering: FillingRentalInfo: showLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: true
    });
    this.logger.getLogger("exiting: FillingRentalInfo: showLoader");
  };

  //-----**** hideLoader call for hiding activityIndicator //-----****
  hideLoader = () => {
    this.logger.getLogger("entering: FillingRentalInfo: hideLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: false
    });
    this.logger.getLogger("exiting: FillingRentalInfo: hideLoader");
  };

  //-----**** progressIndicatorRenderItem to call Spinner(Activity Indicator) component  //-----****
  progressIndicatorRenderItem() {
    this.logger.getLogger("entering: FillingRentalInfo: progressIndicatorRenderItem");
    console.log("idloading>>>", this.state.loaderIsLoading);
    if (this.state.loaderIsLoading) {
      Keyboard.dismiss()
      return (<Spinner animating = {this.state.loaderIsLoading}/>);
    }
    this.logger.getLogger("exiting: FillingRentalInfo: progressIndicatorRenderItem");
  }


  componentWillMount() {
    this.logger.getLogger("entering: FillingRentalInfo: componentWillMount");

    //---------------getTiming api call --------**********//
    let headers = {
      "params": {
        deviceName: this.props.headerParams.headerParameters.deviceName,
        storeId: this.props.headerParams.headerParameters.storeId,
        applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
        userId: this.props.headerParams.headerParameters.userId,
        channelType: this.props.headerParams.headerParameters.channelType,
        localTimeZone: this.props.headerParams.headerParameters.localTimeZone
      }
    }

    this.props.getTiming("", headers);



    if (!Util.isEmpty(this.props.inspectionQuestions.agreementNumber)) {
      if (Number(this.props.inspectionQuestions.agreementNumber.responseCode) === 0)
        this.agreementNumber = this.props.inspectionQuestions.agreementNumber.rentalNumber;

    }

    ISRItems = this.props.retrieveStatus.itemStatusData.inserviceItems.items;
    this.vinList = ISRItems.length > 0 ? [...new Set(ISRItems.map(data => data.trailerVinNumber))] : [];

    if (this.vinList.length > 1) {
      this.vinListValue = []
      for (i = 0; i < this.vinList.length; i++) {
        data = { value: this.vinList[i] }
        this.vinListValue.push(data)
      }
    } else {
      vinValue = this.vinList.length == 0 ? '' : this.vinList[0]
      trailerLicenseNo = this.vinList.length == 0 ? '' : ISRItems[0].trailerLincenseNumber;
      this.setState({
        VIN: vinValue,
        trailerLicense: vinValue
      });
    }

    this.today = Util.getCurrentDateTime();
    this.today = moment(this.today).format('MM/DD/YYYY hh:mm A')
    console.log("TodayDate", this.today);

    this.setState({
      dateTimeRented: this.today,
      tmName: this.props.loginUser.userLoginData.response.name
    });
    this.logger.getLogger("exiting: FillingRentalInfo: componentWillMount");
  }



  componentWillReceiveProps(nextProps) {
    this.logger.getLogger().info("entering: fillingRentalInfo: componentWillRecieveProps: with nextProps as: ", nextProps);


    console.log("nextProps>>>", nextProps.blockItemDetails);

    if (!Util.isEmpty(nextProps.rentalDetails.storeTiming.storeOpenHours)) {
      if (nextProps.rentalDetails.storeTiming.storeOpenHours.length > 0) {
        console.log("storeTiming888888>>>", nextProps.rentalDetails.storeTiming.storeOpenHours.length);
        var d = new Date();
        todaysDay = this.days[d.getDay()];
        console.log("todayDate1>>>", todaysDay);

        for (i = 0; i < nextProps.rentalDetails.storeTiming.storeOpenHours.length; i++) {
          if (todaysDay === nextProps.rentalDetails.storeTiming.storeOpenHours[i].dayOfWeek) {
            console.log(".dayOfWeek", nextProps.rentalDetails.storeTiming.storeOpenHours[i].openHours.close);
            this.setState({
              storeClosing: nextProps.rentalDetails.storeTiming.storeOpenHours[i].openHours.close,
              storeOpening: nextProps.rentalDetails.storeTiming.storeOpenHours[i + 1].openHours.open
            })

          }
        }
      }

    }

    if (!Util.isEmpty(nextProps.blockItemDetails.response)) {
      if (this.nextButtonClicked) {
        this.nextButtonClicked = false;
        this.hideLoader();
        var blockItemResponse = nextProps.blockItemDetails.response
        if (blockItemResponse.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
          this.logger.getLogger().debug("fillingRentalInfo: componentWillRecieveProps: response recieved ");
          Actions.push(AppConstants.SCREEN_NAMES.RENTAL.PRE_RENTAL_AGREEMENT, ({ screenProps: "FillingRentalInfo" }));
        } else if (blockItemResponse.responseCode != AppConstants.STRINGSUCCESSRETCODE) {
          this.logger.getLogger().info("ERROR: fillingRentalInfo: componentWillRecieveProps: blockItemDetails responseMessage error");
          Alert.alert(
            blockItemResponse.responseMessage, textLabel.messages.emptyError,
            [
              {
                text: AppConstants.ALERT_OK_BUTTON_TITLE,
              },
            ],
            { cancelable: false },
          );
        }
      }
    } else if (nextProps.rentalDetails.rentDurationResponse && this.rentDurationValues.length == 0) {
      var rentalItemResponse = nextProps.rentalDetails.rentDurationResponse
      this.logger.getLogger().debug("fillingRentalInfo: componentWillRecieveProps: response recieved rentDurationResponse");
      if (rentalItemResponse.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
        rentDuration = rentalItemResponse.itemDuration;
        this.rentDurationValues = []
        for (i = 0; i < rentDuration.length; i++) {
          itemDuration = rentDuration[i] + ' Hours'
          data = { 'title': itemDuration }
          this.rentDurationValues.push(data)
        }
      } else if (rentalItemResponse.responseCode != AppConstants.STRINGSUCCESSRETCODE) {
        this.logger.getLogger().info("ERROR: fillingRentalInfo: componentWillReceiveProps: frontEnd Validations Faliure: responseMessage")
        Alert.alert(
          rentalItemResponse.message, textLabel.messages.emptyError,
          [
            {
              text: AppConstants.ALERT_OK_BUTTON_TITLE,
            },
          ],
          { cancelable: false },
        );
      }
    } else if (nextProps.rentalDetails.isSystemError) {
      this.logger.getLogger().info("ERROR: fillingRentalInfo: componentWillReceiveProps: frontEnd Validations Faliure: SystemError");
      Alert.alert(
        textLabel.messages.errorWentWrong, textLabel.messages.emptyError,
        [
          {
            text: AppConstants.ALERT_OK_BUTTON_TITLE,
          },
        ],
        { cancelable: false },
      );
    }
    else if (nextProps.blockItemDetails.isSystemError) {
      this.logger.getLogger().info("ERROR: fillingRentalInfo: componentWillRecieveProps:blockItemDetails SystemError");
      Alert.alert(
        textLabel.messages.errorWentWrong, textLabel.messages.emptyError,
        [
          {
            text: AppConstants.ALERT_OK_BUTTON_TITLE,
          },
        ],
        { cancelable: false },
      );
    }
    this.logger.getLogger().info("exiting: fillingRentalInfo: componentWillRecieveProps");

  }

  //-----**** onLeftSwipe call for nevigating to prev Component//-----****
  onLeftSwipe() {
    //this.logger.getLogger().info("entering: fillingRentalInfo: onLeftSwipe");
    Actions.pop();
    // this.logger.getLogger().info("exiting: fillingRentalInfo: onLeftSwipe");

  }

  //-----**** onRightSwipe call for nevigating to next Component //-----****
  onRightSwipe() {
    this.showLoader();
    this.nextButtonClicked = true;
    console.log("onRightSwipe>>>>");
    if (!Util.isEmpty(this.state.tmName) && !Util.isEmpty(this.state.VIN) && !Util.isEmpty(this.state.trailerLicense) && !Util.isEmpty(this.state.returnDateTime)) {
      console.log("fillingRentalInfo: onRightSwipe: frontEnd Validations Success");
      trailerDamageStatus = this.state.trailerDamages ? "Y" : "N";

      var headerParams = { params: this.props.headerParams.headerParameters };
      var rentalInfo = [this.state.tmName, this.state.VIN, this.state.trailerLicense, this.state.dateTimeRented, this.state.selectedRentDuration, this.state.returnDateTime, this.state.trailerDamages]
      this.props.rentalInfo(rentalInfo, headers)

      //-----**** uncomment below code for api call //-----****
      var itemDetails = [this.itemStatusData.itemId,
        this.props.customerDLInfo.DriverLicenseNumber,
        this.props.customerDLInfo.DriverLicenseState,
        this.props.customerDLInfo.DriverLicenseExpiration,
        this.props.customerDLInfo.DOB,
        this.props.customerDLInfo.InsuranceCompanyName,
        this.props.customerDLInfo.insurancePolicyNumber,
        "31234124",
        this.state.dateTimeRented,
        this.state.returnDateTime,
        this.state.tmName,
        "Y",
        this.state.selectedRentDuration,
        trailerDamageStatus]

      console.log("item_status>>", JSON.stringify(this.itemStatusData));


      let headers = {
        "params": {
          deviceName: this.props.headerParams.headerParameters.deviceName,
          storeId: this.props.headerParams.headerParameters.storeId,
          applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
          userId: this.props.headerParams.headerParameters.userId,
          channelType: this.props.headerParams.headerParameters.channelType,
          localTimeZone: this.props.headerParams.headerParameters.localTimeZone
        },
        "urlVariable": { itemStoreId: this.itemStatusData.itemStoreId, rentalNumber: this.props.inspectionQuestions.agreementNumber.rentalNumber } //real item ID


      }

      this.props.blockRentalItem(itemDetails, headers)


    } else {
      console.log("onRightSwipe>>>>else-----------");
      this.nextButtonClicked = false;
      this.logger.getLogger().info("ERROR: fillingRentalInfo: onRightSwipe: frontEnd Validations Faliure: errorLableMissingField")
      Alert.alert(
        textLabel.messages.errorLableMissingField, textLabel.messages.errorType1,
        [
          {
            text: AppConstants.ALERT_OK_BUTTON_TITLE,
          },
        ],
        { cancelable: false },
      );
    }
    this.logger.getLogger().info("exiting: fillingRentalInfo: onRightSwipe");
  }

  //-----**** handleTMName for handling TMName TextInput  //-----****
  //@ name
  handleTMName = (name) => {
    this.logger.getLogger().debug("entering: fillingRentalInfo: handleTMName with name: " + name);
    name = Util.alphaNumericWithSpacesAndDecimal(name)
    this.setState({
      tmName: name
    })
    this.logger.getLogger().info("exiting: fillingRentalInfo: handleTMName");
  }

  //-----**** handleRentDuration for handling rent duration TextInput //-----****
  //@ item
  handleRentDuration = (item) => {
    this.logger.getLogger().debug("entering: fillingRentalInfo: handleRentDuration with item value: " + item);
    var rentDuration = item.title
    var durationFields = rentDuration.split(' ')
    var duration = durationFields[0]
    var todayDate = moment(this.today).format('MM/DD/YYYY')
    var returnOptedTime = moment(this.state.dateTimeRented).add(duration, 'hour').format('MM/DD/YYYY hh:mm A');//expected ret
    var storeClosingTime = moment(todayDate + " " + this.state.storeClosing).format('MM/DD/YYYY hh:mm A')
    console.log("dekhoo", returnOptedTime, storeClosingTime)
    var nextDay = moment(this.today).add(1, 'day').format('MM/DD/YYYY')
    var storeOpeningTime = moment(nextDay + " " + this.state.storeOpening).format('MM/DD/YYYY hh:mm A')
    var returnOptedDate = new Date(returnOptedTime)
    var storeClosingDate = new Date(storeClosingTime)
    var storeOpeningDate = new Date(storeOpeningTime)

    console.log("Duration_inh", returnOptedDate, storeClosingDate, storeOpeningDate);
    if (storeOpeningDate.getTime() < returnOptedDate.getTime()) {
      var openingDay = moment(storeOpeningDate).format('DD')
      var returnDay = moment(returnOptedDate).format('DD')
      var day = returnDay - openingDay
      storeOpeningTime = moment(storeOpeningDate).add(day, 'day').format('MM/DD/YYYY hh:mm A')
      storeOpeningDate = new Date(storeOpeningTime)
    }

    if (storeClosingDate.getTime() < returnOptedDate.getTime() && returnOptedDate.getTime() < storeOpeningDate.getTime()) {
      if (duration == '4') {
        this.logger.getLogger().info("ERROR: fillingRentalInfo: handleRentDuration: frontEnd Validations Faliure: errorStoreClosing")
        Alert.alert(
          textLabel.messages.errorStoreClosing, textLabel.messages.emptyError,
          [
            {
              text: AppConstants.ALERT_OK_BUTTON_TITLE,
            },
          ],
          { cancelable: false },
        );
      } else {
        this.setState({
          selectedRentDuration: duration,
          returnDateTime: storeOpeningTime
        })
      }
    } else {
      this.setState({
        selectedRentDuration: duration,
        returnDateTime: returnOptedTime
      })
    }
    this.logger.getLogger().info("exiting: fillingRentalInfo: handleRentDuration");
  }

  //-----**** onChangeVIN is called when dropdown state get change for VIN TextInput //-----****
  //@value
  onChangeVIN(value) {
    this.logger.getLogger().debug("entering: fillingRentalInfo: onChangeVIN with value: " + value);
    trailerLicenseNo = '';
    const found = ISRItems.some(data => data.trailerVinNumber === value);
    if (found) {
      const i = ISRItems.findIndex((data) => data.trailerVinNumber === value);
      trailerLicenseNo = ISRItems[i].trailerLincenseNumber;
    }
    this.setState({
      VIN: value,
      trailerLicense: trailerLicenseNo
    })
    this.logger.getLogger().info("exiting: fillingRentalInfo: onChangeVIN");
  }

  //-----**** showDateTimePicker for showing DATE/TIME picker //-----****
  //@type
  showDateTimePicker = (type) => {
    this.logger.getLogger().info("entering: fillingRentalInfo: showDateTimePicker");
    this.setState({
      isDateTimePickerVisible: true,
      dateType: type
    });
    this.logger.getLogger().info("exiting: fillingRentalInfo: showDateTimePicker");
  };

  //-----**** hideDateTimePicker for hiding DATE/TIME picker //-----****
  hideDateTimePicker = () => {
    this.logger.getLogger().info("entering: fillingRentalInfo: hideDateTimePicker");
    this.setState({ isDateTimePickerVisible: false });
    this.logger.getLogger().info("exiting: fillingRentalInfo: hideDateTimePicker");
  };


  //-----**** handleDatePicked is called after selecting date from date picker//-----****
  //@date
  handleDatePicked = date => {
    this.logger.getLogger().info("entering: fillingRentalInfo: handleDatePicked");
    var optedTime = moment(date).format('MM/DD/YYYY hh:mm A');
    if (this.state.dateType == 'rent') {
      this.setState({
        dateTimeRented: optedTime
      })
      this.hideDateTimePicker();
    } else {
      if (optedTime >= this.today && optedTime > this.state.dateTimeRented) {
        this.setState({
          returnDateTime: optedTime
        })
        this.hideDateTimePicker();
      } else {
        this.logger.getLogger().info("ERROR: fillingRentalInfo: handleDatePicked: frontEnd Validations Faliure: errorReturnTime");
        Alert.alert(
          textLabel.messages.errorReturnTime, textLabel.messages.emptyError,
          [
            {
              text: AppConstants.ALERT_OK_BUTTON_TITLE,
              onPress: () => this.hideDateTimePicker()
            },
          ],
          { cancelable: false },
        );
      }
    }
    this.logger.getLogger().info("exiting: fillingRentalInfo: handleDatePicked");
  };


  render() {
    this.logger.getLogger().info("entering: fillingRentalInfo: render");


    return (
      <View style={common.mainParentView}>

        <HeaderComponent columnStatus={AppConstants.HEADER_DEFAULT_COLUMN_STATUS} labelName={[textLabel.messages.rentalInfoLabel, this.agreementNumber]} />

        <KeyboardAvoidingView style={common.keybordAvoidingView} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>

          <ScrollView keyboardShouldPersistTaps={AppConstants.SCROLL_VIEW_KEYBOARD_DEFAULT_TAP_BEHAVIOUR} keyboardDismissMode={AppConstants.KEYBOARD_DEFAULT_DISMISS_MODE}>

            <View style={[common.textInputMainView, styles.textInputMainView]}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.TMName}
              </Text>

              <TextInput
                autoCorrect={false}
                style={[common.textInputView, styles.textInputView, { height: Math.max(25, this.state.height) }]}
                placeholder={textLabel.messages.requiredPlaceholder}
                textAlign={'left'}
                maxLength={75}
                multiline={true}
                onChangeText={this.handleTMName}
                onContentSizeChange={(event) => {
                  this.setState({ height: event.nativeEvent.contentSize.height })
                } }
                value={this.state.tmName}
                />
            </View>

            <View style={common.viewSeparator} />

            <View style={[common.textInputMainView, styles.textInputMainView]}>


              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.VIN}
              </Text>

              {this.vinList.length > 1 ?
                <View style={[common.textInputView, styles.textInputView, styles.temp]}>
                  <Dropdown
                    data={this.vinListValue}
                    selectedItemColor={appColors.colors.$defaultRadioButtonTextColor}
                    // containerStyle={common.DropdownContainerView}
                    containerStyle={{ flex: 0.85 }}
                    rippleInsets={{ top: 16, bottom: -8 }}
                    dropdownOffset={{ top: 32, left: 0 }}
                    animationDuration={225}
                    shadeOpacity={0.12}
                    value={this.state.VIN}
                    placeholder={textLabel.messages.requiredPlaceholder}
                    textColor={appColors.colors.$defaultInputTextColor}
                    textAlignVertical={'auto'}
                    onChangeText={(value) => { this.onChangeVIN(value) } }
                    textAlign={'auto'}
                    /></View>

                :

                <TextInput
                  autoCorrect={false}
                  style={[common.textInputView, styles.textInputView]}
                  placeholder={textLabel.messages.requiredPlaceholder}
                  textAlign={'justify'}
                  editable={false}
                  value={this.state.VIN}
                  />}
            </View>

            <View style={common.viewSeparator} />

            {this.progressIndicatorRenderItem() }


            <View style={[common.textInputMainView, styles.textInputMainView]}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.trailerLicense}
              </Text>

              <TextInput
                autoCorrect={false}
                style={[common.textInputView, styles.textInputView]}
                placeholder={textLabel.messages.requiredPlaceholder}
                textAlign={'left'}
                editable={false}
                value={this.state.trailerLicense}
                />

            </View>

            <View style={common.viewSeparator} />

            <View style={[common.textInputMainView, styles.textInputMainView]}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.dateTimeRented}
              </Text>

              <TouchableOpacity disabled={true} style={[common.textInputView, styles.textInputView, styles.dateTextInputView]}>
                <Text style={[common.textInputPlaceHolderText, { color: appColors.colors.$defaultInputTextColor }]}>
                  {this.state.dateTimeRented}
                </Text>
              </TouchableOpacity>

            </View>

            <View style={common.viewSeparator} />

            <View style={[common.textInputMainView, styles.textInputMainView]}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.rentDuration}
              </Text>

              <View style={[common.horizontalRowContentView, styles.radioButtonParentView, styles.dateTextInputView]}>
                <FlatList data={this.rentDurationValues} renderItem={this._renderItem} extraData={this.state} horizontal={true} scrollEnabled={false}>

                </FlatList>
              </View>

            </View>

            <View style={common.viewSeparator} />

            <View style={[common.textInputMainView, styles.textInputMainView]}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.returnDateTime}
              </Text>

              <TouchableOpacity onPress={() => this.showDateTimePicker('return') } style={[common.textInputView, styles.textInputView, styles.dateTextInputView]}>
                <Text style={Util.isEmpty(this.state.returnDateTime) ? common.textInputPlaceHolderText : [common.textInputPlaceHolderText, { color: appColors.colors.$defaultInputTextColor }]}>
                  {Util.isEmpty(this.state.returnDateTime) ? textLabel.messages.requiredPlaceholder : this.state.returnDateTime}
                </Text>
              </TouchableOpacity>


            </View>

            <View style={common.viewSeparator} />

            <View style={[common.textInputMainView, styles.textInputMainView]}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.trailerDamages}
              </Text>

              <View style={[common.horizontalRowContentView, styles.radioButtonParentView, styles.dateTextInputView]}>
                <TouchableOpacity onPress={() => { this.setState({ trailerDamages: true }) } } style={[common.textInputMainView, styles.textInputView, styles.radioButtonView]}>
                  <Image style={common.cameraImageView} source={this.state.trailerDamages ? screenImages.images.radioButtonSelected1 : screenImages.images.radioButtonUnselected1} />
                  <Text style={[common.radioButtonView, styles.radioButtonText]}>
                    {textLabel.messages.yes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setState({ trailerDamages: false }) } } style={[common.textInputMainView, styles.textInputView, styles.radioButtonView, styles.damagesRadioButtonSpaceBetween]}>
                  <Image style={common.cameraImageView} source={this.state.trailerDamages ? screenImages.images.radioButtonUnselected1 : screenImages.images.radioButtonSelected1} />
                  <Text style={[common.radioButtonView, styles.radioButtonText]}>
                    {textLabel.messages.no}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={common.viewSeparator} />


          </ScrollView>

        </KeyboardAvoidingView>

        <BottomNavigationComponent leftSwipe={this.onLeftSwipe} rightSwipe={this.onRightSwipe} bothSideSwipable={true} />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={"datetime"}
          minimumDate={new Date() }
          />

      </View>

    );

  }

  //-----**** _renderItem is called for rendering rent duration//-----****
  //@item
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.handleRentDuration(item) } style={[common.textInputMainView, styles.textInputView, styles.radioButtonView]}>
      <Image style={common.cameraImageView} source={((this.state.selectedRentDuration + ' Hours') == item.title) ? screenImages.images.radioButtonSelected1 : screenImages.images.radioButtonUnselected1} />
      <Text style={[common.radioButtonView, styles.radioButtonText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )

}


const mapDispatchToProps = (dispatch, ownProps) => {
  let logger = new JsLoggerService();
  logger.getLogger().info("entering: fillingRentalInfo: mapDispatchToProps");
  return {
    getRentDuration(reqParams, headerParams) {
      let params = {
        'parameters': reqParams,
        'headers': headerParams
      };

      dispatch({ type: actionConstants.REQUEST_RETRIEVE_RENT_DURATION, params });
    },

    blockRentalItem(reqParams, headerParams) {

      params1 = rentalRequestParams(actionConstants.REQUEST_BLOCK_RENTAL_ITEM, reqParams);

      let params = {
        'parameters': params1,
        'headers': headerParams
      };
      console.log("params>>>", params);
      dispatch({ type: actionConstants.REQUEST_BLOCK_RENTAL_ITEM, params });
    },

    rentalInfo(rentalInfo, header) {
      params = rentalRequestParams(actionConstants.REQUEST_FILLING_RENTAL_INFO, rentalInfo)
      params = {
        'parameters': params,
        'headers': header
      }
      console.log("yahasw,", params);
      dispatch({ type: actionConstants.REQUEST_FILLING_RENTAL_INFO, params })
    },

    getTiming(reqParams, header) {
      //  params1 = rentalRequestParams(actionConstants.REQUEST_RETRIEVE_STORE_TIMING, reqParams)
      params = {
        'parameters': reqParams,
        'headers': header
      }
      console.log("getTiming>", reqParams);
      dispatch({ type: actionConstants.REQUEST_RETRIEVE_STORE_TIMING, params })
    }
  }
}

function mapStateToProps(state) {
  return {
    headerParams: state.HeaderParamsReducer,
    customerDLInfo: state.CustomerDLInfoReducer,
    blockItemDetails: state.BlockRentalItemReducer,
    rentalDetails: state.FillingRentalInfoReducer,
    retrieveStatus: state.ItemStatusReducer,
    inspectionQuestions: state.InspectionReducer,
    loginUser: state.LoginScreenReducer,

  }
}

export default FillingRentalInfo = connect(mapStateToProps, mapDispatchToProps)(FillingRentalInfo)