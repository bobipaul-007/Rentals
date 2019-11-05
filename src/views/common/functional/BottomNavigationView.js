import React, { Component } from "react";
import { View, Image, TouchableOpacity} from "react-native";
import * as screenImages from "../../../config/ImageProperties";
import common from '../../../styles/shared/Components.js';
import LeftBottomComponent from '../shared/LeftBottomComponent.js';

export default class BottomNavigationView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.bothSideSwipable == true) {
            return (
                <View style={common.bottomNavigateView}>
                    <LeftBottomComponent  leftSwipe ={this.props.leftSwipe}/>
                    <TouchableOpacity onPress={this.props.rightSwipe}
                        style={common.rightSwiperView}>
                        <Image
                            source={screenImages.images.rightSwiper}
                            />
                    </TouchableOpacity>
                </View>
            );

        } else {
            return (
                <View style={common.bottomNavigateView}>
                    <LeftBottomComponent  leftSwipe ={this.props.leftSwipe}/>

                </View>
            );


        }

    }
}

