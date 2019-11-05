
import React, { Component } from 'react';
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import * as screenImages from "../../../config/ImageProperties";
import { Actions } from "react-native-router-flux";
import HeaderComponent from "../shared/HeaderComponent.js";
import styles from '../../../styles/rental/ThumbNailStyles.js';
import * as textLabel from "../../../config/TranslationProperties";


export default class ThumbnailView extends Component {

    constructor(props) {
        super(props);
        this.OnDeletePress = this.OnDeletePress.bind(this);

    }

    OnDeletePress() {
        this.props.deleteState(this.props.index);
        Actions.pop(this.props.screenProps);
        // Actions.pop("CustomerDLInfo",({ screenProps: "done" }));

    }

    render() {

        return (
            <View style={styles.thumbnailParentView}>

                <View style={styles.thumbnailEnlargeViewHeight}>

                    <TouchableOpacity style={styles.thumbnailEnlargeLeftView} onPress={() => Actions.popTo(this.props.screenProps) }>
                        <Text style={styles.thumbnailEnlargeLeftText}>{textLabel.messages.Back}</Text>
                    </TouchableOpacity>

                    {this.props.checkForDelete === true ?

                        <TouchableOpacity style={styles.thumbnailEnlargeRightView} onPress={this.OnDeletePress }>
                            <Text style={styles.thumbnailEnlargeRightText}>{textLabel.messages.delete}</Text>
                        </TouchableOpacity> : null}

                </View>

                <View>
                    <ImageBackground source={{ uri: this.props.EnlargeImageURI }} style={styles.thumbnailEnlargeImageBackgroundView}/>
                </View>
            </View>

        );
    }
}






