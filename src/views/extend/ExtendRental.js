import React, { Component } from 'react';
import { Text, View, ScrollView, Keyboard, TextInput, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import * as textLabel from "../../config/TranslationProperties";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import common from '../../styles/shared/Components.js';
import styles from '../../styles/extend/ExtendRental.js';
import appColors from '../../styles/shared/appColors.js';
import { Actions } from "react-native-router-flux";
import * as screenImages from "../../config/ImageProperties";
import { Util } from '../../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from "moment";
import { JsLoggerService } from "../../services/jsLoggerService";
import { connect } from 'react-redux';
import { commonRequestParams } from "../../request/commonRequest";
import { extendRequestParams } from "../../request/extendRequest";
import { actionConstants } from '../../actions/ActionConstants';
import { AppConstants } from '../../constants/AppConstants';
import Spinner from "../common/shared/Spinner.js";

var rentDurationArray = []

class ExtendRental extends Component {

  constructor(props) {
    super(props);
    this.date = new Date();
    this.logger = new JsLoggerService();
    this.elapsedTime = '';
    todaysDay = '',
      this.updatedElapsedTime = '',
      this.maxElapsedTime = '',
      this.updatedElapsedTimes = '',
      this.agreementNumber = "",
      this.progressIndicatorRenderItem = this.progressIndicatorRenderItem.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Tuesday", "Friday", "Saturday"],
      this.state = {
        labelName: [textLabel.messages.extendRentalLabel],
        trailerDamages: false,
        rentDuration: ['4 Hours', '8 Hours'],
        selectedRentDuration: '',
        itemStoreId: '',
        comments: '',
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
        loaderLabelName: [textLabel.messages.customerSignature],
        loaderIsLoading: false
      }
    this.handleRentDuration = this.handleRentDuration.bind(this);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.rentalExtend = this.rentalExtend.bind(this);
    this.updateExtendTime = this.updateExtendTime.bind(this);
  }


  componentDidMount() {

    this.showLoader();
    var headerParams = { params: this.props.headerParams.headerParameters };
    headerParams.urlVariable = { itemId: this.props.selectedItem.itemNumber };
    this.props.getRentDuration('', headerParams);
  }



  componentWillMount() {
    this.showLoader();
    var headerParams = { params: this.props.headerParams.headerParameters };
    this.props.getTiming("", headerParams);


    this.elapsedTime = this.props.selectedItem.elapsedTime;
    this.maxElapsedTime = this.props.selectedItem.maxElapsedTime;
    this.agreementNumber = this.props.selectedItem.rentalNumber;

    this.setState({
      itemStoreId: this.props.selectedItem.itemStoreId,
      tmName: this.props.selectedItem.teamMemberName,
      VIN: this.props.selectedItem.trailerVinNumber,
      trailerLicense: this.props.selectedItem.trailerLincenseNumber,
      dateTimeRented: this.props.selectedItem.rentalDate,
      comments: this.props.selectedItem.rentalExtensionComments,
    })

    this.date = this.props.selectedItem.expectedReturnDate;


    rentDurationArray = []
    for (i = 0; i < this.state.rentDuration.length; i++) {
      data = { 'title': this.state.rentDuration[i] }
      rentDurationArray.push(data)
    }
  }

  //-----****  showLoader call for showing activityIndicator //-----****
  showLoader = () => {
    this.logger.getLogger("entering: CustomerSignature: showLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: true
    });
    this.logger.getLogger("exiting: CustomerSignature: showLoader");
  };

  //-----**** hideLoader call for hiding activityIndicator //-----****
  hideLoader = () => {
    this.logger.getLogger("entering: CustomerSignature: hideLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: false
    });
    this.logger.getLogger("exiting: CustomerSignature: hideLoader");
  };

  //-----**** progressIndicatorRenderItem to call Spinner(Activity Indicator) component  //-----****
  progressIndicatorRenderItem() {
    this.logger.getLogger("entering: CustomerSignature: progressIndicatorRenderItem");
    if (this.state.loaderIsLoading) {
      Keyboard.dismiss()
      return (<Spinner animating={this.state.loaderIsLoading} />);
    }
    this.logger.getLogger("exiting: CustomerSignature: progressIndicatorRenderItem");
  }

  onLeftSwipe() {
    this.props.addAppDetails(['']);
    Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CURRENT_RENTAL);
  }

  onRightSwipe() {


    if (!Util.isEmpty(this.state.returnDateTime)) {
      var time = this.state.returnDateTime;

      Alert.alert(
        textLabel.messages.updateTimeHeader, textLabel.messages.askUpdation + time + textLabel.messages.quesMark,
        [
          {
            text: 'No', onPress: () => console.log("cancel Pressed"),
          },
          {
            text: 'Yes', onPress: () => { this.rentalExtend(this.state.selectedRentDuration) },
          },
        ],
        { cancelable: false },
      );

    } else {
      Alert.alert(
        textLabel.messages.emptyError, textLabel.messages.errorFieldRequired,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
    }
  }

  updateExtendTime() {
    this.showLoader();

    if (!Util.isEmpty(this.state.selectedRentDuration)) {
      let headerParams = {
        params: this.props.headerParams.headerParameters,
        urlVariable: { rentalNumber: this.props.selectedItem.rentalNumber }
      }
      let rentalParameters =
        [this.state.itemStoreId,
          this.props.loginUser.userLoginData.response['operator-id'],
          this.state.tmName,
          this.state.selectedRentDuration,
          this.state.returnDateTime];
      this.props.extendRentalDetails(rentalParameters, headerParams);

    }

  }


  componentWillReceiveProps(nextProps) {

    if (!Util.isEmpty(nextProps.rentalDetails.storeTiming.storeOpenHours)) {
      this.hideLoader();
      if (nextProps.rentalDetails.storeTiming.storeOpenHours.length > 0) {

        var d = new Date();
        todaysDay = this.days[d.getDay()];


        for (i = 0; i < nextProps.rentalDetails.storeTiming.storeOpenHours.length; i++) {
          if (todaysDay === nextProps.rentalDetails.storeTiming.storeOpenHours[i].dayOfWeek) {

            this.setState({
              storeClosing: nextProps.rentalDetails.storeTiming.storeOpenHours[i].openHours.close,
              storeOpening: nextProps.rentalDetails.storeTiming.storeOpenHours[i + 1].openHours.open
            })

          }
        }
      }

    }

    if (nextProps.rentalDetails.rentDurationResponse && (Util.isEmpty(this.rentDurationValues) || (this.rentDurationValues.length == 0))) {
      var rentalItemResponse = nextProps.rentalDetails.rentDurationResponse
      // this.logger.getLogger().debug("fillingRentalInfo: componentWillRecieveProps: response recieved rentDurationResponse");
      this.hideLoader();
      console.log("Check Resposne", rentalItemResponse);
      console.log("fillingRentalInfo: componentWillRecieveProps: response recieved rentDurationResponse");
      if (rentalItemResponse.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
        rentDuration = rentalItemResponse.itemDuration;
        this.rentDurationValues = []
        for (i = 0; i < rentDuration.length; i++) {
          itemDuration = rentDuration[i] + ' Hours'
          data = { 'title': itemDuration }
          this.rentDurationValues.push(data)
        }
      } else if (rentalItemResponse.responseCode != AppConstants.STRINGSUCCESSRETCODE) {
        // this.logger.getLogger().info("ERROR: fillingRentalInfo: componentWillReceiveProps: frontEnd Validations Faliure: responseMessage")
        console.log("Part2:", rentalItemResponse.responseCode);
        this.hideLoader();
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
      // this.logger.getLogger().info("ERROR: fillingRentalInfo: componentWillReceiveProps: frontEnd Validations Faliure: SystemError");
      console.log("Part3:", nextProps.rentalDetails.isSystemError);
      this.hideLoader();
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

    if (Util.isEmpty(nextProps.extendRental.extendRentalData)) {
    } else if (!Util.isEmpty(nextProps.extendRental.extendRentalData)) {
      this.hideLoader();
      if ((nextProps.extendRental.extendRentalData.responseCode === AppConstants.RESPONSECODE)) {
        console.log("scheck2", nextProps.extendRental.extendRentalData.responseCode);
        Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU);
        this.props.clearExtendData();
        let storeId = this.props.headerParams.headerParameters.storeId;
        let itemStatus = ['REN', 'ISR'];
        let rentalParameters = [storeId, itemStatus, AppConstants.DEFAULT_ITEM_NUMBER];

        let headerParams = {
          params: this.props.headerParams.headerParameters
        }
        this.props.retrieveStatus(rentalParameters, headerParams);
      }
      else if (nextProps.extendRental.isSystemError) {
        this.hideLoader();
        alert(textLabel.messages.errorWentWrong);
      }
      else if ((nextProps.extendRental.extendRentalData.responseCode !== AppConstants.RESPONSECODE)) {
        this.hideLoader();
        Alert.alert(
          textLabel.messages.emptyError, textLabel.messages.errorNoRentalExtension,
          [
            {
              text: textLabel.messages.ok,
            },
          ],
          { cancelable: false },
        );
      }
    }
  }


  rentalExtend(value) {
    this.updatedElapsedTime = Number(this.elapsedTime) + Number(value)
    if (this.updatedElapsedTime > this.maxElapsedTime) {
      Alert.alert(
        textLabel.messages.emptyError, textLabel.messages.extendLapsed,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
    }
    else {
      this.updateExtendTime();
    }

  }

  handleRentDuration = (item) => {
    var rentDuration = item.title
    var durationFields = rentDuration.split(' ')
    var duration = durationFields[0]
    var expReturnDate = moment(this.date).format('MM/DD/YYYY');
    var returnOptedTime = moment(this.date).add(duration, 'hour').format('MM/DD/YYYY hh:mm A');
    var storeClosingTime = moment(expReturnDate + " " + this.state.storeClosing).format('MM/DD/YYYY hh:mm A')
    var nextDay = moment(this.date).add(1, 'day').format('MM/DD/YYYY')
    var storeOpeningTime = moment(nextDay + " " + this.state.storeOpening).format('MM/DD/YYYY hh:mm A')

    var returnOptedDate = new Date(returnOptedTime)
    var storeClosingDate = new Date(storeClosingTime)
    var storeOpeningDate = new Date(storeOpeningTime)


    if (storeOpeningDate.getTime() < returnOptedDate.getTime()) {
      var openingDay = moment(storeOpeningDate).format('DD')
      var returnDay = moment(returnOptedDate).format('DD')
      var day = returnDay - openingDay
      storeOpeningTime = moment(storeOpeningDate).add(day, 'day').format('MM/DD/YYYY hh:mm A')
      storeOpeningDate = new Date(storeOpeningTime)
    }

    if (storeClosingDate.getTime() < returnOptedDate.getTime() && returnOptedDate.getTime() < storeOpeningDate.getTime()) {
      if (duration == '4') {
        Alert.alert(
          textLabel.messages.errorStoreClosing, textLabel.messages.emptyError,
          [
            {
              text: 'OK',
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
        returnDateTime: returnOptedTime,
      })

    }
  }


  render() {
    let agreementNumber = "";
    if (!Util.isEmpty(this.props.inspectionQuestions.agreementNumber)) {
      if (Number(this.props.inspectionQuestions.agreementNumber.responseCode) === 0)
        agreementNumber = this.props.inspectionQuestions.agreementNumber.rentalNumber;
    }
    return (
      <View style={common.mainParentView}>

        <HeaderComponent columnStatus='true' labelName={[this.state.labelName, this.agreementNumber]} />
        <View style={[common.textInputMainView, styles.textInputMainView]}>

          <Text style={[common.labelView, styles.labelView]}>
            {textLabel.messages.TMName}
          </Text>
          {Util.isEmpty(this.state.tmName) ? <Text style={[common.textInputView, styles.textInputView, styles.marginTop, { height: Math.max(25, this.state.height) }]}>Null</Text> : <TextInput
            editable={false}
            style={[common.textInputView, styles.textInputView, styles.marginTop, { height: Math.max(25, this.state.height) }]}
            value={this.state.tmName}
            />}

        </View>

        <View style={common.viewSeparator} />

        <View style={[common.textInputMainView, styles.textInputMainView]}>

          <Text style={[common.labelView, styles.labelView]}>
            {textLabel.messages.VIN}
          </Text>
          <TextInput
            style={[common.textInputView, styles.textInputView]}
            editable={false}
            value={this.state.VIN}
            />
        </View>

        <View style={common.viewSeparator} />

        <View style={[common.textInputMainView, styles.textInputMainView]}>

          <Text style={[common.labelView, styles.labelView]}>
            {textLabel.messages.trailerLicense}
          </Text>

          <TextInput
            autoCorrect={false}
            style={[common.textInputView, styles.textInputView]}
            placeholder={textLabel.messages.requiredPlaceholder}
            editable={false}
            value={this.state.trailerLicense}
            />

        </View>

        <View style={common.viewSeparator} />

        <View style={[common.textInputMainView, styles.textInputMainView]}>

          <Text style={[common.labelView, styles.labelView]}>
            {textLabel.messages.dateTimeRented}
          </Text>
          <TextInput
            style={[common.textInputView, styles.textInputView]}
            editable={false}
            value={this.state.dateTimeRented}
            />
        </View>

        <View style={common.viewSeparator} />

        <View style={[common.textInputMainView, styles.textInputMainView]}>

          <Text style={[common.labelView, styles.labelView]}>
            {textLabel.messages.rentDuration}
          </Text>

          <View style={[common.horizontalRowContentView, styles.radioButtonParentView, styles.dateTextInputView]}>
            <FlatList data={rentDurationArray} renderItem={this._renderItem} extraData={this.state} horizontal={true} scrollEnabled={false}>
            </FlatList>
          </View>

        </View>

        <View style={common.viewSeparator} />

        <View style={[common.textInputMainView, styles.textInputMainView]}>

          <Text style={[common.labelView, styles.labelView]}>
            {textLabel.messages.returnDateTime}
          </Text>

          <TextInput
            style={Util.isEmpty(this.state.returnDateTime) ? [common.textInputPlaceHolderText, styles.labelView] : [common.textInputView, styles.textInputView, styles.dateTextInputView]}
            editable={false}
            value={Util.isEmpty(this.state.returnDateTime) ? textLabel.messages.requiredPlaceholder : this.state.returnDateTime}
            />
        </View>
        {this.progressIndicatorRenderItem() }
        <View style={common.viewSeparator} />
        <BottomNavigationComponent leftSwipe={this.onLeftSwipe} rightSwipe={this.onRightSwipe} bothSideSwipable={true} />

      </View>

    );
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.handleRentDuration(item) } style={[common.textInputMainView, styles.textInputView, styles.radioButtonView]}>
      <Image style={common.cameraImageView} source={((this.state.selectedRentDuration + ' Hours') == item.title) ? screenImages.images.radioButtonSelected1 : screenImages.images.radioButtonUnselected1} />
      <Text style={[common.radioButtonView, styles.radioButtonText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )

}


const mapDispatchToProps = (dispatch) => {
  return {
    getRentDuration(reqParams, headerParams) {
      let params = {
        'parameters': reqParams,
        'headers': headerParams
      };

      dispatch({ type: actionConstants.REQUEST_RETRIEVE_RENT_DURATION, params });
    },

    getTiming(reqParams, header) {

      params = {
        'parameters': reqParams,
        'headers': header
      }

      dispatch({ type: actionConstants.REQUEST_RETRIEVE_STORE_TIMING, params })
    },


    extendRentalDetails(rentalParams, header) {
      {
        let idparam = rentalParams;
        params = extendRequestParams(actionConstants.REQUEST_EXTEND_ITEM_RENTAL, idparam);
        params = {
          'parameters': params,
          'headers': header
        };

        dispatch({ type: actionConstants.REQUEST_EXTEND_ITEM_RENTAL, params });
      }
    },

    retrieveStatus(rentalParams, header) {
      {
        let idparam = rentalParams;
        params = commonRequestParams(actionConstants.REQUEST_ITEM_STATUS, idparam);
        params = {
          'parameters': params,
          'headers': header
        };

        dispatch({ type: actionConstants.REQUEST_ITEM_STATUS, params });
      }
    },

    clearExtendData() {

      dispatch({ type: actionConstants.REQUEST_EXTEND_DATA_CLEAR });
    },

    addAppDetails(parameters) {
      let params = commonRequestParams(actionConstants.REQUEST_APP_DETAILS, parameters);
      dispatch({ type: actionConstants.REQUEST_APP_DETAILS, params });
    }
  }
}

function mapStateToProps(state) {
  return {
    headerParams: state.HeaderParamsReducer,
    inspectionQuestions: state.InspectionReducer,
    rentalDetails: state.FillingRentalInfoReducer,
    loginUser: state.LoginScreenReducer,
    extendRental: state.ExtendItemRentalReducer
  }
}

export default ExtendRental = connect(mapStateToProps, mapDispatchToProps)(ExtendRental)