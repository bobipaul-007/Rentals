import React, { Component } from 'react';
import { KeyboardAvoidingView, View, WebView } from "react-native";
import { connect } from "react-redux";
import * as textLabel from "../../config/TranslationProperties";

import { JsLoggerService } from '../../services/jsLoggerService';
import { AppConstants } from '../../constants/AppConstants';

import { actionConstants } from "../../actions/ActionConstants";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import { Actions } from 'react-native-router-flux';
import { Util } from '../../utils/utils.js';
import common from '../../styles/shared/Components.js';
import Spinner from "../common/shared/Spinner.js";

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.onLeftSwipe = this.onLeftSwipe.bind(this);
        this.onRightSwipe = this.onRightSwipe.bind(this);
        this.logger = new JsLoggerService();
        this.state = {
            isLoading: false
        };
    }

    onLeftSwipe() {
        this.logger.getLogger().info("entering: TermsAndConditions: onLeftSwipe");
        Actions.pop();
        this.logger.getLogger().info("exiting: TermsAndConditions: onLeftSwipe");
    }

    onRightSwipe() {
        this.logger.getLogger().info("entering: TermsAndConditions: onRightSwipe");
        Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CUSTOMER_SIGNATURE,
            ({ flow: AppConstants.RENTAL_FLOW }));
        this.logger.getLogger().info("exiting: TermsAndConditions: onRightSwipe");
    }

    //-----****  showLoader called to get the loader activated  //-----****
    showLoader = () => {
        this.logger.getLogger().info("entering::LoginScreen: showLoader");
        this.setState({
            isLoading: true
        });
        this.logger.getLogger().info("exiting::LoginScreen: showLoader");
    };
  //-----****  hideLoader called to get the loader de-activated  //-----****
    hideLoader = () => {
        this.logger.getLogger().info("entering::LoginScreen: hideLoader");
        this.setState({
            isLoading: false
        });
        this.logger.getLogger().info("exiting ::LoginScreen: hideLoader");
    };

      //-----****  renderItem called to add the loader to UI in the screen  //-----****
    renderItem() {
        this.logger.getLogger().info("entering::LoginScreen: renderItem");
        if (this.state.isLoading) {
            
            return (<Spinner animating = {this.state.isLoading}/>);
        }
        
        this.logger.getLogger().info("exiting:::LoginScreen: renderItem");
    }

    componentWillReceiveProps(nextProps) {        
        this.hideLoader();

        //1. Handle System Error
        if (nextProps.termsAndConditions.isSystemError) {
            this.logger.getLogger().info("ERROR ::TermsAndConditions: componentDidMount :: System error");  
            alert(textLabel.messages.somethingWentWrongTryAfterSomeTime);
            return;
        }        

        //2. Handle  case when returncode is not 0
         if (Number(nextProps.termsAndConditions.response.responseCode) != AppConstants.SUCCESSRETCODE) {
             this.logger.getLogger().info("ERROR ::TermsAndConditions: componentDidMount :: API error");            
             alert(nextProps.termsAndConditions.response.responseMessage);
            return;
         }

    }

   componentDidMount() {
        this.logger.getLogger().info("entering: TermsAndConditions: componentDidMount");
        const itemStatusData = this.props.headerParams.appDetails.selectedItem;


        let headers = {
            "params": {
                deviceName: this.props.headerParams.headerParameters.deviceName,
                storeId: this.props.headerParams.headerParameters.storeId,
                applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
                userId: this.props.headerParams.headerParameters.userId,//"userId",
                channelType: this.props.headerParams.headerParameters.channelType,
                localTimeZone: this.props.headerParams.headerParameters.localTimeZone,
                //localTimeZone: 'America/New_York'
            },
            "urlVariable": { itemNumber: itemStatusData.itemNumber, itemId: itemStatusData.itemId }
        }

        this.showLoader();
        this.props.getTermsAndConditions(headers);
        this.logger.getLogger().info("exiting: TermsAndConditions: componentDidMount");
    }

    render() {
        let agreementNumber = "";
        this.logger.getLogger().info("render called: ");
        if (!Util.isEmpty(this.props.inspectionQuestions.agreementNumber)) {
            if (Number(this.props.inspectionQuestions.agreementNumber.responseCode) === AppConstants.SUCCESSRETCODE)
                agreementNumber = this.props.inspectionQuestions.agreementNumber.rentalNumber;
        }
        this.logger.getLogger().info("entering: TermsAndConditions: render");
        let termsAndConditions = "";
        //let termsAndConditions = [];
        //let data = '';
        
        if (!Util.isEmpty(this.props.termsAndConditions.response)) {
            if (Number(this.props.termsAndConditions.response.responseCode) === AppConstants.SUCCESSRETCODE){
               // termsAndConditions = this.props.termsAndConditions.response.response;
                //this.hideLoader();
                if (this.props.termsAndConditions.response.itemType.itemDisclosureDetailsAgreement != null) {
                    termsAndConditions = this.props.termsAndConditions.response.itemType.itemDisclosureDetailsAgreement;
                }
                // data = termsAndConditions[0].itemDisclosureDetailsAgreement;
                this.logger.getLogger().debug("TermsAndConditions: render: checking if terms and conditions response exists");
            }
            //else{
              //  console.log("I got response as a: ",this.props.termsAndConditions.response.itemTypes.itemDisclosureDetailsAggreement);
               // alert(textLabel.messages.somethingWentWrongTryAfterSomeTime);
            //}
        }
        this.logger.getLogger().info("exiting: TermsAndConditions: render :");
        return (
            <View style={common.mainParentView}>
               
                <HeaderComponent columnStatus={AppConstants.HEADER_DEFAULT_COLUMN_STATUS} labelName={[textLabel.messages.termsAndConditions,
                    agreementNumber]} />
                     {this.renderItem() }
                    <KeyboardAvoidingView style={common.keybordAvoidingView} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>                     
                    <WebView
                    originWhitelist={['*']}
                    useWebkit={false}
                    scalesPageToFit={false}
                    source={{ html: termsAndConditions }}
                />
                    
                    </KeyboardAvoidingView>
                   
               
                <BottomNavigationComponent leftSwipe={this.onLeftSwipe} rightSwipe={this.onRightSwipe} bothSideSwipable={true} />
                
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    let logger = new JsLoggerService();
    logger.getLogger().info("entering: TermsAndConditions: mapDispatchToProps");
    return {
        getTermsAndConditions(headers) {
            let params = {
                'parameters': '',
                'headers': headers
            };
            dispatch({ type: actionConstants.REQUEST_TERMS_AND_CONDITIONS, params });
        }
    };
};

function mapStateToProps(state) {
    return {
        headerParams: state.HeaderParamsReducer,
        termsAndConditions: state.TermsAndConditionsReducer,
        inspectionQuestions: state.InspectionReducer
    }
}

export default TermsAndConditions = connect(mapStateToProps, mapDispatchToProps)(TermsAndConditions);