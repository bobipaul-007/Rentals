import React, { Component } from "react";
import { Text, FlatList, Keyboard, View, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import * as screenImages from "../config/ImageProperties";
import * as translationProperties from "../config/TranslationProperties";
import { connect } from "react-redux";
import { actionConstants } from "../actions/ActionConstants";
import { ServiceConfig } from "../config/ServiceConfig.js";
import { Util } from '../utils/utils';
import * as align from "../styles/shared/appAlignments.js";
import { JsLoggerService } from '../services/jsLoggerService';
import common from'../styles/shared/Components.js';
import * as appColors from "../styles/shared/appColors.js";
import { commonRequestParams } from "../request/commonRequest";
import * as textLabel from "../config/TranslationProperties";
import styles from '../styles/common/MainMenuStyles';
import { AppConstants } from "../constants/AppConstants";
import Spinner from "./common/shared/Spinner.js";

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.onPressButton = this.onPressButton.bind(this);
        this.isRenderedListView = true;
        this.logger = new JsLoggerService();
        this.goToLoginScreen = this.goToLoginScreen.bind(this);
        this.goToTrailerReturn = this.goToTrailerReturn.bind(this);
        this.goToTrailerRent = this.goToTrailerRent.bind(this);
        this.extendTrailer = this.extendTrailer.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
        this.onPressCalled = false;
        this.state = {
            status: false,
            loaderText: '',
            loaderStatus: false,
            loaderLabelName: [textLabel.messages.mainMenu],
            loaderIsLoading: false,
        }
    }

    goToTrailerReturn(screenStatus) {
        this.showLoader();
        this.logger.getLogger().info("entering:MainMenu: goToTrailerReturn");
        this.onPressCalled = false;

        if (this.props.retrieveStatuses.isSystemError) {
            this.logger.getLogger().info("InsideSystemError>>", this.props.retrieveStatuses.isSystemError);
            this.hideLoader();
            alert(textLabel.messages.errorWentWrong);
            return;
        }

        if (this.props.retrieveStatuses.itemStatusData.responseCode === AppConstants.RESPONSECODE) {

            if (this.props.retrieveStatuses.itemStatusData.rentedItems === null) {
                this.hideLoader();
                Alert.alert(
                    textLabel.messages.error, "There are no current rentals to return.",
                    [
                        {
                            text: textLabel.messages.ok,
                        },
                    ],
                    { cancelable: false },
                );
            }
            else {
                rentedItems = this.props.retrieveStatuses.itemStatusData.rentedItems.items;
                this.hideLoader();
                Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CURRENT_RENTAL, ({ flag: screenStatus, rentData: rentedItems, flow: AppConstants.RETURN_FLOW }));
                this.logger.getLogger().info("entering:MainMenu: goToTrailerReturn");
            }
        }

        this.logger.getLogger().info("entering:MainMenu: goToTrailerReturn");
    }

    goToTrailerRent(screenStatus) {
        this.showLoader();
        this.logger.getLogger().info("entering:MainMenu: goToTrailerRent");
        this.onPressCalled = false;

        if (!Util.isEmpty(this.props.retrieveStatuses.itemStatusData)) {
            this.showLoader();
            if ((this.props.retrieveStatuses.responseCode === AppConstants.RESPONSECODE)) {
                if (this.props.retrieveStatuses.inServiceItems != null) {
                    if (!Util.isEmpty(this.props.retrieveStatuses.inServiceItems.items)) {
                        ISRItems = this.props.retrieveStatuses.itemStatusData.inserviceItems.items;
                        this.hideLoader();
                        Actions.push(AppConstants.SCREEN_NAMES.RENTAL.TRAILER_TYPE, ({ flag: screenStatus }, { value: "" }, { itemStatus: ISRItems }));

                    }
                }
                else if (Util.isEmpty(this.props.retrieveStatuses.inServiceItems)) {
                    this.hideLoader();

                    Actions.push(AppConstants.SCREEN_NAMES.RENTAL.TRAILER_TYPE, ({ flag: screenStatus, value: textLabel.messages.trailerUnavailable }));

                }
            }
            else if (this.props.retrieveStatuses.isSystemError) {
                this.hideLoader();
                alert(translationProperties.messages.errorWentWrong);
            }
            else if ((this.props.retrieveStatuses.responseCode !== AppConstants.RESPONSECODE)) {
                this.hideLoader();
                Alert.alert(
                    translationProperties.messages.noService, translationProperties.messages.emptyError,
                    [
                        {
                            text: translationProperties.messages.ok,
                        },
                    ],
                    { cancelable: false },
                );
            }
        }
        this.logger.getLogger().info("entering:MainMenu: goToTrailerRent");
    }

    extendTrailer(screenStatus) {
        this.showLoader();
        this.logger.getLogger().info("entering:MainMenu: extendTrailer");
        this.onPressCalled = false;
        if (!Util.isEmpty(this.props.retrieveStatuses.itemStatusData)) {
            if ((this.props.retrieveStatuses.responseCode === AppConstants.RESPONSECODE)) {
                if (this.props.retrieveStatuses.RentedItems != null) {
                    if (!Util.isEmpty(this.props.retrieveStatuses.RentedItems.items)) {
                        Renteditems = this.props.retrieveStatuses.itemStatusData.rentedItems.items;
                        this.hideLoader();
                        Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CURRENT_RENTAL, ({ flag: screenStatus, rentData: Renteditems, flow: AppConstants.EXTEND_FLOW }));
                    }
                }
                else if (this.props.retrieveStatuses.itemStatusData.rentedItems === null) {
                    this.hideLoader();
                    Alert.alert(
                        translationProperties.messages.emptyError, translationProperties.messages.noRentalsFound,
                        [
                            {
                                text: translationProperties.messages.ok,
                            },
                        ],
                        { cancelable: false },
                    );
                }
            }
            else if (this.props.retrieveStatuses.isSystemError) {
                alert(translationProperties.messages.errorWentWrong);
            }
            else if ((this.props.retrieveStatuses.responseCode !== AppConstants.RESPONSECODE)) {
                
                this.hideLoader();

                Alert.alert(
                    translationProperties.messages.noService, translationProperties.messages.emptyError,
                    [
                        {
                            text: translationProperties.messages.ok,
                        },
                    ],
                    { cancelable: false },
                );
            }
        }
        this.logger.getLogger().info("exiting:MainMenu: extendTrailer");
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
           
            return (<Spinner animating={this.state.loaderIsLoading} />);
        }
    }


    goToLoginScreen() {
        this.logger.getLogger().info("entering:MainMenu: goToLoginScreen");
        let id = this.props.id;
        let headerParams = this.props.headerParams.headerParameters;
        let deviceParameters = [id];
        this.props.getLogOut(deviceParameters, headerParams);
        this.logger.getLogger().info("entering:MainMenu: goToLoginScreens");
    }

    onPressButton(onPressValue) {
        this.onPressCalled = true;
        this.forceUpdate();
        this.isRenderedListView = onPressValue;
    }

    componentWillMount() {
        this.logger.getLogger().info("this.state.status>>", this.state.text);
        this.props.mainMenuCallback = undefined;


        //let storeId = this.props.headerParams.headerParameters.storeId;
        let storeId = "0525";

        let itemStatus = ['REN', 'ISR'];
        let deviceParameters = [storeId, itemStatus, AppConstants.DEFAULT_ITEM_NUMBER];

        let headerParams = {
            "params": {
                deviceName: this.props.headerParams.headerParameters.deviceName,
                storeId: this.props.headerParams.headerParameters.storeId,
                applicationVersion: this.props.headerParams.headerParameters.applicationVersion,
                userId: 'userId',
                channelType: this.props.headerParams.headerParameters.channelType,
                localTimeZone: 'America/New_York'
            },
        }
        this.props.retrieveStatus(deviceParameters, headerParams);


    }

    componentWillReceiveProps(nextProps) {
        this.logger.getLogger().info("entering:MainMenu: componentWillReceiveProps");
        let retVal = nextProps.logoutUser.retcodeVal;
        this.logger.getLogger().info("InsideCRP>>", retVal);

        if (nextProps.retrieveStatuses.isSystemError) {
            this.logger.getLogger().info("InsideSystemError>>", nextProps.retrieveStatuses.isSystemError);
            alert(textLabel.messages.errorWentWrong);
            return;
        }

        if (nextProps.logoutUser.isNetworkError) {
            this.logger.getLogger().info("InsideNetworkError>>", nextProps.logoutUser.isNetworkError);
        }
        if ((nextProps.logout.islogoutState === true) && (nextProps.logoutUser.retcodeVal === 0)) {
            Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.LOGIN_SCREEN, this.props.deleteId);
        }
        this.logger.getLogger().info("entering:MainMenu: componentWillReceiveProps");
    }


    render() {
        if (!Util.isEmpty(this.props.backScreen) && this.onPressCalled === false) {
            if (this.props.backScreen === translationProperties.messages.list) {
                this.isRenderedListView = true;
            } else {
                this.isRenderedListView = false;
            }
        }

        return (

            <View style={[common.horizontalRowContentView, styles.contentView]}>
                <View style={common.headerViewWithHorizontalContent}>
                    <TouchableOpacity onPress={() => this.onPressButton(true) }>
                        <View style={styles.headerIconView}>
                            <Image
                                style={common.defaultImageView}
                                source={screenImages.images.menuIcon}
                                />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onPressButton(false) }>
                        <View style={styles.headerIconView}>
                            <Image
                                style={common.defaultImageView}
                                source={screenImages.images.squareDish}
                                />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.singleTextHeaderView}>
                        <Text style={styles.headerTextView}>
                            {translationProperties.messages.mainMenu}
                        </Text>
                    </View>


                    <View style={[common.rightHeaderView, styles.headerMargin]}>
                        <TouchableOpacity onPress={this.goToLoginScreen}>
                            <Text style={common.buttonText}>
                                {translationProperties.messages.logout}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {this.isRenderedListView == true ?

                    <View>
                        <TouchableOpacity onPress={() => this.goToTrailerRent(translationProperties.messages.list) }>
                            <View style={styles.horizontalView}>
                                <Image
                                    style={styles.busIconInListView}
                                    source={screenImages.images.rentListIcon}
                                    />
                                <Text style={styles.menuText}>
                                    {translationProperties.messages.rentTrailerLabel}
                                </Text>
                                <Image
                                    style={common.rightArrow}
                                    source={screenImages.images.backArrow}
                                    />

                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={() => this.goToTrailerReturn(translationProperties.messages.list) }>
                            <View style={styles.horizontalView}>
                                <Image
                                    style={styles.busIconInListView}
                                    source={screenImages.images.returnListIcon}
                                    />
                                <Text style={styles.menuText}>
                                    {translationProperties.messages.returnTrailerLabel}
                                </Text>
                                <Image
                                    style={common.rightArrow}
                                    source={screenImages.images.backArrow}
                                    />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={() => this.extendTrailer(translationProperties.messages.list) }>
                            <View style={styles.horizontalView}>
                                <Image
                                    style={styles.busIconInListView}
                                    source={screenImages.images.extendListIcon}
                                    />
                                <Text style={styles.menuText}>
                                    {translationProperties.messages.extendTrailerLabel}
                                </Text>
                                <Image
                                    style={common.rightArrow}
                                    source={screenImages.images.backArrow}
                                    />
                            </View>
                        </TouchableOpacity>
                    </View> :
                    <View style={{ flex: align.alignItem.$defaultFlex }}>

                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.imageHolderView}>
                                <TouchableOpacity onPress={() => this.goToTrailerRent(translationProperties.messages.collection) }>
                                    <Image
                                        style={styles.mainMenuIconStyle}
                                        source={screenImages.images.rentCollectionIcon}
                                        />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.imageHolderView}>
                                <TouchableOpacity onPress={() => this.goToTrailerReturn(translationProperties.messages.collection) }>
                                    <Image
                                        style={styles.mainMenuIconStyle}
                                        source={screenImages.images.returnCollectionIcon}
                                        />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row" }}>

                            <View style={styles.imageHolderView}>
                                <TouchableOpacity onPress={() => this.extendTrailer(translationProperties.messages.collection) }>
                                    <Image
                                        style={styles.mainMenuIconStyle}
                                        source={screenImages.images.extendCollectionIcon}
                                        />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                {this.renderLoader() }
            </View>

        );
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        getLogOut(deviceParams, header) {
            if (Util.isEmpty(deviceParams[0])) {
                Alert.alert(
                    textLabel.messages.error, textLabel.messages.errorUI3,
                    [
                        { text: textLabel.messages.ok, onPress: () => { } },
                    ],
                    { cancelable: false }
                );
            }

            else {
                let idparam = deviceParams;
                params = commonRequestParams(actionConstants.REQUEST_LOGOUT_USER, idparam);
                params = {
                    'parameters': params,
                    'headers': header
                };
                dispatch({ type: actionConstants.REQUEST_LOGOUT_USER, params });
            }
        },
        getRentals() {
            const idparam = [];
            const header = this.headerParams.headerParameters;
            let params = commonRequestParams(actionConstants.REQUEST_CURRENT_RENTALS, idparam);
            params = {
                'parameters': params,
                'headers': header
            };
            dispatch({ type: actionConstants.REQUEST_CURRENT_RENTALS, params });
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
    };
};
function mapStateToProps(state) {
    return {
        logout: state.MainMenuReducer,
        logoutUser: state.LogoutReducer,
        retrieveStatuses: state.ItemStatusReducer,
        headerParams: state.HeaderParamsReducer
    }
}
export default MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);




