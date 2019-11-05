import React, { Component } from "react";
import { Text, View} from "react-native";
import * as appColors from "../../../styles/shared/appColors.js";
import commonStyles from '../../../styles/shared/Components.js';


export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        if (this.props.columnStatus === 'true') {

            return (
                <View style={commonStyles.headerParentView}>
                    <View style={{height:60,backgroundColor:appColors.colors.$defaultHeaderBackground}}>

                        <View style={commonStyles.headerView}>

                            <Text style={commonStyles.headerTextView}>{this.props.labelName[0]}</Text>

                        </View>

                    </View>

                    <View style={commonStyles.subHeaderView}>

                        <Text style={commonStyles.subHeaderTextView}>{this.props.labelName[1]}</Text>

                    </View>
                </View>
            );
        } else {

            if (this.props.viewCount === 1) {
                return (
                    <View style={commonStyles.headerSingleParentView}>

                        <View style={commonStyles.singleTextHeaderView}>

                            <Text style={commonStyles.headerTextView}>{this.props.labelName[0]}</Text>

                        </View>



                    </View>
                );
            }


        }
    }
}

