
import React, { Component } from 'react';
import { Image, FlatList, Text, View, Alert, TouchableOpacity } from 'react-native';
import * as screenImages from "../../config/ImageProperties";
import * as textLabel from "../../config/TranslationProperties";
import { Actions } from "react-native-router-flux";
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js';
import { actionConstants } from '../../actions/ActionConstants';
import { connect } from "react-redux";
import { JsLoggerService } from "../../services/jsLoggerService";
import { Util } from '../../utils/utils';
import { commonRequestParams } from "../../request/commonRequest";
import HeaderComponent from "../common/shared/HeaderComponent.js";
import common from'../../styles/shared/Components.js';
import styles1 from '../../styles/rental/TrailerTypeStyle.js';
import { AppConstants } from '../../constants/AppConstants';


class TrailerType extends Component {

    constructor(props) {
        super(props);
        ISRItems = this.props.itemStatus;
        this.logger = new JsLoggerService();
        this.onLeftSwipe = this.onLeftSwipe.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.goToNextScreen = this.goToNextScreen.bind(this);

        this.state = {
            labelName: [textLabel.messages.trailerTypeLabel],
        };
    }

    onLeftSwipe() {
        this.logger.getLogger().info("entering:TrailerType: onLeftSwipe");
        Actions.popTo(AppConstants.SCREEN_NAMES.COMMON_VIEWS.MAIN_MENU);
        this.logger.getLogger().info("exiting:TrailerType: onLeftSwipe");
    }

    componentDidMount() {
        this.logger.getLogger().info("entering:TrailerType:componentDidMount");
    
        this.logger.getLogger().info("exiting:TrailerType: componentDidMount");
    }

    goToNextScreen(item) {
        this.logger.getLogger().info("entering: TrailerType: goToNextScreen");

        let params = [item];
        this.props.addAppDetails(params);

     Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.INSPECTION, ({ flow: AppConstants.RENTAL_FLOW, selectedItem: item }));
    //Actions.push(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CUSTOMER_SIGNATURE);

    }

    renderItem = ({ item, index }) =>
        (
            <View style={[common.horizontalRowContentView, common.renderMainView]}>
                <TouchableOpacity  onPress={() => this.goToNextScreen(item) }>
                    <View style={common.horizontalView}>

                        <Text style={styles1.listText}>{item.itemType}</Text>

                        <Image style ={common.rightArrow}
                            source={screenImages.images.arrow} />
                    </View>
                </TouchableOpacity>
                <View style={common.fullWidthSaprator}/>
            </View>
        );

    render() {
        this.logger.getLogger().info("entering:TrailerType: render");
        return (
            <View style={common.mainParentView}>
                <HeaderComponent columnStatus='false' labelName={this.state.labelName} viewCount={1} />
                {this.props.value == textLabel.messages.trailerUnavailable ?
                    <View  style={[common.commonCenterAlignments, styles1.textMargin]}>
                        <Text style={styles1.textStyle}>
                            {textLabel.messages.trailerUnavailable}
                        </Text>
                    </View>
                    :
                    <View style={{ marginBottom: 60 }}>
                        <FlatList
                            data={ISRItems}
                            renderItem={this.renderItem} />
                    </View>
                }
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
        trailerTypes: state.ItemStatusReducer,

    }
}

export default TrailerType = connect(mapStateToProps, mapDispatchToProps)(TrailerType);


