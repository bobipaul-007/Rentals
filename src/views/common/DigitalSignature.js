import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, Text, View, TouchableOpacity, TextInput, Button, Image} from 'react-native';
import styles from '../../styles/common/DigitalSignatureStyle';
import * as screenImages from "../../config/ImageProperties";
import SignatureCapture from 'react-native-signature-capture';
import common from'../../styles/shared/Components.js';
import * as textLabel from "../../config/TranslationProperties";
import { Actions } from "react-native-router-flux";
import { AppConstants } from '../../constants/AppConstants';
import Orientation  from 'react-native-orientation';
import { JsLoggerService } from "../../services/jsLoggerService";

export default class DigitalSignature extends Component {

    constructor(props) {
        super(props);
        this.onDoneButtonClick = this.onDoneButtonClick.bind(this);
        this.refreshEventCall = this.refreshEventCall.bind(this);
        this._onSaveEvent = this._onSaveEvent.bind(this);
        this.signType = this.props.signType;
        this.logger = new JsLoggerService();
    }

    onDoneButtonClick() {
        this.logger.getLogger().info("entering: DigitalSignature: onDoneButtonClick");
        this.refs["sign"].saveImage();
        this.logger.getLogger().info("exiting: DigitalSignature: onDoneButtonClick");
    }

    refreshEventCall() {
        this.logger.getLogger().info("entering: DigitalSignature: refreshEventCall");
        this.refs["sign"].resetImage();
        this.logger.getLogger().info("exiting: DigitalSignature: refreshEventCall");
    }

     componentWillMount() {
        this.logger.getLogger().info("entering: DigitalSignature: componentWillMount");
        // Orientation.lockToLandscape();
        this.logger.getLogger().info("exiting: DigitalSignature: componentWillMount");
    }

    componentDidMount() {
       // Orientation.lockToLandscape();
    }


    render() {
        this.logger.getLogger().info("entering: DigitalSignature: render");
        return (
            <View style={styles.signatureParentView}>

                <View style={common.headerParentView}>
                    <View style={common.headerViewWithHorizontalContent}>

                        <View style={common.leftHeaderView}>
                            <TouchableOpacity onPress={this.onDoneButtonClick} >
                                <Text style={common.headerTextViewStyle}>
                                    {textLabel.messages.doneLable}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={common.middleHeaderView}>

                            <Text style={common.headerTextViewStyle}>{textLabel.messages.signature}</Text>

                        </View>

                        <View style={common.rightHeaderView}>
                            <TouchableOpacity onPress={this.refreshEventCall}>
                                <Image
                                    style={styles.imageview}
                                    source={screenImages.images.refreshwithcross}
                                    />

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style={styles.captionText}>
                    {textLabel.messages.pleaseSignLabel}
                </Text>
                <View style={styles.signatureView}>
                    <SignatureCapture
                        style={styles.signCaptureView}
                        ref="sign"
                        onSaveEvent={this._onSaveEvent}
                        onDragEvent={this._onDragEvent}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={false}
                        showTitleLabel={false}
                        viewMode={"landscape"}/>
                </View>
            </View>
        );
    }

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        this.logger.getLogger().info("entering: DigitalSignature: _onSaveEvent");
        let status;
        status = { signType: this.signType, signature: result.encoded }

        // if (this.signType === "CustomerSign") {
        //     status = { custSignFlag: 'done', custSignature: result }
        // } else if (this.signType === "TMSign") {
        //     status = { TMSignFlag: 'done', tmSignature: result }
        // } 
        Actions.pop(AppConstants.SCREEN_NAMES.COMMON_VIEWS.CUSTOMER_SIGNATURE);
        this.props.func(status);
        //Actions.refresh(status);
        this.logger.getLogger().info("exiting: DigitalSignature: _onSaveEvent");
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }
}





