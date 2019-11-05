
import React, { Component } from 'react';
import { Image, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as screenImages from "../../config/ImageProperties";
import CustomerDLInfo from "./CustomerDLInfo.js";
import * as textLabel from "../../config/TranslationProperties";
import { Actions } from "react-native-router-flux";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import { actionConstants } from '../../actions/ActionConstants';
import { connect } from "react-redux";
import { Util } from '../../utils/utils';
import { commonRequestParams } from "../../request/commonRequest";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import common from'../../styles/shared/Components.js';
import { JsLoggerService } from '../../services/jsLoggerService';
import styles from '../../styles/rental/CustomerListStyle.js';
import { AppConstants } from '../../constants/AppConstants';


class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labelName: [textLabel.messages.customerListLabel],
        };
        this.list_array = "",
            this.logger = new JsLoggerService();
        this.onLeftSwipe = this.onLeftSwipe.bind(this);

    }

    goToCustomerInfo(flag, item) {
        if (flag === "push") {
            Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_INFO);
            Actions.refresh({ flage: "CustomerList", selectedItem: item, custID: item.customerId });

        } else {
            Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_INFO, ({ screenProps: "CustomerList", selectedItem: item, custID: item.customerId }))

        }

    }


    componentDidMount() {
        // let searchedCustomerArray = "";
        // searchedCustomerArray = (this.props.search.searchCustData.customerList);
        // this.list_array = searchedCustomerArray;
        
    }

    onLeftSwipe() {
        this.logger.getLogger().info("entering:CustomerList: onLeftSwipe");
        Actions.popTo(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LOOKUP);
        this.logger.getLogger().info("entering:CustomerList: onLeftSwipe");
    }

    FlatListItemSeparator = () =>
        <View
            style={common.viewSeparator}
            />

    renderItem = ({ item, index }) =>
        (
            <TouchableOpacity onPress={() => this.goToCustomerInfo(this.props.flag, item) } >
                <View style={[styles.horizontalView]}>
                    <View
                        style={[styles.custListTextView]}>
                        <Text style={styles.custListText}>{item.firstName} {item.lastName}{"\n"}
                            {item.address1}{"\n"}{item.city}, {item.state} {item.zipcode}{"\n"}{item.phoneNumber}</Text>
                    </View>
                    {item.ncEnrolled == "Y" ?
                        <View style={styles.custListIcon}>
                            <Image source={screenImages.images.ncLogo2} />
                        </View> :
                        <View style={{ flex: 1.3 }}></View>}
                    <View style={styles.arrow}>
                        <Image style={[common.rightArrow]}
                            source={screenImages.images.arrow} />
                    </View>
                </View>
                <View style={common.viewSeparator}/>
            </TouchableOpacity>
        );


    render() {
        this.logger.getLogger().info("entering:CustomerList: render");
        let searchedCustomerArray = "";
   
        if (!Util.isEmpty(this.props.search.searchCustData.customerList)) {
     
            searchedCustomerArray = (this.props.search.searchCustData.customerList);
            if (!Util.isEmpty(searchedCustomerArray[0].phoneNumber)) {
                for (var i = 0; i < searchedCustomerArray.length; i++) {
                    
                    if (!Util.isEmpty(searchedCustomerArray[i].phoneNumber)) {
                        (searchedCustomerArray[i].phoneNumber) = Util.formatPhoneNumberWithHyphen(searchedCustomerArray[i].phoneNumber);
                    }
                    else {
                        (searchedCustomerArray[i].phoneNumber) = "null"
                    }
                }
            }
        }
        this.list_array = searchedCustomerArray;
        return (
            <View style={common.mainParentView}>

                <HeaderComponent columnStatus='false' labelName={this.state.labelName} viewCount={1} />
                <View style={{ marginBottom: 60 }}>
                    <FlatList
                        data={this.list_array}
                        renderItem={this.renderItem} />
                </View>


                <BottomNavigationComponent leftSwipe={this.onLeftSwipe} bothSideSwipable={false} />
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
    };
};
function mapStateToProps(state) {
    return {
        search: state.SearchCustomerReducer,
    }
}

export default CustomerList = connect(mapStateToProps, mapDispatchToProps)(CustomerList);


