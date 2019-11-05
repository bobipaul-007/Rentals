import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import * as textLabel from '../../config/TranslationProperties';
import HeaderComponent from "../common/shared/HeaderComponent.js";
import common from'../../styles/shared/Components.js';
import { JsLoggerService } from "../../services/jsLoggerService";
import styles from '../../styles/common/CurrentRentalsStyle.js';
import * as screenImages from "../../config/ImageProperties";
import { connect } from "react-redux";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import { Actions } from "react-native-router-flux";
import { Util } from '../../utils/utils';
import { AppConstants } from '../../constants/AppConstants';
import * as translationProperties from "../../config/TranslationProperties";
import { actionConstants } from '../../actions/ActionConstants';
import { commonRequestParams } from "../../request/commonRequest";

class CurrentRental extends Component {
    constructor(props) {
        super(props);
        this.logger = new JsLoggerService();
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onLeftSwipe = this.onLeftSwipe.bind(this);
        RentedItems = this.props.rentData;
        this.rented_items = "",
            screenStatus = this.props.flag;
        this.state = {
            newItem: '',
            labelName: [textLabel.messages.currentRentalLabel],

        }
    }

    onSelectItem(item) {
        this.logger.getLogger().info("entering: CurrentRental: onSelectItem flow:" + this.props.flow);
        console.log("Extend_Rental", item);
        let params = [item];
        this.props.addAppDetails(params);
        if (this.props.flow === AppConstants.RETURN_FLOW) {
            Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.INSPECTION, ({
                flag: this.screenStatus,
                selectedItem: item, flow: AppConstants.RETURN_FLOW
            }));

        } else {
            Actions.push(AppConstants.SCREEN_NAMES.EXTEND.EXTEND_RENTAL, ({
                flag: this.screenStatus,
                selectedItem: item
            }));
        }
        this.logger.getLogger().info("exiting: CurrentRental: onSelectItem flow:" + this.props.flow);
    }

    FlatListItemSeparator = () => (<View style={common.viewSeparator} />);

    componentDidMount() {
        this.logger.getLogger().info("entering: Current Rental : componentDidMount");
        this.logger.getLogger().info("exiting: Current Rental : componentDidMount");
    }

    componentWillMount() {
        if (!Util.isEmpty(RentedItems)) {
            if (!Util.isEmpty(RentedItems[0].mobileNumber)) {
                for (var i = 0; i < RentedItems.length; i++) {
                    if (!Util.isEmpty(RentedItems[i].mobileNumber)) {
                        (RentedItems[i].mobileNumber) = Util.formatPhoneNumberWithHyphen(RentedItems[i].mobileNumber);
                    }
                    else {
                        (RentedItems[i].mobileNumber) = "null"
                    }
                }
            }
        }
        this.rented_items = RentedItems;
    }

    onLeftSwipe() {
        this.logger.getLogger().info("entering: CurrentRental: onLeftSwipe");
        Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU);
        this.logger.getLogger().info("exiting: CurrentRental: onLeftSwipe");
    }

    renderItem = ({ item, index }) =>
        (
            <TouchableOpacity onPress={() => this.onSelectItem(item) }>

                <View style={styles.horizontalRowContentView}>

                    <View style={common.rentalListTextView}>
                        <Text style={common.rentalListTitlText}>{item.customerFirstName} {item.customerLastName}</Text>
                        <Text style={common.rentalListSubTitlText}>{translationProperties.messages.ranLabel}{item.rentalNumber}</Text>
                        <Text style={common.rentalListSubTitlText}>{translationProperties.messages.mobileLabel}{item.mobileNumber}</Text>
                        <Text style={common.rentalListSubTitlText}>{translationProperties.messages.vinLabel}{item.trailerVinNumber}</Text>
                    </View>

                    <Image style={styles.rentalListIcon} source={screenImages.images.arrow} />

                </View>

            </TouchableOpacity>
        );

    render() {
        this.logger.getLogger().info("entering: CurrentRental: render");
        console.log("RentedItems_render", this.rented_items);

        return (
            <View style={common.mainParentView}>
                <HeaderComponent columnStatus='false' labelName={this.state.labelName} viewCount={1} />
                <FlatList
                    data={this.rented_items}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    />
                <BottomNavigationComponent leftSwipe={this.onLeftSwipe} bothSideSwipable={false} />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        addAppDetails(parameters) {
            let params = commonRequestParams(actionConstants.REQUEST_APP_DETAILS, parameters);
            dispatch({ type: actionConstants.REQUEST_APP_DETAILS, params });
        }
    };
};
function mapStateToProps(state) {
    return {

    }
}

export default CurrentRental = connect(mapStateToProps, mapDispatchToProps)(CurrentRental);