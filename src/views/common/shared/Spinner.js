
import React, { Component } from 'react';
import {  ActivityIndicator,  View} from 'react-native';
import * as appColors from "../../../styles/shared/appColors.js";


export default class Spinner extends Component {

    constructor(props) {
        super(props);
    }

  render() {
    return (
      <View>
        <ActivityIndicator animating={this.props.animating} size="large" color={appColors.colors.$defaultHeaderBackground} />
      </View>
    )
  }
}

