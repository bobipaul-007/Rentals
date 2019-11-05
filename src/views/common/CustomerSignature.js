import React, { Component } from 'react';
import { Text, InputAccessoryView, FlatList, Image, Keyboard, View, ScrollView, Alert, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import common from '../../styles/shared/Components.js';
import * as textLabel from "../../config/TranslationProperties";
import styles from '../../styles/common/CustomerSignatureStyle';
import { connect } from "react-redux";
import { JsLoggerService } from "../../services/jsLoggerService";
import { Actions } from "react-native-router-flux";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import * as screenImages from "../../config/ImageProperties";
import { AppConstants } from "../../constants/AppConstants";
import { rentalRequestParams } from "../../request/rentalRequest";
import { returnRequestParams } from "../../request/returnRequest";
import { commonRequestParams } from "../../request/commonRequest";
import { Util } from '../../utils/utils';
import { actionConstants } from '../../actions/ActionConstants';
import moment from "moment"
import appColors from '../../styles/shared/appColors.js';
import Orientation from 'react-native-orientation';
import Spinner from "../common/shared/Spinner.js";
let today = new Date();

class CustomerSignature extends Component {

  constructor(props) {
    super(props);
    this.logger = new JsLoggerService();
    this.completeRentalProcedure = this.completeRentalProcedure.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.refresh = this.refresh.bind(this);
    this.progressIndicatorRenderItem = this.progressIndicatorRenderItem.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.agreementNumber = ""
    this.relaxedHours = 0;
    this.isReturnFlow = false;
    this.itemStatusData = {};
    // this.completedFlow = false;
    this.apiCalled = false;

    this.state = {
      dateTime: '',
      returnDateTime: '',
      customerName: '',
      emailAddress: '',
      receiptType: [],
      custSignature: '',
      tmSignature: '',
      custSignFlag: '',
      TMSignFlag: '',
      loaderText: '',
      loaderStatus: false,
      loaderLabelName: [textLabel.messages.customerSignature],
      loaderIsLoading: false
    }

    this.dateTime = React.createRef();
    this.customerName = React.createRef();
    this.emailAddress = React.createRef();
  }

  componentDidMount() {
    this.itemStatusData = this.props.headerParams.appDetails.selectedItem;

    if (this.props.flow === AppConstants.RENTAL_FLOW) {
      this.isReturnFlow = false;
      if (!Util.isEmpty(this.props.inspectionDetails.agreementNumber)) {
        if (Number(this.props.inspectionDetails.agreementNumber.responseCode) === AppConstants.SUCCESSRETCODE)
          this.agreementNumber = this.props.inspectionDetails.agreementNumber.rentalNumber;
      }
    } else if (this.props.flow === AppConstants.RETURN_FLOW) {
      this.isReturnFlow = true;
      this.agreementNumber = this.itemStatusData.rentalNumber;
    }

    var that = this;
    today = Util.getCurrentDateTime();
    today = moment(today).format(AppConstants.DEFAULT_DATE_FORMAT);
    that.setState({
      dateTime: today,
      customerName: this.isReturnFlow ? this.itemStatusData.customerFirstName + " " + this.itemStatusData.customerLastName : this.props.customerDetails.customerInfo.firstName + " " + this.props.customerDetails.customerInfo.lastName,
      emailAddress: this.isReturnFlow ? this.itemStatusData.emailId : this.props.customerDetails.customerInfo.emailId,
      returnDateTime: this.isReturnFlow ? this.itemStatusData.expectedReturnDate : this.props.rentalDetails.response.returnDateTime
    });

    if (this.isReturnFlow) {
      setTimeout(() => { this.checkReturnTimeStatus() }, 1000);
    }
  }

  checkReturnTimeStatus() {
    var returnDate = this.itemStatusData.expectedReturnDate;
    var currentDate = moment(today).format('MM/DD/YYYY hh:mm A')
    var currentDateTime = new Date(currentDate);
    var returnExpectedTime = moment(returnDate).add(this.relaxedHours, 'hour').format('MM/DD/YYYY hh:mm A');
    var returnRelaxedDate = new Date(returnExpectedTime)
    if (currentDateTime.getTime() > returnRelaxedDate.getTime()) {
      Alert.alert(
        textLabel.messages.errorExceededReturnTime, textLabel.messages.emptyError,
        [
          {
            text: 'OK',
          },
        ],
        { cancelable: false },
      );
    }
  }

  refresh(status) {
    custFlag = '';
    tmFlag = '';
    custSign = '';
    tmSign = '';

    if (status.signType === "CustomerSign") {
      custFlag = 'done';
      tmFlag = this.state.TMSignFlag;

      custSign = status.signature;
      tmSign = this.state.tmSignature;
    } else if (status.signType === "TMSign") {
      custFlag = this.state.custSignFlag;
      tmFlag = 'done';

      custSign = this.state.custSignature;
      tmSign = status.signature;
    }

    this.setState({
      custSignature: custSign,
      tmSignature: tmSign,
      custSignFlag: custFlag,
      TMSignFlag: tmFlag
    });
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
    Actions.pop();
  }

  completeRentalProcedure() {
    this.logger.getLogger().info("inside completeRentalProcedure");

    if (Util.isEmpty(this.state.customerName) || Util.isEmpty(this.state.emailAddress) || Util.isEmpty(this.state.returnDateTime) || this.state.custSignFlag != 'done' || (this.state.TMSignFlag != 'done' && this.isReturnFlow)) {
      Alert.alert(
        textLabel.messages.errorLableMissingField, textLabel.messages.errorType1,
        [
          {
            text: AppConstants.ALERT_OK_BUTTON_TITLE,
          },
        ],
        { cancelable: false },
      );
    } else if (this.state.receiptType.length == 0) {
      Alert.alert(
        textLabel.messages.emptyError, textLabel.messages.errorReceiptType,
        [
          {
            text: textLabel.messages.ok, onPress: () => { }
          },
        ],
        { cancelable: false }
      );
    } else if (!Util.isEmailValid(this.state.emailAddress)) {
      Alert.alert(
        textLabel.messages.emptyError, textLabel.messages.errorType6,
        [
          {
            text: textLabel.messages.ok, onPress: () => { }
          },
        ],
        { cancelable: false }
      );
    } else {
      if (this.isReturnFlow) {
        this.updateReturnDetails();
      } else {
        this.updateRentalDetails();
      }
    }
  }

  updateRentalDetails() {
    this.apiCalled = true;
    this.showLoader();
    let headers = {
      params: this.props.headerParams.headerParameters,
      urlVariable: { rentalNumber: this.agreementNumber, action: AppConstants.DEFAULT_RENTAL_FLOW_ACTION }
    }

    let updateRentalDetailsParams = [
      this.itemStatusData.itemStoreId,
      AppConstants.DEFAULT_RENTAL_PICTURES_STATUS,
      this.props.preRentalAgreementData.comments,
      this.props.preRentalAgreementData.custInitials,
      this.props.preRentalAgreementData.tMInitials,
      AppConstants.DEFAULT_DISCLOSURE_AGREED_STATUS,
      this.state.custSignature,
      this.state.receiptType,
      String(this.props.rentalDetails.response.trailerDamages) === AppConstants.DEFAULT_TRAILER_DAMAGES_TRUE ? AppConstants.DEFAULT_TRAILER_DAMAGES_YES : AppConstants.DEFAULT_TRAILER_DAMAGES_NO,
      this.state.returnDateTime,
      this.state.emailAddress
    ];
    this.props.UpdateRentalDetails(updateRentalDetailsParams, headers);
  }

  updateReturnDetails() {
    this.apiCalled = true;
    this.showLoader();
    let headers = {
      params: this.props.headerParams.headerParameters,
      urlVariable: { rentalNumber: this.agreementNumber, action: AppConstants.DEFAULT_RETUTN_TYPE }
    }

    let updateReturnDetailsParams = [
      this.itemStatusData.itemStoreId,
      this.props.loginUser.userLoginData.response.operatorid,
      this.props.loginUser.userLoginData.response.name,
      AppConstants.DEFAULT_RETURN_QUESTIONS_STATUS,
      this.state.dateTime,
      AppConstants.DEFAULT_RETURN_PICTURES_STATUS,
      this.props.uploadImagesDetails.comments,
      this.props.uploadImagesDetails.custInitials,
      this.props.uploadImagesDetails.tMInitials,
      this.state.custSignature,
      this.state.tmSignature,
      this.state.receiptType,
      this.state.emailAddress
    ];
    this.props.UpdateReturnDetails(updateReturnDetailsParams, headers);
  }

  componentWillReceiveProps(nextProps) {
    if (this.apiCalled) {
      this.apiCalled = false;
      if (nextProps.updateRentalData.response) {
        this.handleResponse(nextProps.updateRentalData);
      } else if (nextProps.updateReturnData.response) {
        this.handleResponse(nextProps.updateReturnData);
      } else if (nextProps.cancelRentReturn.response) {
        this.handleResponse(nextProps.cancelRentReturn);
      }
    }
  }

  handleResponse(responseData) {
    this.hideLoader();
    if (responseData.response.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
      Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU);
      // if (!this.isReturnFlow && !this.completedFlow) {
      //   this.completedFlow = true;
      //   this.props.clearRentalData();
      // } else if (this.isReturnFlow && !this.completedFlow) {
      //   this.completedFlow = true;
      //   this.props.clearReturnData();
      // }

      let storeId = this.props.headerParams.headerParameters.storeId;
      let itemStatus = ['REN', 'ISR'];
      let deviceParameters = [storeId, itemStatus, AppConstants.DEFAULT_ITEM_NUMBER];

      let headerParams = {
        params: this.props.headerParams.headerParameters
      }
      this.props.retrieveStatus(deviceParameters, headerParams);
    } else if (responseData.response.responseCode != AppConstants.STRINGSUCCESSRETCODE) {
      Alert.alert(
        responseData.response.message, textLabel.messages.emptyError,
        [
          {
            text: AppConstants.ALERT_OK_BUTTON_TITLE,
          },
        ],
        { cancelable: false },
      );
    } else if (responseData.isSystemError) {
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
    } else {
      this.hideLoader();
    }
  }

  handleSystemError() {
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

  onCancelButtonClick() {
    Alert.alert(
      textLabel.messages.cancelEvent, "",
      [
        {
          text: 'Yes',
          onPress: () => {
            this.apiCalled = true;
            this.showLoader();
            this.cancelRentItem();
          }
        },
        {
          text: 'No'
        },
      ],
      { cancelable: true },
    );
  }


  cancelRentItem() {
    let headers = {
      params: this.props.headerParams.headerParameters,
      urlVariable: { rentalNumber: this.agreementNumber, action: AppConstants.DEFAULT_CANCEL_ACTION }
    }
    let params = [this.itemStatusData.itemStoreId];
    this.props.cancelRent(params, headers);
  };


  handleEmailAddress = (name) => {
    this.setState({
      emailAddress: name
    })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressEmailDomain(item) }>
      <View style={common.emailDomainView}>
        <Text style={common.emailDomainText}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  onPressEmailDomain = (item) => {
    let emailAddress = this.state.emailAddress + item.title + textLabel.messages.dotCom;
    Keyboard.dismiss()
    this.setEmailId(emailAddress);
  }

  setEmailId(emailId) {
    this.setState({
      emailAddress: emailId
    });
    ;
  }

  space() {
    return (<View style={common.emailDomainSeparator} />)
  }

  handleCustomerName = (name) => {
    name = Util.alphaNumericWithSpacesAndDecimal(name)
    this.setState({
      customerName: name
    })
  }

  handleReceiptType = (type) => {
    receipt = this.state.receiptType;
    if (receipt.includes(type)) {
      receipt = receipt.filter(item => item !== type);
    } else {
      receipt.push(type);
    }
    this.setState({
      receiptType: receipt
    })
  }

  render() {
    // Orientation.lockToPortrait();
    const emailAccessoryID = textLabel.messages.uniqueIDCustomerSign;
    var emailDomain = AppConstants.EMAILDOMAIN;
    return (
      <View style={common.mainParentView}>

        <View style={common.headerParentView}>
          <View style={common.headerViewWithHorizontalContent}>

            <View style={common.leftHeaderView}>
              <TouchableOpacity onPress={this.onCancelButtonClick} >
                <Text style={common.headerTextViewStyle}>
                  {textLabel.messages.cancel}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={common.middleHeaderView}>

              <Text style={common.headerTextViewStyle}>{textLabel.messages.signature}</Text>

            </View>

            <View style={common.rightHeaderView}>
              <TouchableOpacity onPress={this.completeRentalProcedure}>
                <Text style={common.headerTextViewStyle}>
                  {textLabel.messages.complete}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={common.subHeaderView}>

            <Text style={common.subHeaderTextView}>{this.agreementNumber}</Text>

          </View>
        </View>

        <KeyboardAvoidingView style={common.keybordAvoidingView} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>

          <ScrollView keyboardShouldPersistTaps={AppConstants.SCROLL_VIEW_KEYBOARD_DEFAULT_TAP_BEHAVIOUR} alwaysBounceVertical={false}>

            <View style={common.textInputMainView}>

              <Text style={common.labelView}>
                {textLabel.messages.customerName}
              </Text>

              <TextInput
                autoCorrect={false}
                editable={false}
                style={[common.textInputView, styles.textInputView]}
                placeholder={textLabel.messages.requiredPlaceholder}
                onChangeText={this.handleCustomerName}
                value={this.state.customerName}
                />

            </View>

            <View style={common.viewSeparator} />

            <View style={common.textInputMainView}>

              <Text style={common.labelView}>
                {textLabel.messages.customerSign}
              </Text>

              <TouchableOpacity style={[common.textInputView, styles.textInputView]} onPress={() => Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.DIGITAL_SIGNATURE, ({ signType: "CustomerSign", func: this.refresh })) }>
                <TextInput
                  style={common.digitalSignView}
                  pointerEvents="none"
                  autoCorrect={false}
                  placeholder={textLabel.messages.requiredPlaceholder}
                  value={this.state.custSignFlag === 'done' ? textLabel.messages.complete : ''}
                  />
              </TouchableOpacity>

            </View>

            <View style={common.viewSeparator} />

            {
              this.isReturnFlow ?
                <View>
                  <View style={common.textInputMainView}>

                    <Text style={common.labelView}>
                      {textLabel.messages.TMSign}
                    </Text>

                    <TouchableOpacity style={[common.textInputView, styles.textInputView]} onPress={() => Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.DIGITAL_SIGNATURE, ({ signType: "TMSign", func: this.refresh })) }>
                      <TextInput
                        style={common.digitalSignView}
                        pointerEvents="none"
                        autoCorrect={false}
                        placeholder={textLabel.messages.requiredPlaceholder}
                        value={this.state.TMSignFlag === 'done' ? textLabel.messages.complete : ''}
                        />
                    </TouchableOpacity>

                  </View>

                  <View style={common.viewSeparator} />

                </View>
                :
                <View></View>
            }

            <View style={common.textInputMainView}>

              <Text style={common.labelView}>
                {textLabel.messages.dateAndTime}
              </Text>

              <TextInput
                autoCorrect={false}
                editable={false}
                style={[common.textInputView, styles.textInputView]}
                placeholder={textLabel.messages.requiredPlaceholder}
                value={this.state.dateTime}
                />

            </View>

            <View style={common.viewSeparator} />

            {this.progressIndicatorRenderItem() }

            <View style={common.textInputMainView}>

              <Text style={common.labelView}>
                {textLabel.messages.returnDateTime}
              </Text>

              <TouchableOpacity disabled={true} style={[common.textInputView, styles.textInputView]}>
                <Text style={Util.isEmpty(this.state.returnDateTime) ? common.textInputPlaceHolderText : [common.textInputPlaceHolderText, { color: appColors.colors.$defaultInputTextColor }]}>
                  {Util.isEmpty(this.state.returnDateTime) ? textLabel.messages.requiredPlaceholder : this.state.returnDateTime}
                </Text>
              </TouchableOpacity>

            </View>

            <View style={common.viewSeparator} />

            <View style={common.textInputMainView}>

              <Text style={[common.labelView, styles.labelView]}>
                {textLabel.messages.receiptType}
              </Text>


              <View style={[common.horizontalRowContentView, styles.radioButtonParentView]}>
                <TouchableOpacity onPress={() => this.handleReceiptType('PAPER') } style={[common.textInputMainView, styles.radioButtonView]}>
                  <Image style={common.cameraImageView} source={this.state.receiptType.includes('PAPER') ? screenImages.images.checkedBox1 : screenImages.images.uncheckedBox1} />

                  <Text style={[common.radioButtonView, styles.radioButtonText]}>
                    {textLabel.messages.PaperLabel}
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.handleReceiptType('EMAIL') } style={[common.textInputMainView, styles.radioButtonView]}>
                  <Image style={common.cameraImageView} source={this.state.receiptType.includes('EMAIL') ? screenImages.images.checkedBox1 : screenImages.images.uncheckedBox1} />

                  <Text style={[common.radioButtonView, styles.radioButtonText]}>
                    {textLabel.messages.EmailLabel}
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

            <View style={common.viewSeparator} />

            <View style={common.textInputMainView}>

              <Text style={common.labelView}>
                {textLabel.messages.custEmailAdd}
              </Text>

              <TextInput
                autoCorrect={false}
                style={[common.textInputView, styles.textInputView]}
                placeholder={textLabel.messages.requiredPlaceholder}
                value={this.state.emailAddress}
                onChangeText={this.handleEmailAddress}
                inputAccessoryViewID={emailAccessoryID}
                />

            </View>
            {/* <InputAccessoryView nativeID={emailAccessoryID}>
              <FlatList data={emailDomain} renderItem={this.renderItem} horizontal={true} ItemSeparatorComponent={this.space} keyboardShouldPersistTaps='always'>
              </FlatList>
            </InputAccessoryView> */}

            <View style={common.viewSeparator} />

          </ScrollView>

        </KeyboardAvoidingView>

        <BottomNavigationComponent leftSwipe={this.onLeftSwipe} bothSideSwipable={false} />

      </View>

    );
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    UpdateRentalDetails(rentalDetails, header) {
      let params = rentalRequestParams(actionConstants.REQUEST_UPDATE_RENTAL_DETAIL, rentalDetails);
      params = {
        'parameters': params,
        'headers': header
      };
      dispatch({ type: actionConstants.REQUEST_UPDATE_RENTAL_DETAIL, params });
    },

    cancelRent(params, headers) {
      let parameters = commonRequestParams(actionConstants.REQUEST_CANCEL_RENT_RETURN, params);
      params = {
        'parameters': parameters,
        'headers': headers
      };
      dispatch({ type: actionConstants.REQUEST_CANCEL_RENT_RETURN, params });
    },

    UpdateReturnDetails(returnDetails, header) {
      let params = returnRequestParams(actionConstants.REQUEST_UPDATE_RETURN_DETAIL, returnDetails);
      params = {
        'parameters': params,
        'headers': header
      };
      dispatch({ type: actionConstants.REQUEST_UPDATE_RETURN_DETAIL, params });
    },

    retrieveStatus(deviceParams, header) {
      {
        let idparam = deviceParams;
        params = commonRequestParams(actionConstants.REQUEST_ITEM_STATUS, idparam);
        params = {
          'parameters': params,
          'headers': header
        };
        dispatch({ type: actionConstants.REQUEST_ITEM_STATUS, params });
      }
    },

    clearRentalData() {
      dispatch({ type: actionConstants.REQUEST_RENT_DATA_CLEAR });
    },

    clearReturnData() {
      dispatch({ type: actionConstants.REQUEST_RETURN_DATA_CLEAR });
    }

  };
};

function mapStateToProps(state) {
  return {
    updateRentalData: state.UpdateRentalDetailReducer,
    headerParams: state.HeaderParamsReducer,
    preRentalAgreementData: state.PreRentalAgreementReducer,
    rentalDetails: state.FillingRentalInfoReducer,
    inspectionDetails: state.InspectionReducer,
    customerDetails: state.CustomerInfoReducer,
    loginUser: state.LoginScreenReducer,
    uploadImagesDetails: state.UploadImagesReducer,
    updateReturnData: state.UpdateReturnDetailReducer,
    cancelRentReturn: state.CancelRentReturnReducer
  }
}

export default CustomerSignature = connect(mapStateToProps, mapDispatchToProps)(CustomerSignature);
