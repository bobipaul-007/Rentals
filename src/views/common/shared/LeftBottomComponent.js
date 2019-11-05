import React, { Component } from "react";
import {View, Image, TouchableOpacity} from "react-native";
import * as screenImages from "../../../config/ImageProperties";
import common from '../../../styles/shared/Components.js';

export default class LeftBottomComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>

        <TouchableOpacity onPress={this.props.leftSwipe}
          style={common.leftSwiperView}>
          <Image
            source={screenImages.images.leftSwiper}
            />
        </TouchableOpacity>


       
      </View>
    );

  }
}

