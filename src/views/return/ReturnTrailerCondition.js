import React, {Component} from 'react';
import {StyleSheet, Text, InputAccessoryView, FlatList, Image, Keyboard, ImageBackground, View, ScrollView, Alert, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import * as textLabel from "../../config/TranslationProperties";
import styles from '../../styles/common/CustomerSignatureStyle';
import { connect } from "react-redux";
import { JsLoggerService } from "../../services/jsLoggerService";
import { Actions } from "react-native-router-flux";
import * as translationProperties from "../../config/TranslationProperties";
import BottomNevigationComponent from '../common/functional/BottomNavigationView.js'
import * as screenImages from "../../config/ImageProperties";
import {AppConstants}  from "../../constants/AppConstants";
import * as appColors from "../../styles/shared/appColors.js";
import componentStyles from '../../styles/shared/Components.js';
import * as appAlignments from '../../styles/shared/appAlignments';
import * as textFont from "../../styles/shared/appFonts.js";
import ImagePicker from 'react-native-image-picker';
import RTCStyle from '../../styles/return/ReturnTrailerConditionStyle';
import HeaderComponent from "../common/shared/HeaderComponent.js";
import { returnRequestParams } from "../../request/returnRequest";
import { extendRequestParams } from "../../request/extendRequest";
import { commonRequestParams } from "../../request/commonRequest";
import { Util } from '../../utils/utils';
import { actionConstants } from '../../actions/ActionConstants';
import * as constant from "../../constants/AppConstants";
import Spinner from "../common/shared/Spinner.js";


class ReturnTrailerCondition extends Component {

    constructor(props) {
        super(props);

        this.count = 0;
        this.retrievedImages_array = [],
            this.itemStatusData,
            this.logger = new JsLoggerService();
        this.onNextClick = false;
        this.deleteImagePressed = false;
        this.state = {
            labelName: [textLabel.messages.ReturnTrailerCondition, this.props.selectedItem.rentalNumber],
            preRentalComment: '',
            returnComments: '',
            custInitials: '',
            tmInitials: '',
            uriArray: [],
            fileNameArray: [],
            uriFlag: false,
            imagesArray: [],
            loaderText: '',
            loaderStatus: false,
            loaderLabelName: [translationProperties.messages.ReturnTrailerCondition],
            loaderIsLoading: false,
            retrievedImages_array: []

        };

        this.cameraImageOptions = {
            title: textLabel.messages.selectAvatar,
            customButtons: [{ name: textLabel.messages.buttonAsName, title: textLabel.messages.chooseAPhoto }],
            storageOptions: {
                skipBackup: true,
                path: textLabel.messages.imagesPath,
            },
        }

        this.handleCameraClicked = this.handleCameraClicked.bind(this);
        this.onPressThumbnail = this.onPressThumbnail.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.onRightSwipe = this.onRightSwipe.bind(this);
        this.onLeftSwipe = this.onLeftSwipe.bind(this);
        this.progressIndicatorRenderItem = this.progressIndicatorRenderItem.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
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
        console.log("idloading>>>", this.state.loaderIsLoading);
        if (this.state.loaderIsLoading) {
            Keyboard.dismiss()
            return (<Spinner animating = {this.state.loaderIsLoading}/>);
        }
        this.logger.getLogger("exiting: PreRentalAgreement: renderLoader");
    }

    //-----**** onRightSwipe call for nevigating to next Component //-----****
    onRightSwipe() {
        this.logger.getLogger().info("entering: PreRentalAgreement: onRightSwipe");
        this.showLoader();

        if (!(this.state.imagesArray.length === 0) && !Util.isEmpty(this.state.tmInitials) && !Util.isEmpty(this.state.custInitials)) {
            this.props.collectData(
                [
                    this.state.returnComments,
                    this.state.tmInitials,
                    this.state.custInitials
                ]
            );

            this.onNextClick = true;
            itemStatusData = this.props.headerParams.appDetails.selectedItem;
            var headerParams = { params: this.props.headerParams.headerParameters };
            headerParams.urlVariable = { rentalNumber: itemStatusData.rentalNumber, itemId: itemStatusData.itemId };

            this.props.uploadImages([
                "RETURN",
                "N",
                this.state.imagesArray
            ], headerParams);
        }
        else {
            this.logger.getLogger().info("TrailerRenatlCondition: onRightSwipe: frontEnd Validations Faliure");
            this.nextButtonClicked = false;
            this.hideLoader();
            if (this.state.imagesArray.length === 0) {
                this.logger.getLogger().info("ERROR: TrailerRenatlCondition: onRightSwipe: frontEnd Validations Faliure: images not available")
                alert(textLabel.messages.emptyPhotoError);
            }
            else if (Util.isEmpty(this.state.tmInitials) || Util.isEmpty(this.state.custInitials)) {
                this.logger.getLogger().info("ERROR: TrailerRenatlCondition: onRightSwipe: frontEnd Validations Faliure: TM Initials and/or Customer Initials not available")
                alert(textLabel.messages.errorType1);
            }
        }

        this.logger.getLogger().info("exiting: TrailerRenatlCondition: onRightSwipe");
    }


    //-----**** onLeftSwipe call for nevigating to prev Component//-----****
    onLeftSwipe() {
        Actions.pop();

    }

    //-----**** handleCameraClicked to launch camera and for capture Images//-----****
    handleCameraClicked = () => {
        this.logger.getLogger().info("Entering:TrailerRenatlCondition:handleCameraClicked");
        if (this.count <= AppConstants.PRE_RENTAL_IMAGES_MAX) {

            ImagePicker.launchCamera(this.cameraImageOptions, (response) => {
                if (response.didCancel == undefined) {

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
        this.logger.getLogger().info("Existing:TrailerRenatlCondition:handleCameraClicked");
    }

    //-----**** onPressThumbnail call after clicking on thumbnails//-----****
    //@params -- thumbnailURI,index,checkForDelete
    onPressThumbnail(thumbnailURI, index, checkForDelete) {
        this.logger.getLogger().info("entering: PreRentalAgreement: onPressThumbnail with thumbnailURI as: " + thumbnailURI + " and index as: " + index);
        Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.THUMBNAIL_VIEW, ({ checkForDelete: checkForDelete, EnlargeImageURI: thumbnailURI.binaryFile, deleteState: this.deleteImage, index: index, screenProps: AppConstants.SCREEN_NAMES.RETURN.RETURN_TRAILER_CONDITION }));
        //Ask why the Return Trailer Condition Screen Props are passed on screenProps
        this.logger.getLogger().info("exiting: PreRentalAgreement: onPressThumbnail");
    }

    //-----**** deleteImage call for delete image and thumbnails//-----****
    //@params -- index
    deleteImage(index) {
        this.itemStatusData = this.props.headerParams.appDetails.selectedItem;
        let indexNumber = "";

        if (!Util.isEmpty(this.props.uploadImagesDetails.response) && this.state.imagesArray.length > 0) {
            for (i = 0; i < this.props.uploadImagesDetails.response.imageDetails.length; i++) {
                for (j = 0; j < this.state.imagesArray.length; j++) {
                    if (this.props.uploadImagesDetails.response.imageDetails[i].fileName ===
                        this.state.imagesArray[j].fileName) {
                        indexNumber = this.props.uploadImagesDetails.response.imageDetails[i].imageId;
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
                rentalNumber: this.itemStatusData.rentalNumber,
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



    //-----**** setPreRentalComments for handling input for preRentalComments textInput//-----****
    setPreRentalComments(comments) {
        this.setState({
            preRentalComment: comments
        });

    }

    //-----**** setPreReturnComments for handling input for preReturnComments textInput//-----****
    setPreReturnComments(comments) {
        this.setState({
            returnComments: comments
        });

    }


    //-----**** handleCustInitials for handling input for handleCustInitials textInput//-----****
    handleCustInitials = (name) => {

        this.setState({
            custInitials: name
        })

    }


    //-----**** handleTMInitials for handling input for handleTMInitials textInput//-----****
    handleTMInitials = (name) => {

        this.setState({
            tmInitials: name
        })

    }



    //-----**** renderItem for rendering image of pre-rental//-----****
    renderItem = ({ item, index}) => {
        this.logger.getLogger().info("entering: TrailerReturnCondition: renderItem: with item as: " + item + " and index as: " + index);
        return (
            <TouchableOpacity style={componentStyles.thumbnailView} onPress={() => this.onPressThumbnail(item, index, false) }>
                <ImageBackground
                    style={componentStyles.thumbnailImageBackgroundView}
                    source={{ uri: item.binaryFile }}
                    >
                </ImageBackground>
            </TouchableOpacity>

        );
    };

    //-----**** _renderItem for rendering the captured //-----****
    _renderItem = ({ item, index }) => {
        this.logger.getLogger().info("entering: TrailerReturnCondition: _renderItem: with item as: " + item + " and index as: " + index);
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

    componentWillMount() {
        // this.nextButtonClicked1 = true;
        this.showLoader();
        this.itemStatusData = this.props.headerParams.appDetails.selectedItem;

        console.log("itemStatusData>>", this.itemStatusData);

        let headers = {
            "params": {
                deviceName: this.props.headerParams.headerParameters.deviceName,
                storeId: this.props.headerParams.headerParameters.storeId,
                applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
                userId: this.props.headerParams.headerParameters.userId,
                channelType: this.props.headerParams.headerParameters.channelType,
                localTimeZone: this.props.headerParams.headerParameters.localTimeZone
            },

            "urlVariable": { rentalNumber: this.itemStatusData.rentalNumber }
        }

        this.props.retriveRentalImages(["RENTAL",
            AppConstants.DENY_INSURANCE_IMAGE], headers);
    }


    componentWillReceiveProps(nextProps) {

        console.log("nextProps.uploadImagesDetails>>", nextProps.uploadImagesDetails);
        console.log("nextProps.retriveRentalImagesData>>", nextProps.retriveRentalImagesData);


        if (!Util.isEmpty(nextProps.uploadImagesDetails.deleteImageRes) && this.deleteImagePressed === true) {
            if (nextProps.uploadImagesDetails.deleteImageRes.responseCode === '0') { //TRY TO MERGE WITH UPPER
                // this.deleteImagePressed = false;
                //this.hideLoader();
                console.log("image deleted");
                // this.emptyReducer();


            } else {

                Alert.alert(
                    nextProps.uploadImagesDetails.deleteImageRes.message, nextProps.uploadImagesDetails.deleteImageRes.responseCode,
                    [
                        { text: translationProperties.messages.ok, onPress: () => { this.hideLoader(); } },
                    ],
                    { cancelable: false }
                );
            }

        }
        if (!Util.isEmpty(nextProps.uploadImagesDetails.response) && this.onNextClick && this.deleteImagePressed === false) {
            if ((nextProps.uploadImagesDetails.response.responseCode === '0')) {
                this.hideLoader();
                Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CUSTOMER_SIGNATURE, ({ flow: AppConstants.RETURN_FLOW }));
            } else {


                Alert.alert(
                    nextProps.uploadImagesDetails.response.message, nextProps.uploadImagesDetails.response.responseCode,
                    [
                        { text: translationProperties.messages.ok, onPress: () => { this.hideLoader(); } },
                    ],
                    { cancelable: false }
                );
            }
        }

        if (!Util.isEmpty(nextProps.retriveRentalImagesData.response) && this.deleteImagePressed === false && this.onNextClick != true) {
            if ((nextProps.retriveRentalImagesData.response.responseCode === '0')) {
                console.log("retriveRentalImagesData>>", nextProps.retriveRentalImagesData.response.imageFiles);
                this.hideLoader();
                this.setState({
                    retrievedImages_array: nextProps.retriveRentalImagesData.response.imageFiles
                });
            } else {

                Alert.alert(
                    nextProps.retriveRentalImagesData.response.message, nextProps.retriveRentalImagesData.response.responseCode,
                    [
                        { text: translationProperties.messages.ok, onPress: () => { this.hideLoader(); } },
                    ],
                    { cancelable: false }
                );
            }

        }


        if (nextProps.uploadImagesDetails.isSystemError) {
            alert(textLabel.messages.errorWentWrong);
        }

        if (nextProps.retriveRentalImagesData.isSystemError) {
            alert(textLabel.messages.errorWentWrong);
        }





    }

    render() {
        this.logger.getLogger().info("entering: returnTrailerCondition: render");
        // this.retrievedImages_array = this.props.retriveImages.images;
        return (

            <View style={componentStyles.mainParentView}>
                <HeaderComponent columnStatus={AppConstants.HEADER_DEFAULT_COLUMN_STATUS} labelName={this.state.labelName} />
                <KeyboardAvoidingView style={componentStyles.keybordAvoidingView} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>
                    <ScrollView style={RTCStyle.scrollViewStyle}>

                        <View style={RTCStyle.imageHeaderTextView}>
                            <Text style={RTCStyle.imageHeaderText}>{textLabel.messages.RentTrailerPictures}</Text>
                        </View>
                        <View
                            style={componentStyles.fullWidthSaprator}
                            />
                        <View style={componentStyles.trailerImageScrollViewHeight}>
                            <FlatList data={this.state.retrievedImages_array}
                                renderItem={this.renderItem}
                                horizontal={AppConstants.HEADER_DEFAULT_COLUMN_STATUS}
                                ItemSeparatorComponent={this.space}/>
                        </View>

                        <View
                            style={componentStyles.fullWidthSaprator}
                            />
                        <View style={componentStyles.commentSectionView}>
                            <Text style={componentStyles.commentsTextStyle}>{textLabel.messages.comments}</Text>
                            <TextInput style={
                                componentStyles.commentTextInputStyle
                            }
                                onChangeText={(preRentalComment) => { this.setPreRentalComments(preRentalComment) } }
                                // color={appColors.colors.$defaultInputTextColor}
                                returnKeyType={AppConstants.RETURN_KEY_TYPE}
                                placeholder ={translationProperties.messages.commentSection1}
                                multiline={true}
                                maxLength={AppConstants.PRE_RENTAL_COMMENTS_MAX_LENGTH}
                                />
                        </View>
                        <View
                            style={componentStyles.fullWidthSaprator}
                            />

                        {this.progressIndicatorRenderItem() }

                        <View style={RTCStyle.returnTrailerTextView}>
                            <Text style={RTCStyle.returnTrailerTextStyle}>{textLabel.messages.ReturnTrailerPictures}</Text>
                            <TouchableOpacity style={RTCStyle.cameraImageViewStyle} onPress={this.handleCameraClicked}>
                                <Image
                                    style={RTCStyle.cameraImageStyle}
                                    source={screenImages.images.camera}
                                    />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={componentStyles.fullWidthSaprator}
                            />
                        <View style={componentStyles.trailerImageScrollViewHeight}>
                            <FlatList data={this.state.imagesArray} renderItem={this._renderItem} horizontal={true} ItemSeparatorComponent={this.space} extraData={this.state}/>
                        </View>

                        <View
                            style={componentStyles.fullWidthSaprator}
                            />
                        <View style={componentStyles.commentSectionView}>
                            <Text style={componentStyles.commentsTextStyle}>{textLabel.messages.comments}</Text>
                            <TextInput style={componentStyles.commentTextInputStyle}
                                onChangeText={(returnComments) => { this.setPreReturnComments(returnComments) } }
                                // color={appColors.colors.$defaultInputTextColor}
                                multiline = {true}
                                placeholder ={translationProperties.messages.comentSection2}
                                maxLength={AppConstants.PRE_RENTAL_COMMENTS_MAX_LENGTH}
                                />
                        </View>
                        <View
                            style={componentStyles.fullWidthSaprator}
                            />
                        <Text style={RTCStyle.bottomAcknowledgeTextStyle}>{textLabel.messages.acknowledgeText}</Text>

                        <View style={componentStyles.textInputMainView}>
                            <Text style={componentStyles.labelReturnTrailerCondition}>
                                {textLabel.messages.customerInitials}
                            </Text>
                            <TextInput autoCapitalize={true} autoCorrect={false} style={componentStyles.textInputView}
                                value={this.state.custInitials}
                                placeholder ={translationProperties.messages.requiredPlaceholder}
                                // color={appColors.colors.$defaultInputTextColor}
                                returnKeyType={translationProperties.messages.RETURN_KEY_NEXT}
                                onChangeText= {this.handleCustInitials}

                                />
                        </View>
                        <View
                            style={componentStyles.viewSeparator}
                            />
                        <View style={componentStyles.textInputMainView}>
                            <Text style={componentStyles.labelReturnTrailerCondition}>
                                {textLabel.messages.tmInitials}
                            </Text>
                            <TextInput autoCapitalize={true} autoCorrect={false} style={componentStyles.textInputView}
                                value={this.state.tmInitials}
                                placeholder ={translationProperties.messages.requiredPlaceholder}
                                // color={appColors.colors.$defaultInputTextColor}
                                returnKeyType={translationProperties.messages.RETURN_KEY_NEXT}
                                onChangeText= {this.handleTMInitials}
                                />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>


                <BottomNevigationComponent leftSwipe={this.onLeftSwipe} rightSwipe = {this.onRightSwipe}  bothSideSwipable={true} />

            </View>

        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        retriveRentalImages(deviceParams, header) {

            let idparam = deviceParams;
            let params = commonRequestParams(actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES, idparam);
            params = {
                'parameters': params,
                'headers': header
            };
            dispatch({ type: actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES, params });

        },

        uploadImages(images, header) {
            let params = images;
            params = returnRequestParams(actionConstants.REQUEST_UPLOAD_IMAGES, params);
            params = {
                'parameters': params,
                'headers': header,


            };
            dispatch({ type: actionConstants.REQUEST_UPLOAD_IMAGES, params });
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
        collectData(parameters) {
            let params = parameters;
            params = returnRequestParams(actionConstants.REQUEST_PRE_RETURN_INFO, params);
            params = {
                'parameters': params,
            };
            dispatch({ type: actionConstants.REQUEST_PRE_RETURN_INFO, params });
        },



    };
};
function mapStateToProps(state) {

    return {

        retriveRentalImagesData: state.retriveRentalImageReducer,
        uploadImagesDetails: state.UploadImagesReducer,
        headerParams: state.HeaderParamsReducer,
        inspectionQuestions: state.InspectionReducer,
    }
}

export default ReturnTrailerCondition = connect(mapStateToProps, mapDispatchToProps)(ReturnTrailerCondition);


