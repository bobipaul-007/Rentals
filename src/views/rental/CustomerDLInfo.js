import React, { Component } from "react";
import {  Text, Alert, FlatList, View, Image, TouchableOpacity, ImageBackground, TextInput, Keyboard, KeyboardAvoidingView, ScrollView} from "react-native";
import * as textLabel from "../../config/TranslationProperties";
import * as screenImages from "../../config/ImageProperties";
import screenStyles from '../../styles/rental/CustomerDLInfoStyle';
import componentStyles from '../../styles/shared/Components';
import * as appColors from "../../styles/shared/appColors.js";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Actions } from "react-native-router-flux";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import { JsLoggerService } from "../../services/jsLoggerService";
import { Dropdown } from 'react-native-material-dropdown';
import { Util } from '../../utils/utils';
import moment from 'moment';
import { rentalRequestParams } from "../../request/rentalRequest";
import { commonRequestParams } from "../../request/commonRequest";
import { connect } from "react-redux";
import { actionConstants } from "../../actions/ActionConstants";
import ImagePicker from 'react-native-image-picker';
import {AppConstants} from '../../constants/AppConstants';
import ImgToBase64 from 'react-native-image-base64';
import Spinner from "../common/shared/Spinner.js";

class CustomerDLInfo extends Component {

    constructor(props) {
        super(props);
        this.count = 0;
        this.logger = new JsLoggerService();
        this.nextButtonClicked = false;
        this.deleteImagePressed = false;
        this.state = {
            DriverLicenseNumber: '',
            DriverLicenseState: '',
            DriverLicenseExpiration: '',
            InsuranceCompanyName: '',
            insurancePolicyNumber: '',
            DOB: '',
            labelName: '',
            isDateTimePickerVisible: false,
            isDriverLicenseExpiration: '',


            DropdownVal: textLabel.messages.dropDownVariable,
            imagesArray: [],
            uriFlag: false
        };

        this.cameraImageOptions = {
            title: textLabel.messages.selectAvatar,
            customButtons: [{ name: textLabel.messages.buttonAsName, title: textLabel.messages.chooseAPhoto }],
            storageOptions: {
                skipBackup: true,
                path: textLabel.messages.imagesPath,
            },
        }

        this.onCameraClicked = this.onCameraClicked.bind(this);
        this.onRightSwipe = this.onRightSwipe.bind(this);
        this.onLeftSwipe = this.onLeftSwipe.bind(this);
        this.logger = new JsLoggerService();
        this._showDateTimePicker = this._showDateTimePicker.bind(this);
        this.onPressThumbnail = this.onPressThumbnail.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);

        this.DriverLicenseNumber = React.createRef();
        this.DriverLicenseState = React.createRef();
        this.DriverLicenseExpiration = React.createRef();
        this.InsuranceCompanyName = React.createRef();
        this.insurancePolicyNumber = React.createRef();
        this.DOB = React.createRef();


    }

    emptyReducer() {
        console.log("empty reducer");
        let headerParams = this.props.headerParams.headerParameters;
        let deviceParameters = [];
        this.props.deleteData(deviceParameters, headerParams);

    }


    //-----****  showLoader call for showing activityIndicator //-----****
    showLoader = () => {
        this.logger.getLogger("entering: PreRentalAgreement: showLoader");
        this.setState({
            loaderText: this.state.loaderText,
            loaderStatus: this.state.loaderStatus,
            loaderLabelName: this.state.loaderLabelName,
            loaderIsLoading: true
        });
        this.logger.getLogger("exiting: PreRentalAgreement: showLoader");
    };

    //-----**** hideLoader call for hiding activityIndicator //-----****
    hideLoader = () => {
        this.logger.getLogger("entering: PreRentalAgreement: hideLoader");
        this.setState({
            loaderText: this.state.loaderText,
            loaderStatus: this.state.loaderStatus,
            loaderLabelName: this.state.loaderLabelName,
            loaderIsLoading: false
        });
        this.logger.getLogger("exiting: PreRentalAgreement: hideLoader");
    };

    //-----**** progressIndicatorRenderItem to call Spinner(Activity Indicator) component  //-----****
    progressIndicatorRenderItem() {
        this.logger.getLogger("entering: PreRentalAgreement: renderLoader");

        if (this.state.loaderIsLoading) {
            Keyboard.dismiss()
            return (<Spinner animating = {this.state.loaderIsLoading}/>);
        }
        this.logger.getLogger("exiting: PreRentalAgreement: renderLoader");
    }

    render() {
        this.logger.getLogger().info("Entering:CustomerDL:render");

        var base64Icon = this.state.uri;
        let { phone } = this.state;
        //----------- Array for merging header and data view -----------------------//

        return (
            <View style={componentStyles.mainParentView}>
                <HeaderComponent columnStatus= {AppConstants.HEADER_DEFAULT_COLUMN_STATUS} labelName={this.state.labelName} />
                <KeyboardAvoidingView style={componentStyles.keybordAvoidingView} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>
                    <ScrollView keyboardShouldPersistTaps= {AppConstants.SCROLL_VIEW_KEYBOARD_DEFAULT_TAP_BEHAVIOUR}>

                        <View style={componentStyles.textInputMainView}>

                            <Text style={componentStyles.labelView}>{textLabel.messages.DLNo}</Text>

                            <View style={{ flex: 0.85 }}>

                                <TextInput
                                    autoCorrect={false}
                                    style={[componentStyles.textInputView, screenStyles.textInputView]}
                                    maxLength={AppConstants.CUST_DL_MAX_INPUT}
                                    placeholder ={textLabel.messages.requiredPlaceholder}
                                    onChangeText={this.handleDriverLicenseNumber}
                                    value={this.state.DriverLicenseNumber}
                                    returnKeyType={AppConstants.RETURN_KEY_NEXT}
                                    ref={this.DriverLicenseNumber}
                                    textAlign={'left'}
                                    />
                            </View>
                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />

                        <View style={[componentStyles.textInputMainView, screenStyles.textInputMainView]}>
                            <Text style={componentStyles.labelView}>
                                {textLabel.messages.DLState}
                            </Text>


                            <Dropdown
                                data={this.props.flag}
                                selectedItemColor={appColors.colors.$defaultInputTextColor}
                                containerStyle={{ flex: 0.85 }}
                                rippleInsets={{ top: 16, bottom: -8 }}
                                dropdownOffset={{ top: 32, left: 0 }}
                                animationDuration={225}
                                shadeOpacity={0.12}
                                value={this.state.DriverLicenseState}
                                textColor={appColors.colors.$defaultInputTextColor}
                                rippleCentered={AppConstants.HEADER_DEFAULT_COLUMN_STATUS}
                                onChangeText={(value) => { this.onChangeTextPress(value) } }
                                ref={this.DriverLicenseState}
                                />
                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />


                        <View style={componentStyles.textInputMainView}>
                            <Text style={[componentStyles.labelView, screenStyles.dateLabelView]}>{textLabel.messages.DLExp}</Text>
                            <TouchableOpacity style={screenStyles.dateTextInputView} onPress={() => this._showDateTimePicker(true) }>

                                <TextInput
                                    editable={false}
                                    style={[componentStyles.textInputView, screenStyles.textInputView]}
                                    onChangeText={this.handleDriverLicenseExpiration}
                                    placeholder={textLabel.messages.requiredPlaceholder}
                                    value={this.state.DriverLicenseExpiration}
                                    ref={this.DriverLicenseExpiration}

                                    />





                                <View style={componentStyles.ImageView}>
                                    <Image
                                        style={componentStyles.cameraImageView}
                                        source={screenImages.images.calendar}
                                        />
                                </View>

                            </TouchableOpacity>

                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />

                        <View style={componentStyles.textInputMainView}>
                            <Text style={[componentStyles.labelView, screenStyles.dateLabelView]}>{textLabel.messages.DOB}</Text>

                            <TouchableOpacity style={screenStyles.dateTextInputView} onPress={() => this._showDateTimePicker(false) }>

                                <TextInput
                                    editable={false}
                                    style={[componentStyles.textInputView, screenStyles.textInputView]}
                                    onChangeText={this.handleDOB}
                                    placeholder={textLabel.messages.requiredPlaceholder}
                                    value={this.state.DOB}
                                    ref={this.DOB}

                                    />

                                <View style={componentStyles.ImageView}>
                                    <Image
                                        style={componentStyles.cameraImageView}
                                        source={screenImages.images.calendar}
                                        />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />

                        {this.progressIndicatorRenderItem() }

                        <View style={screenStyles.insuranceTextMainView}>
                            <Text style={componentStyles.labelView}>{textLabel.messages.InsuranceCompName}</Text>
                            <View style={{ flex: 0.85 }}>
                                <TextInput
                                    autoCorrect={false}
                                    autoCapitalize={true}
                                    style={[componentStyles.textInputView, screenStyles.textInputView]}
                                    onChangeText={(InsuranceCompanyName) => this.setState({ InsuranceCompanyName }) }
                                    value={this.state.InsuranceCompanyName}
                                    placeholder ={textLabel.messages.requiredPlaceholder}
                                    returnKeyType={AppConstants.RETURN_KEY_NEXT}
                                    ref={this.InsuranceCompanyName}
                                    maxLength={AppConstants.CUST_DL_MAX_LENGTH_INPUT}
                                    textAlign={'left'}
                                    />

                                <View style={componentStyles.CameraView}>
                                    <TouchableOpacity onPress={this.onCameraClicked}>
                                        <Image
                                            style={screenStyles.cameraImageStyle}
                                            source={screenImages.images.camera}
                                            />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />

                        <View style={componentStyles.trailerImageScrollViewHeight}>
                            <FlatList data={this.state.imagesArray}
                                renderItem={this._renderItem}
                                horizontal={true}
                                extraData={this.state} />
                        </View>


                        <View style={screenStyles.custInfoBottomRow}>


                            <Text style={componentStyles.labelView}>{textLabel.messages.InsurancePolicyNo}</Text>
                            <View style={{ flex: 0.85 }}>

                                <TextInput
                                    autoCorrect={false}
                                    style={[componentStyles.textInputView, screenStyles.textInputView]}
                                    onChangeText={(insurancePolicyNumber) => this.setState({ insurancePolicyNumber }) }
                                    value={this.state.insurancePolicyNumber}
                                    placeholder ={textLabel.messages.requiredPlaceholder}
                                    returnKeyType={AppConstants.RETURN_KEY_TYPE}
                                    ref={this.insurancePolicyNumber}
                                    maxLength={AppConstants.CUST_DL_MAX_INPUT}
                                    textAlign={'left'}
                                    />
                            </View>
                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />
                    </ScrollView>
                </KeyboardAvoidingView>

                <BottomNavigationComponent leftSwipe={this.onLeftSwipe} rightSwipe={this.onRightSwipe} bothSideSwipable={true} />


                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode={textLabel.messages.inspecDateMode}

                    />
            </View>
        );

    }


    //-----****  onChangeTextPress called when dropdown state change  //-----****
    onChangeTextPress(value) {
        this.setState({
            DriverLicenseState: value,
            DropdownVal: value
        })

    }

    componentDidMount() {

        let agreementNumber = "";
        if (!Util.isEmpty(this.props.inspectionQuestions.agreementNumber)) {
            if (this.props.inspectionQuestions.agreementNumber.responseCode === AppConstants.STRINGSUCCESSRETCODE)
                agreementNumber = this.props.inspectionQuestions.agreementNumber.rentalNumber;
        }
        this.setState({
            labelName: [textLabel.messages.customerInfoLabel, agreementNumber],
            // DriverLicenseNumber: this.props.newCustomer.DriverLicenseNumber,
            // DriverLicenseState: this.props.newCustomer.DriverLicenseState,
            // DriverLicenseExpiration: this.props.newCustomer.DriverLicenseExpiration,
            // InsuranceCompanyName: this.props.newCustomer.InsuranceCompanyName,
            // insurancePolicyNumber: this.props.newCustomer.insurancePolicyNumber,
            // DOB: this.props.newCustomer.DOB,
            // DropdownVal: !Util.isEmpty(this.props.newCustomer.DriverLicenseState) ? this.props.newCustomer.DriverLicenseState : textLabel.messages.dropDownVariable,

        });
    }

    //-----****  onLeftSwipe called after click on left swiper tab  //-----****
    onLeftSwipe() {
        this.logger.getLogger().info("entering: customerDlscreen: onLeftSwipe");
        //-----**** navigating back to previous screens//-----****
        Actions.pop();


        // var headerParams = { params: this.props.headerParams.headerParameters };



        // let DriverLicenseNumber = this.DriverLicenseNumber.current._lastNativeText;
        // let DriverLicenseState = this.state.DropdownVal;
        // let DriverLicenseExpiration = this.state.DriverLicenseExpiration;
        // let InsuranceCompanyName = this.InsuranceCompanyName.current._lastNativeText;
        // let insurancePolicyNumber = this.insurancePolicyNumber.current._lastNativeText;
        // let DOB = this.state.DOB;
        // let headerParams = this.props.headerParams.headerParameters;
        // let deviceParameters = [this.state.imageArray,DriverLicenseNumber, DriverLicenseState, DriverLicenseExpiration, InsuranceCompanyName, insurancePolicyNumber, DOB];

        // this.props.getCustomerDLInfo(deviceParameters, headerParams);  //if values are pushed to reducer, then validation also reqd; check on that

        // Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_INFO);

        this.logger.getLogger().info("exiting: customerDlscreen: onLeftSwipe");
    }



    //-----****  onRightSwipe called after click on right swiper tab  //-----****
    onRightSwipe() {
        this.logger.getLogger().info("entering: customerDlscreen: onRightSwipe");
        this.showLoader();
        this.deleteImagePressed = false;
        // this.nextButtonClicked = true;

        var licenceNo = [];
        var driverAge = 0;
        if (this.state.DriverLicenseNumber != undefined) {
            drivingLicenceNo = this.state.DriverLicenseNumber;

        }
        if (this.state.DOB != '') {
            var someString = JSON.stringify(this.state.DOB);
            var splitString = someString.split('/');
            var splitString1 = splitString[0].split('"');
            var splitString2 = splitString[2].split('"');
            driverAge = this.calculateAge(splitString1[1], splitString[1], splitString2[0]);
        }
        var dlExpStatus = this.compareDate(this.state.DriverLicenseExpiration);
        var dobStatus = this.compareDate(this.state.DOB);


        //-----**** validation for missing fields  //-----**** 
        if (this.state.DriverLicenseNumber.length === AppConstants.ArrayEmptyCheck || this.state.DropdownVal ===
            this.state.DriverLicenseExpiration.length === AppConstants.ArrayEmptyCheck || this.state.DOB.length === AppConstants.ArrayEmptyCheck || this.state.InsuranceCompanyName.length === AppConstants.ArrayEmptyCheck || this.state.insurancePolicyNumber.length === AppConstants.ArrayEmptyCheck) {
            this.hideLoader();
            Alert.alert(
                textLabel.messages.errorLableMissingField, textLabel.messages.errorType1,

                [
                    {
                        text: AppConstants.ALERT_OK_BUTTON_TITLE,
                    },
                ],
                { cancelable: false },
            );
        }  //-----**** validation for driver licence expiration date  //-----****
        else if (dlExpStatus != textLabel.messages.greater) {
            this.hideLoader();
            Alert.alert(
                textLabel.messages.errorDLExp, textLabel.messages.emptyError,
                [
                    {
                        text: AppConstants.ALERT_OK_BUTTON_TITLE
                    },
                ],
                { cancelable: false },
            );
        }  //-----**** validation for date of birth //-----****
        else if (dobStatus != textLabel.messages.smaller) {
            this.hideLoader();
            Alert.alert(
                textLabel.messages.errorDLDOB, textLabel.messages.emptyError,

                [
                    {
                        text: AppConstants.ALERT_OK_BUTTON_TITLE
                    },
                ],
                { cancelable: false },
            );
        } //-----**** validation for driver age //-----****
        else if (driverAge < AppConstants.DL_DRIVER_AGE) {
            this.hideLoader();
            Alert.alert(
                textLabel.messages.errorDLMinDOB, textLabel.messages.emptyError,

                [
                    {
                        text: AppConstants.ALERT_OK_BUTTON_TITLE
                    },
                ],
                { cancelable: false },
            );
        }
        //-----**** validation for photo capture  //-----****
        else if (this.state.imagesArray.length === AppConstants.ArrayEmptyCheck) {
            this.hideLoader();
            Alert.alert(
                textLabel.messages.emptyPhotoErrorForDL, textLabel.messages.emptyError,

                [
                    {
                        text: AppConstants.ALERT_OK_BUTTON_TITLE,
                    },
                ],
                { cancelable: false },
            );
        } else {

            //-----**** storing text input refrence values //-----****
            let DriverLicenseNumber = this.DriverLicenseNumber.current._lastNativeText;
            let DriverLicenseState = this.state.DropdownVal;
            let DriverLicenseExpiration = this.state.DriverLicenseExpiration;
            let InsuranceCompanyName = this.InsuranceCompanyName.current._lastNativeText;
            let insurancePolicyNumber = this.insurancePolicyNumber.current._lastNativeText;
            let DOB = this.state.DOB;

            const itemStatusData = this.props.headerParams.appDetails.selectedItem;


            //-----**** network call for stored data in reducers //-----****
            // console.log("This is item id", itemStatusData)
            var headerParams = { params: this.props.headerParams.headerParameters };
            headerParams.urlVariable = { rentalNumber: this.props.inspectionQuestions.agreementNumber.rentalNumber, itemId: itemStatusData.itemId };
            // let headerParams = this.props.headerParams.headerParameters;
            // headerParams.urlVariable = { rentalNumber: "051505292019103", itemId: itemStatusData.itemId };


            let dlInfoReqParams = [this.state.imagesArray, DriverLicenseNumber, DriverLicenseState, DriverLicenseExpiration,
                InsuranceCompanyName, insurancePolicyNumber, DOB];
            this.props.getCustomerDLInfo(dlInfoReqParams, headerParams);

            //-----**** network call for upload images//-----****
            this.props.collectImages([
                AppConstants.DEFAULT_RENTAL_TYPE_RENTAL,
                "Y",
                this.state.imagesArray
            ], headerParams);



            //-----**** navigating to next screens//-----****

            this.logger.getLogger().info("exiting: customerDlscreen: onRightSwipe");
        }



    }

    componentWillReceiveProps(nextProps) {


        this.logger.getLogger().info("entering: customerDlscreen: componentWillRecieveProps: with nextProps as: ", nextProps);

        console.log("nextPropsfordl>>", nextProps.newCustomer.deleteImageRes);


        if (!Util.isEmpty(nextProps.newCustomer.response)) {
            this.nextButtonClicked = true;
        }
        if (!Util.isEmpty(nextProps.newCustomer.deleteImageRes) && this.deleteImagePressed === true) {
            if (nextProps.newCustomer.deleteImageRes.responseCode === '0') { //TRY TO MERGE WITH UPPER
                this.deleteImagePressed = false;
                //this.hideLoader();
                console.log("image deleted");
                this.emptyReducer();
                //  nextProps.newCustomer.deleteImageRes = "";

            } else {
                this.logger.getLogger().info("ERROR: customerDlscreen: componentWillRecieveProps: response not recieved ");
                this.hideLoader();
                alert(nextProps.newCustomer.deleteImageRes.message);
                this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: response not recieved ");
            }


        } else if (this.nextButtonClicked && this.deleteImagePressed === false) {
            this.logger.getLogger().debug("entering: customerDlscreen: componentWillRecieveProps: with nextProps as: ", nextProps + " : Next Button for page was clicked");
            this.nextButtonClicked = false;

            if (!Util.isEmpty(nextProps.newCustomer.response)) {
                this.logger.getLogger().debug("customerDlscreen: componentWillRecieveProps: response recieved ");

                if (nextProps.newCustomer.response.responseCode === '0') { //TRY TO MERGE WITH UPPER
                    this.logger.getLogger().debug("customerDlscreen: componentWillRecieveProps: response recieved: success response: saving images");
                    if (!Util.isEmpty(nextProps.newCustomer.driverLicenceParameters)) {
                        this.count = nextProps.newCustomer.driverLicenceParameters.insurance_details.status.parameters.imageArray.length;
                        this.state.imagesArray = nextProps.newCustomer.driverLicenceParameters.insurance_details.status.parameters.imageArray;
                    }
                    this.hideLoader();
                    Actions.push(AppConstants.SCREEN_NAMES.RENTAL.FILLING_RENTAL_INFO);
                    this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: response recieved ");
                }
                else {
                    this.logger.getLogger().info("ERROR: customerDlscreen: componentWillRecieveProps: response not recieved ");
                    this.hideLoader();
                    alert(nextProps.newCustomer.response.message);
                    this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: response not recieved ");
                }
            }
        } else if (nextProps.newCustomer.isSystemError) {
            this.hideLoader();
            this.logger.getLogger().info("ERROR: customerDlscreen: componentWillRecieveProps: system error");
            alert(textLabel.messages.errorWentWrong);
            this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: system error");
        }
    }

    //-----**** onCameraClicked invoked when click on camera icon for launching camera//-----****
    onCameraClicked = () => {
        this.logger.getLogger().info("Entering:CustomerDL:handleCameraClicked");
        if (this.count <= AppConstants.CUST_DL_IMAGES_MAX) {
            ImagePicker.launchCamera(this.cameraImageOptions, (response) => {
                if (response.didCancel == undefined) {
                    this.logger.getLogger().debug("Entering:CustomerDL:handleCameraClicked: Images less than maximum images: cancel is undefined");
                    this.count++;
                    let splitedUri = "";

                    if (!Util.isEmpty(response.uri)) {

                        splitedUri = response.uri.split("images/");
                    }


                    console.log("splitedurl>>", splitedUri);

                    this.state.imagesArray.push({
                        fileName: splitedUri[1],
                        binaryFile: AppConstants.BASE64_IMAGE_URI_PATH + response.data
                    });

                    this.setState({
                        uriFlag: true
                    });
                }
            });
        } else {

            alert(textLabel.messages.TwoImageRestrictTxt);
        }
        this.logger.getLogger().info("Existing:CustomerDL:handleCameraClicked");
    }

    _renderItem = ({ item, index }) => {


        return (
            <TouchableOpacity style={componentStyles.thumbnailView} onPress={() => this.onPressThumbnail(item, index, true) }>
                <TouchableOpacity onPress={() => this.deleteImage(index) }>
                    <Image
                        style={componentStyles.redCrossimageView}
                        source={screenImages.images.deleteWithRedCross}
                        />
                </TouchableOpacity>

                <ImageBackground
                    style={componentStyles.thumbnailImageBackgroundView}
                    source={{ uri: item.binaryFile }}
                    >


                </ImageBackground>
            </TouchableOpacity>

        );
    }

    //-----**** calcaulate Age //-----****
    //*** params --- MONTH,DAY,YEAR
    calculateAge(birthMonth, birthDay, birthYear) {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var currentDay = currentDate.getDate();
        var calculatedAge = currentYear - birthYear;

        if (currentMonth < birthMonth - 1) {
            calculatedAge--;
        }
        if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
            calculatedAge--;
        }
        return calculatedAge;
    }

    //-----**** compareDate for date calculation //-----****
    //*** params --- inputDate (inputDate is compare with currentDate)
    compareDate(inputDate) {
        var GivenDate = inputDate;
        var CurrentDate = new Date();
        GivenDate = new Date(GivenDate);
        GivenDate.setHours(0, 0, 0, 0)
        CurrentDate.setHours(0, 0, 0, 0)
        if (GivenDate > CurrentDate) {
            return "greater";
        } else if (GivenDate < CurrentDate) {
            return "smaller";
        } else if (GivenDate == CurrentDate) {
            return "equal";
        }
    }

    //-----**** _showDateTimePicker for showing dateTimePicker //-----****
    //@params -- flag
    _showDateTimePicker(flag) {
        this.setState({ isDateTimePickerVisible: true, isDriverLicenseExpiration: flag });

    }

    //-----**** _showDateTimePicker for hiding dateTimePicker //-----****
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    //-----**** _showDateTimePicker for handling picked date from datepicker //-----****
    //@ DOFB
    _handleDatePicked = (DOFB) => {

        var selectedDate = moment(DOFB).format('MM/DD/YYYY')
        var someString = JSON.stringify(selectedDate);
        var splitString = someString.split('T');
        var finalString = splitString[0];
        finalString = finalString.split('"');
        if (this.state.isDriverLicenseExpiration == true) {
            this.logger.getLogger().info("finalString>>", finalString[1]);
            this.setState({ DriverLicenseExpiration: finalString[1] });
            this._hideDateTimePicker();

        } else {
            this.setState({ DOB: finalString[1] });
            this._hideDateTimePicker();
        }
    };

    //-----**** handleDriverLicenseNumber for handling DriverLicenseNumber TextInput //-----****
    //@ number
    handleDriverLicenseNumber = (number) => {
        number = Util.alphaNumeric(number)
        this.setState({
            DriverLicenseNumber: number
        })
    }

    //-----**** handleDriverLicenseExpiration for handling handleDriverLicenseExpiration TextInput //-----****
    //@ date
    handleDriverLicenseExpiration = (date) => {
        this.setState({
            DriverLicenseExpiration: date
        })
    }

    //-----**** handleDOB for handling handleDOB TextInput //-----****
    //@ date
    handleDOB = (date) => {
        this.setState({
            DOB: date
        })
    }

    //-----**** onPressThumbnail called when click on thumbnail image //-----****
    //@ thumbnailURI,index,checkForDelete
    onPressThumbnail(thumbnailURI, index, checkForDelete) {
        this.logger.getLogger().info("entering: PreRentalAgreement: onPressThumbnail with thumbnailURI as: " + thumbnailURI + " and index as: " + index);
        Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.THUMBNAIL_VIEW, ({ checkForDelete: checkForDelete, EnlargeImageURI: thumbnailURI.binaryFile, deleteState: this.deleteImage, index: index, screenProps: AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_DL_INFO }));
        //Ask why the Return Trailer Condition Screen Props are passed on screenProps
        this.logger.getLogger().info("exiting: PreRentalAgreement: onPressThumbnail");
    }


    //-----**** deleteImage called for deleting captured images//-----****
    //@ index
    deleteImage(index) {
        this.logger.getLogger().info("entering: PreRentalAgreement: deleteImage with index as: " + index);

        let indexNumber = "";
        if (!Util.isEmpty(this.props.newCustomer.response) && this.state.imagesArray.length > 0) {
            for (i = 0; i < this.props.newCustomer.response.imageDetails.length; i++) {
                for (j = 0; j < this.state.imagesArray.length; j++) {
                    if (this.props.newCustomer.response.imageDetails[i].fileName ===
                        this.state.imagesArray[j].fileName) {
                        indexNumber = this.props.newCustomer.response.imageDetails[i].imageId;
                    }

                }
            }
        }

        let headers = {
            "params": {
                deviceName: this.props.headerParams.headerParameters.deviceName,
                storeId: this.props.headerParams.headerParameters.storeId,
                applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
                userId: this.props.headerParams.headerParameters.userId,
                channelType: this.props.headerParams.headerParameters.channelType,
                localTimeZone: this.props.headerParams.headerParameters.localTimeZone
            },
            // "urlVariable": { rentalNumber: "051505292019103", imageId: this.props.newCustomer.response.imageDetails[index].imageId }
            "urlVariable": { rentalNumber: this.props.inspectionQuestions.agreementNumber.rentalNumber, imageId: indexNumber }

        }
        this.deleteImagePressed = true;
        // this.nextButtonClicked = false;
        this.props.deleteImages("", headers);

        this.count--;
        if (index > -1) {
            this.logger.getLogger().debug("entering: PreRentalAgreement: deleteImage with index as: " + index + " : Images are present. Deleting");
            this.state.imagesArray.splice(index, 1);
            this.logger.getLogger().debug("entering: PreRentalAgreement: deleteImage with index as: " + index + " : Images are present. Deleted Image");
        }

        this.setState({ uriFlag: true });
        this.logger.getLogger().info("exiting: PreRentalAgreement: deleteImage");





    }


}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        getCustomerDLInfo(deviceParams, header) {
            if (Util.isEmpty(deviceParams[0])) {

            } else {
                let idparam = deviceParams;
                params = rentalRequestParams(actionConstants.REQUEST_DL_CUSTOMER, idparam);
                params = {
                    'parameters': params,
                    'headers': header
                };


                dispatch({ type: actionConstants.REQUEST_DL_CUSTOMER, params });
            }
        },

        collectImages(images, header) {
            let params = images;
            params = rentalRequestParams(actionConstants.SAVE_CUST_INSURANCE_IMAGES, params);
            params = {
                'parameters': params,
                'headers': header
            };
            dispatch({ type: actionConstants.SAVE_CUST_INSURANCE_IMAGES, params });
        },

        deleteImages(images, header) {
            //let params = images;

            // params = rentalRequestParams(actionConstants.REQUEST_RETRIEVE_DELETE_IMAGE, params);
            params = {
                'parameters': images,
                'headers': header
            };
            dispatch({ type: actionConstants.REQUEST_RETRIEVE_DELETE_IMAGE, params });
        },

        deleteData(deviceParams, header) {
            let idparam = deviceParams;
            params = rentalRequestParams(actionConstants.EMPTY_IMAGE_REDUCER, idparam);
            params = {
                'parameters': params,
                'headers': header
            };
            dispatch({ type: actionConstants.EMPTY_IMAGE_REDUCER, params });
        }



    };
};
function mapStateToProps(state) {

    return {
        newCustomer: state.CustomerDLInfoReducer,
        headerParams: state.HeaderParamsReducer,
        inspectionQuestions: state.InspectionReducer,

    }
}

export default CustomerDLInfo = connect(mapStateToProps, mapDispatchToProps)(CustomerDLInfo);


