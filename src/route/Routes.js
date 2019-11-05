import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import * as pageTitles from "../config/TranslationProperties.js";
import { AppConfig } from '../config/AppConfig.js';
import * as screenImages from '../config/ImageProperties';
import LoginScreen from "../views/common/LoginScreen.js";
import TrailerType from "../views/rental/TrailerType.js";
import MainMenu from "../views/MainMenu.js";
import Inspection from "../views/common/Inspection.js";
import CustomerDLInfo from "../views/rental/CustomerDLInfo.js";
import CustomerLookup from "../views/rental/CustomerLookup.js";
import CustomerList from "../views/rental/CustomerList.js";
import CustomerInfo from "../views/rental/CustomerInfo.js";
import CustomerSignature from "../views/common/CustomerSignature.js";
import FillingRentalInfo from "../views/rental/FillingRentalInfo.js";
import DigitalSignature from "../views/common/DigitalSignature.js";
import ThumbnailView from "../views/common/functional/ThumbnailView.js";
import ReturnTrailerCondition from "../views/return/ReturnTrailerCondition.js";
import CurrentRental from '../views/common/CurrentRental.js';
import ExtendRental from '../views/extend/ExtendRental.js';
import PreRentalAgreement from "../views/rental/PreRentalAgreement.js";
import TermsAndConditions from '../views/rental/TermsAndConditions.js';
import LoadingSplashScreen from '../views/LoadingSplashScreen.js';
import { AppConstants } from '../constants/AppConstants.js';
import { Actions } from "react-native-router-flux";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.appConfig = new AppConfig();
  }
  render() {
    return (
      <Router>
        <Scene key="root">

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.LOADINGSPLASH} component={LoadingSplashScreen} initial={true} hideTabBar={true}
            screenProps={this.props.appValues} />

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.LOGIN_SCREEN} component={LoginScreen} hideNavBar={true}
            screenProps={this.props.appValues} />


          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU} component={MainMenu} hideNavBar={true}
            screenProps={this.props.appValues} panHandlers = {null} />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_DL_INFO} component={CustomerDLInfo} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.FILLING_RENTAL_INFO} component={FillingRentalInfo} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.INSPECTION} component={Inspection} hideNavBar={true}
            screenProps={this.props.appValues} />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LOOKUP} component={CustomerLookup} hideNavBar={true}
            screenProps={this.props.appValues} />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LIST} component={CustomerList} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_INFO} component={CustomerInfo} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.CUSTOMER_SIGNATURE} component={CustomerSignature} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.DIGITAL_SIGNATURE} component={DigitalSignature} hideNavBar={true}
            screenProps={this.props.appValues}  panHandlers = {null} />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.TRAILER_TYPE} component={TrailerType} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.PRE_RENTAL_AGREEMENT} component={PreRentalAgreement} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.RENTAL.TERMS_AND_CONDITIONS} component={TermsAndConditions} hideNavBar={true}
            screenProps={this.props.appValues} />

          <Scene key={AppConstants.SCREEN_NAMES.RETURN.RETURN_TRAILER_CONDITION} component={ReturnTrailerCondition} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.THUMBNAIL_VIEW} component={ThumbnailView} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.COMMON_VIEWS.CURRENT_RENTAL} component={CurrentRental} hideNavBar={true}
            screenProps={this.props.appValues}  />

          <Scene key={AppConstants.SCREEN_NAMES.EXTEND.EXTEND_RENTAL} component={ExtendRental} hideNavBar={true}
            screenProps={this.props.appValues}  />



        </Scene>
      </Router>
    );
  }
}

export default Routes;


// <Scene key={AppConstants.SCREEN_NAMES.RENTAL.CURRENT_RENTALS} component={CurrentRentals} hideNavBar={true}
//             screenProps={this.props.appValues} />