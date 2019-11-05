
import React, {Component} from 'react';
import { Text, Image, Alert, ActivityIndicator, View, TextInput, SegmentedControlIOS, Spinner, TouchableOpacity, InputAccessoryView, ScrollView, FlatList, Keyboard} from 'react-native';
import styles from '../../styles/rental/CustomerLookup';
import * as appColors from "../../styles/shared/appColors.js";
import * as align from "../../styles/shared/appAlignments.js";
import { Actions } from "react-native-router-flux";
import {AppConstants}  from "../../constants/AppConstants";
import { actionConstants } from '../../actions/ActionConstants';
import { commonRequestParams } from "../../request/commonRequest";
import { rentalRequestParams } from "../../request/rentalRequest";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import * as constant from "../../constants/AppConstants";
import * as screenImages from "../../config/ImageProperties";
import { connect } from "react-redux";
import { Util } from '../../utils/utils';
import HeaderComponent from "../common/shared/HeaderComponent.js";
import * as translationProperties from "../../config/TranslationProperties"
import common from'../../styles/shared/Components.js';
import { JsLoggerService } from '../../services/jsLoggerService';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import SegmentedControlTab from 'react-native-segmented-control-tab';


var emailDomain = AppConstants.EMAILDOMAIN;
var val = "";

class CustomerLookup extends Component {
  constructor(props) {
    super(props);
    this._OnPressButton = this._OnPressButton.bind(this);
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
    this.clear = this.clear.bind(this);
    this.logger = new JsLoggerService();
    this.deviceParam = '',
      this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.inputField = React.createRef();
    this.state = {
      selectedIndex: 0,
      text: '',
      loaderText: '',
      loaderStatus: false,
      loaderLabelName: [translationProperties.messages.customerLookup],
      loaderIsLoading: false,
      labelName: [translationProperties.messages.customerLookup],
    }
  }

  showLoader = () => {
    this.logger.getLogger().info("entering:CustomerLookup:: showLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: true
    });
    this.logger.getLogger().info("exiting::CustomerLookup:hshowLoader");
  };

  hideLoader = () => {
    this.logger.getLogger().info("entering:CustomerLookup:hideLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: false
    });
    this.logger.getLogger().info("exiting::CustomerLookup:hideLoader");
  };

  renderLoader() {

    this.logger.getLogger().info("entering:CustomerLookup: renderLoader");
    if (this.state.loaderIsLoading) {
      return (<View>
        <ActivityIndicator size="large" color= {appColors.colors.$defaultHeaderBackground}/>
      </View>);
    }
    this.logger.getLogger().info("exiting::CustomerLookup: renderLoader");
  }

  onLeftSwipe() {
    this.logger.getLogger().info("entering:CustomerLookup: onLeftSwipe");
    Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.INSPECTION);
    this.logger.getLogger().info("exiting:CustomerLookup: onLeftSwipe");
  }

  componentWillReceiveProps(nextProps) {
    this.logger.getLogger().info("entering:CustomerLookup: componentWillReceiveProps");
    this.showLoader();
    let temp = nextProps.search.searchCustData;

    if (nextProps.search.searchCustData.isSystemError) {
      this.hideLoader();
      alert(translationProperties.messages.errorWentWrong);
    }
    else if ((nextProps.search.searchCustData.responseCode === constant.AppConstants.RESPONSECODE)) {

      this.hideLoader();
      Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LIST);

    }
    else if ((nextProps.search.searchCustData.responseCode != "0")) {
      this.hideLoader();
      Alert.alert(
        translationProperties.messages.emptyError, translationProperties.messages.errorCustomerNotExist,
        [
          {
            text: translationProperties.messages.ok,
          },
        ],
        { cancelable: false },
      );
    }

    this.logger.getLogger().info("entering:CustomerLookup: componentWillReceiveProps");

  }

  onRightSwipe() {
    this.logger.getLogger().info("entering:CustomerLookup: onRightSwipe");

    let text = this.state.text
    if (this.state.selectedIndex == 0) {
      if (Util.removeHyphensFromNumber(text).length == 10) {
        this.showLoader();
        this.searchCustomer(text);
      } else {
        Alert.alert(
          translationProperties.messages.emptyError, translationProperties.messages.errorType5,
          [
            {
              text: translationProperties.messages.ok, onPress: () => { this.inputField.current.focus() }
            },

          ],
          { cancelable: false }
        );
      }
    } else {
      if (Util.isEmailValid(text)) {
        this.showLoader();
        this.searchCustomer(text);
      } else {
        Alert.alert(
          translationProperties.messages.emptyError, translationProperties.messages.errorType6,
          [
            {
              text: translationProperties.messages.ok, onPress: () => { this.inputField.current.focus() }
            },

          ],
          { cancelable: false }
        );
      }
    }
    this.logger.getLogger().info("exiting:CustomerLookup: onRightSwipe");
  }

  clear = () => {
    this.logger.getLogger().info("entering:CustomerLookup: clear :Value", this.state.text);
    //this.inputField.current.clear();
    this.logger.getLogger().info("entering:CustomerLookup: clear");
    this.setState({
      text: ''
    })
  }

  searchCustomer(text) {
    if (this.state.selectedIndex == 0) {
      var phoneText = Util.removeHyphensFromNumber(text);
   
      this.deviceParam = { "telephone": phoneText}
    } else {
      this.deviceParam = { "emailAddress": text }
    }
    deviceParameters = this.deviceParam;

    var headerParams = { params: this.props.headerParams.headerParameters};
    this.props.searchCustomer([deviceParameters], headerParams);
    // this.logger.getLogger().info("exiting:CustomerLookup: onRightSwipe");
  }

  render() {
    this.logger.getLogger().info("entering:CustomerLookup: render()");
    const emailAccessoryID = translationProperties.messages.uniqueEmailInspectionID
    const phoneAccessoryID = translationProperties.messages.uniquePhoneInspectionID
    return (
      <View style={common.mainParentView}>
        <HeaderComponent columnStatus = {translationProperties.messages.labelFalse} labelName ={this.state.labelName} viewCount={1}/>

        <ScrollView keyboardDismissMode={align.alignItem.$defaultKeyboardDismissMode} scrollEnabled={false}>

          <View style={common.mainParentView}>
            {/* <SegmentedControlIOS style={common.segmentControl}
              values={[translationProperties.messages.phone, translationProperties.messages.email]}
              selectedIndex={this.state.selectedIndex}
              tintColor={appColors.colors.$defaultCustLookupBgColor}
              onChange={this._onChange}
              onValueChange={this._onValueChange}>
            </SegmentedControlIOS> */}

              <SegmentedControlTab
              values={[translationProperties.messages.phone, translationProperties.messages.email]}
              selectedIndex={this.state.selectedIndex}
              tabsContainerStyle = {common.segmentControl}
              tabStyle={common.tabStyle}
              activeTabStyle={common.activeTabStyle}
              onTabPress={this.handleIndexSelect}
              />

            <View style={[common.borderedTextInput, styles.borderColor]}>
              <TextInput autoCorrect={false} autoCapitalize={false} key={this.state.selectedIndex == 0 ? 'input-phone' : 'input-email'} keyboardType={this.state.selectedIndex == 0 ? 'phone-pad' : 'email-address'}
                style={styles.textInputMargin}
                placeholder={this.state.selectedIndex == 0 ? translationProperties.messages.phoneFieldPlaceHolder : translationProperties.messages.emailFieldPlaceHolder}
                onChangeText={this.state.selectedIndex == 0 ? this.handlePhonenumber : this.handleEmail} value={this.state.text}
                returnKeyType={"done"}
                ref={this.inputField}
                onSubmitEditing={this.onRightSwipe}
                inputAccessoryViewID={this.state.selectedIndex == 0 ? phoneAccessoryID : emailAccessoryID}>
              </TextInput>

              <View style={common.clearIconView}>
                <TouchableOpacity onPress={() => this.clear() }>
                  <Image
                    style={common.clearIcon}
                    source={screenImages.images.clearIcon}
                    />
                </TouchableOpacity>
              </View>
              {this.renderLoader() }
            </View>
            <TouchableOpacity disabled={(Util.isEmpty(this.state.text)) ? false : true} onPress={this._OnPressButton}>
              <View style={[common.button, styles.buttonColor]}>
                <Text style={[common.buttonText, styles.buttonText, { color: (Util.isEmpty(this.state.text)) ? '#fff' : '#C7C7CD' }]}>

                  {translationProperties.messages.customerLookupButtonText}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* <InputAccessoryView nativeID={phoneAccessoryID}>
          <TouchableOpacity onPress={this.onRightSwipe}>
            <View style={common.enterButton}>
              <Text style={[common.buttonText, styles.buttonText]}>
                {translationProperties.messages.doneLabelCustomerLookup}
              </Text>
            </View>
          </TouchableOpacity>
        </InputAccessoryView> */}

         <KeyboardAccessoryView androidAdjustResize>
        <TouchableOpacity
                style={common.enterButton}
                onPress={() => this.onRightSwipe}
              >
                <Text style={common.textview}>
                  {translationProperties.messages.doneLabelCustomerLookup}
                </Text>
              </TouchableOpacity>
        </KeyboardAccessoryView>

        <KeyboardAccessoryView androidAdjustResize>
          <FlatList data={emailDomain} renderItem={this._renderItem} horizontal={true} ItemSeparatorComponent={this.space} keyboardShouldPersistTaps={align.alignItem.keyboardShouldPersistTapAlways}>
          </FlatList>
        </KeyboardAccessoryView>

        <BottomNavigationComponent leftSwipe = {this.onLeftSwipe} bothSideSwipable = {false} />

      </View>
    );
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressEmailDomain(item) }>
      <View style={common.emailDomainView}>
        <Text style={common.emailDomainText}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )

  space() {
    return (<View style={common.emailDomainSeparator}/>)
  }

  onPressEmailDomain = (item) => {
    this.setState({ text: this.state.text + item.title + translationProperties.messages.dotCom })
  }

  handlePhonenumber = (phoneNo) => {
    phoneNo = Util.numerics(phoneNo)
    phoneNo = Util.formatPhoneNumberWithHyphen(phoneNo)
    this.setState({
      text: phoneNo
    })

  }

  handleEmail = (email) => {
    this.setState({
      text: email
    })
  }

  _onChange = (event) => {
    if (this.state.selectedIndex != event.nativeEvent.selectedSegmentIndex) {
      this.state.text = ''
    }
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    })
  }

  handleIndexSelect = (index) => {
    if (this.state.selectedIndex != index) {
      this.state.text = ''
    }
    this.setState({
      selectedIndex: index
    })
  };

  _onValueChange = (value) => {
    this.setState({
      value: value
    })
  }

  emptyReducer() {
    this.logger.getLogger().info("entering:CustomerLookup: emptyReducer");
    let headerParams = this.props.headerParams.headerParameters;
    let deviceParameters = [];
    this.props.deleteData(deviceParameters, headerParams);
    this.logger.getLogger().info("exiting:CustomerLookup: emptyReducer");
  }

  _OnPressButton() {
    Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_INFO, ({ screenProps: "CustomerLookup", deleteReducer: this.emptyReducer() }));
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchCustomer(deviceParams, header) {
      let idparam = deviceParams;
      params = rentalRequestParams(actionConstants.REQUEST_SEARCH_CUSTOMER, idparam);
      params = {
        'parameters': params,
        'headers': header
      };
      dispatch({ type: actionConstants.REQUEST_SEARCH_CUSTOMER, params });

    },

    deleteData(deviceParams, header) {
      let idparam = deviceParams;
      params = rentalRequestParams(actionConstants.EMPTY_REDUCER, idparam);
      params = {
        'parameters': params,
        'headers': header
      };
      dispatch({ type: actionConstants.EMPTY_REDUCER, params });
    }
  };
};
function mapStateToProps(state) {
  return {
    search: state.SearchCustomerReducer,
    headerParams: state.HeaderParamsReducer
  }
}

export default CustomerLookup = connect(mapStateToProps, mapDispatchToProps)(CustomerLookup);


