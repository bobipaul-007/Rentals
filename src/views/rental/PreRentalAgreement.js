import React, { Component } from "react";
import { Text, View, Keyboard, KeyboardAvoidingView, FlatList, Image, ScrollView, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import * as textLabel from "../../config/TranslationProperties";
import common from '../../styles/shared/Components.js';
import screenStyle from '../../styles/rental/PreRentalAgreementStyle';
import * as appColors from "../../styles/shared/appColors.js";
import screenImages from '../../config/ImageProperties';
import { rentalRequestParams } from "../../request/rentalRequest";
import { commonRequestParams } from "../../request/commonRequest";
import { AppConstants } from '../../constants/AppConstants';
import { Actions } from "react-native-router-flux";
import { Util } from '../../utils/utils';
import { JsLoggerService } from '../../services/jsLoggerService';
import { actionConstants } from "../../actions/ActionConstants";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import Spinner from "../common/shared/Spinner.js";
import ImageResizer from 'react-native-image-resizer';

class PreRentalAgreement extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
        this.logger = new JsLoggerService();
        this.state = {
            status: false,
            TMInitials: '',
            CustInitials: '',
            comments: '',
            imagesArray: [],
            uriFlag: false,
            loaderText: '',
            loaderStatus: false,
            loaderLabelName: [textLabel.messages.preRentalTrailerCondition],
            loaderIsLoading: false,
            previousStatus: false,
            //loaderText, loaderStatus, loaderLabelName, loaderIsLoading
        }
        this.nextButtonClicked = false;
        this.nextButtonClicked1 = false;
        this.deleteImagePressed = false;
        this.cameraImageOptions = {
            title: textLabel.messages.selectAvatar,
            customButtons: [{ name: textLabel.messages.buttonAsName, title: textLabel.messages.chooseAPhoto }],
            storageOptions: {
                skipBackup: true,
                path: textLabel.messages.imagesPath,
            },
        }
        this.handleCameraClicked = this.handleCameraClicked.bind(this);
        this.onRightSwipe = this.onRightSwipe.bind(this);
        this.onLeftSwipe = this.onLeftSwipe.bind(this);
        this.onPressThumbnail = this.onPressThumbnail.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.progressIndicatorRenderItem = this.progressIndicatorRenderItem.bind(this);
    }


    //-----****  showLoader call for showing activityIndicator //-----****
    showLoader = () => {

        this.setState({
            loaderText: this.state.loaderText,
            loaderStatus: this.state.loaderStatus,
            loaderLabelName: this.state.loaderLabelName,
            loaderIsLoading: true
        });

    };

    //-----**** hideLoader call for hiding activityIndicator //-----****
    hideLoader = () => {

        this.setState({
            loaderText: this.state.loaderText,
            loaderStatus: this.state.loaderStatus,
            loaderLabelName: this.state.loaderLabelName,
            loaderIsLoading: false
        });

    };


    //-----**** progressIndicatorRenderItem to call Spinner(Activity Indicator) component  //-----****
    progressIndicatorRenderItem() {
        if (this.state.loaderIsLoading) {
            Keyboard.dismiss()
            return (<Spinner animating = {this.state.loaderIsLoading}/>);
        }

    }


    //-----**** onLeftSwipe call for nevigating to prev Component//-----****
    onLeftSwipe() {

        // this.props.collectPreRentalAgreementData(
        //     [
        //         this.state.imagesArray,
        //         this.state.comments,
        //         this.state.TMInitials,
        //         this.state.CustInitials
        //     ]
        // );
        Actions.pop();


    }


    //-----**** onRightSwipe call for nevigating to next Component //-----****
    onRightSwipe() {
        //this.nextButtonClicked = true;
        this.showLoader();
        this.deleteImagePressed = false;

        this.props.collectPreRentalAgreementData(
            [
                "",
                this.state.comments,
                this.state.TMInitials,
                this.state.CustInitials
            ]
        );

        if (!(this.state.imagesArray.length === 0) && !(Util.isEmpty(this.state.comments)) && !Util.isEmpty(this.state.TMInitials) && !Util.isEmpty(this.state.CustInitials)) {
            const itemStatusData = this.props.headerParams.appDetails.selectedItem;


            //-----**** network call for stored data in reducers //-----****
            // console.log("This is item id", itemStatusData)
            var headerParams = { params: this.props.headerParams.headerParameters };
            headerParams.urlVariable = { rentalNumber: this.props.inspectionDetails.agreementNumber.rentalNumber, itemId: itemStatusData.itemId };
            // let headerParams = this.props.headerParams.headerParameters;



            //-----**** network call for upload images//-----****
            this.props.collectImages([
                AppConstants.DEFAULT_RENTAL_TYPE_RENTAL,
                "N",
                this.state.imagesArray
            ], headerParams);
        }
        else {

            this.nextButtonClicked = false;
            this.hideLoader();
            if (this.state.imagesArray.length === 0) {

                alert(textLabel.messages.emptyPhotoError);
            }
            else if (Util.isEmpty(this.state.comments)) {

                alert(textLabel.messages.emptyCommentsError);
            }
            else if (Util.isEmpty(this.state.TMInitials) || Util.isEmpty(this.state.CustInitials)) {

                alert(textLabel.messages.errorType1);
            }
        }

    }

    //-----**** _renderItem for showing thumbnails //-----****
    //@params --  index,item
    _renderItem = ({ item, index }) => {


        return (
            <TouchableOpacity style={common.thumbnailView} onPress={() => this.onPressThumbnail(item, index, true) }>
                <TouchableOpacity onPress={() => this.deleteImage(index) }>
                    <Image
                        style={common.redCrossimageView}
                        source={screenImages.images.deleteWithRedCross}
                        />
                </TouchableOpacity>
                <ImageBackground
                    style={common.thumbnailImageBackgroundView}
                    source={{ uri: item.binaryFile }}
                    >
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    //-----**** renderSeparator for adding dividers inside view//-----****
    renderSeparator = () => {

        return (
            <View style={common.viewSeparator} />
        );
    };
    //-----**** inputFieldValue handler for textInput//-----****
    //@params --  value,inputField
    inputFieldValue = (value, inputField) => {

        value = Util.alphaNumericWithSpacesAndDecimal(value);
        switch (inputField) {
            case textLabel.messages.commentsInputField:

                this.setState({
                    comments: value
                });

                return;

            case textLabel.messages.tmInitialsInputField:

                this.setState({
                    TMInitials: value
                })

                return;

            case textLabel.messages.custInitialsInputField:

                this.setState({
                    CustInitials: value
                })

                return;
        }
    }

    //-----**** handleCameraClicked to launch camera and for capture Images//-----****
    handleCameraClicked = () => {

        try {
            if (this.count <= AppConstants.PRE_RENTAL_IMAGES_MAX) {

                ImagePicker.launchCamera(this.cameraImageOptions, (response) => {
                    if (response.didCancel == undefined) {
                        this.logger.getLogger().debug("Entering:CustomerDL:handleCameraClicked: Images less than maximum images: cancel is undefined");
                        this.count++;
                        let splitedUri = "";

                        if (!Util.isEmpty(response.uri)) {

                            splitedUri = response.uri.split("images/");
                        }

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

                alert(textLabel.messages.eightImageRestrictTxt);
            }
        } catch (e) { console.log("while launching>>>", e); }


    }

    //-----**** onPressThumbnail call after clicking on thumbnails//-----****
    //@params -- thumbnailURI,index,checkForDelete
    onPressThumbnail(thumbnailURI, index, checkForDelete) {

        Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.THUMBNAIL_VIEW, ({ checkForDelete: checkForDelete, EnlargeImageURI: thumbnailURI.binaryFile, deleteState: this.deleteImage, index: index, screenProps: AppConstants.SCREEN_NAMES.RENTAL.PRE_RENTAL_AGREEMENT }));
        //Ask why the Return Trailer Condition Screen Props are passed on screenProps

    }

    //-----**** deleteImage call for delete image and thumbnails//-----****
    //@params -- index
    deleteImage(index) {


        let indexNumber = "";
        if (!Util.isEmpty(this.props.preRentalAgreementData.response) && this.state.imagesArray.length > 0) {
            for (i = 0; i < this.props.preRentalAgreementData.response.imageDetails.length; i++) {
                for (j = 0; j < this.state.imagesArray.length; j++) {
                    if (this.props.preRentalAgreementData.response.imageDetails[i].fileName ===
                        this.state.imagesArray[j].fileName) {
                        indexNumber = this.props.preRentalAgreementData.response.imageDetails[i].imageId;
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

            "urlVariable": {
                rentalNumber: this.props.inspectionDetails.agreementNumber.rentalNumber,
                imageId: indexNumber
            }
        }

        this.deleteImagePressed = true;
        this.props.deleteImages("", headers);

        this.count--;
        if (index > -1) {
            this.state.imagesArray.splice(index, 1);

        }
        this.setState({ uriFlag: true });

    }

    componentWillMount() {
        console.log("finalResppnse>>>", this.preRentalAgreementData);
    }



    componentWillReceiveProps(nextProps) {


        if (!Util.isEmpty(nextProps.preRentalAgreementData.response)) {
            this.nextButtonClicked = true;
        }


        console.log("deleteImageItemPressed>>", this.deleteImagePressed, "///////", nextProps.preRentalAgreementData.deleteImageRes);
        if (!Util.isEmpty(nextProps.preRentalAgreementData.deleteImageRes) && this.deleteImagePressed === true) {
            if (nextProps.preRentalAgreementData.deleteImageRes.responseCode === '0') { //TRY TO MERGE WITH UPPER
                // this.deleteImagePressed = false;
                //this.hideLoader();
                console.log("image deleted");
                // this.emptyReducer();


            } else {
                this.logger.getLogger().info("ERROR: customerDlscreen: componentWillRecieveProps: response not recieved ");
                this.hideLoader();
                alert(nextProps.preRentalAgreementData.deleteImageRes.message);
                this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: response not recieved ");
            }

        } else if (this.nextButtonClicked && this.deleteImagePressed === false) {
            this.logger.getLogger().debug("entering: customerDlscreen: componentWillRecieveProps: with nextProps as: ", nextProps + " : Next Button for page was clicked");
            this.nextButtonClicked = false;

            if (!Util.isEmpty(nextProps.preRentalAgreementData.response)) {
                this.logger.getLogger().debug("customerDlscreen: componentWillRecieveProps: response recieved ");

                if (nextProps.preRentalAgreementData.response.responseCode === '0') {
                    this.logger.getLogger().debug("customerDlscreen: componentWillRecieveProps: response recieved: success response: saving images");
                    console.log("delete called here.....");


                    // for (i = 0; i < nextProps.preRentalAgreementData.response.imageDetails.length; i++) {
                    //     for (j = 0; j < this.state.imagesArray.length; j++) {
                    //         if (nextProps.preRentalAgreementData.response.imageDetails[i].fileName ===
                    //             this.state.imagesArray[j].fileName) {
                    //             nextProps.preRentalAgreementData.response.imageDetails[i].push(this.state.imagesArray[j].binaryFile);
                    //         }

                    //     }
                    // }



                    this.hideLoader();
                    Actions.push(AppConstants.SCREEN_NAMES.RENTAL.TERMS_AND_CONDITIONS,
                        ({ screenProps: AppConstants.SCREEN_NAMES.RENTAL.PRE_RENTAL_AGREEMENT }))
                }
                else {
                    this.logger.getLogger().info("ERROR: customerDlscreen: componentWillRecieveProps: response not recieved ");
                    this.hideLoader();
                    alert(nextProps.preRentalAgreementData.response.message);
                    this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: response not recieved ");
                }
            }
        } else if (nextProps.preRentalAgreementData.isSystemError) {
            this.hideLoader();
            this.logger.getLogger().info("ERROR: customerDlscreen: componentWillRecieveProps: system error");
            alert(textLabel.messages.errorWentWrong);
            this.logger.getLogger().info("exiting: customerDlscreen: componentWillRecieveProps: system error");
        }


    }
    render() {

        if (!Util.isEmpty(this.props.preRentalAgreementData.images)) {
            if (this.props.preRentalAgreementData.images.length > 0) {
                this.count = this.props.preRentalAgreementData.images.length;
                this.state.imagesArray = this.props.preRentalAgreementData.images;
            }
        }

        let agreementNumber = "";
        if (!Util.isEmpty(this.props.inspectionDetails.agreementNumber)) {
            if (Number(this.props.inspectionDetails.agreementNumber.responseCode) === 0)
                agreementNumber = this.props.inspectionDetails.agreementNumber.rentalNumber;
        }



        return (
            <View style={common.mainParentView}>
                <HeaderComponent columnStatus={AppConstants.HEADER_DEFAULT_COLUMN_STATUS} labelName={[textLabel.messages.preRentalTrailerCondition, agreementNumber]} />
                <KeyboardAvoidingView style={[common.keybordAvoidingView, screenStyle.keyboardAvoidingView]} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>
                    <ScrollView style={common.scrollView}>
                        <View style={common.preRentalPicturesView}>
                            <Text style={common.preRentalPicturesText}>
                                {textLabel.messages.preRentalPictures}
                            </Text>
                            <TouchableOpacity onPress={this.handleCameraClicked} style={common.preRentalImage}>
                                <Image style={common.cameraImageView} source={screenImages.images.camera} />
                                <Text style={common.retakeText}>{textLabel.messages.retake}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={common.viewSeparator} />
                        <View style={common.trailerImageScrollViewHeight}>

                            <FlatList data={this.state.imagesArray}
                                renderItem={this._renderItem}
                                horizontal={true}
                                extraData={this.state} />

                        </View>
                        <View style={common.viewSeparator} />

                        <View style={common.textInputMainView}>
                            <Text style={[common.labelView, screenStyle.labelView]}>
                                {textLabel.messages.comments}
                            </Text>
                            <TextInput autoCapitalize={false} autoCorrect={false} style={[common.textInputView, screenStyle.textInputComments]}
                                maxLength={AppConstants.PRE_RENTAL_COMMENTS_MAX_LENGTH}
                                onChangeText={(comments) => this.inputFieldValue(comments, textLabel.messages.commentsInputField) }
                                value={this.state.comments}
                                placeholder={textLabel.messages.commentsDefault}
                                // color={appColors.colors.$defaultInputTextColor}
                                returnKeyType={AppConstants.RETURN_KEY_NEXT}
                                multiline={true} />
                        </View>
                        <View style={common.viewSeparator} />
                        {this.progressIndicatorRenderItem() }

                        <View style={common.acknowledgementView}>
                            <Text numberOfLines={AppConstants.PRE_RENTAL_AGREEMENT_ACKNOWLEDGEMENT_LINES} style={common.acknowledgementText}>
                                {textLabel.messages.acknowledgement}
                            </Text>
                        </View>

                        <View style={common.textInputMainView}>
                            <Text style={[common.labelView, screenStyle.labelView]}>
                                {textLabel.messages.TMInitials}
                            </Text>
                            <TextInput autoCorrect={false} style={common.textInputView}
                                onChangeText={(tmInitials) => { this.inputFieldValue(tmInitials, textLabel.messages.tmInitialsInputField) } }
                                value={this.state.TMInitials}
                                placeholder={textLabel.messages.requiredPlaceholder}
                                // color={appColors.colors.$defaultInputTextColor} //ASK VISHNU ABOUT MAX LENGTH
                                returnKeyType={AppConstants.RETURN_KEY_NEXT}
                                textAlign={"left"} />
                        </View>
                        <View style={common.viewSeparator} />

                        <View style={common.textInputMainView}>
                            <Text style={[common.labelView, screenStyle.labelView]}>
                                {textLabel.messages.CustInitials}
                            </Text>
                            <TextInput autoCorrect={false} style={common.textInputView}
                                onChangeText={(custInitials) => { this.inputFieldValue(custInitials, textLabel.messages.custInitialsInputField) } }
                                value={this.state.CustInitials}
                                placeholder={textLabel.messages.requiredPlaceholder}
                                // color={appColors.colors.$defaultInputTextColor} //ASK VISHNU ABOUT MAX LENGTH
                                returnKeyType={AppConstants.RETURN_KEY_NEXT} />
                        </View>
                        <View style={common.viewSeparator} />


                    </ScrollView>
                </KeyboardAvoidingView>
                <BottomNavigationComponent leftSwipe={this.onLeftSwipe} rightSwipe={this.onRightSwipe} bothSideSwipable={true} />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    let logger = new JsLoggerService();

    return {
        collectPreRentalAgreementData(parameters) {
            let params = parameters;
            params = rentalRequestParams(actionConstants.REQUEST_PRE_RENTAL_INFO, params);
            params = {
                'parameters': params,
            };
            dispatch({ type: actionConstants.REQUEST_PRE_RENTAL_INFO, params });
        },

        collectImages(images, header) {
            let params = images;
            params = rentalRequestParams(actionConstants.SAVE_PRE_RENTAL_INFO_IMAGES, params);
            params = {
                'parameters': params,
                'headers': header,


            };
            dispatch({ type: actionConstants.SAVE_PRE_RENTAL_INFO_IMAGES, params });
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

        retriveRentalImages(deviceParams, header) {

            let idparam = deviceParams;
            let params = commonRequestParams(actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES, idparam);
            params = {
                'parameters': params,
                'headers': header
            };
            dispatch({ type: actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES, params });

        },
    };
};

function mapStateToProps(state) {
    return {
        headerParams: state.HeaderParamsReducer,
        preRentalAgreementData: state.PreRentalAgreementReducer,
        inspectionDetails: state.InspectionReducer,
        retriveRentalImagesData: state.retriveRentalImageReducer,
    }
}

export default PreRentalAgreement = connect(mapStateToProps, mapDispatchToProps)(PreRentalAgreement);