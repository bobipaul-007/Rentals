import { StyleSheet } from 'react-native'
import * as appAlignments from "../shared/appAlignments.js";
import * as appColors from '../shared/appColors';
import * as textFont from '../shared/appFonts';

export default StyleSheet.create({

    //compare all styles with common and remove unwanted things
    textInputMainView: {
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },

    mainView: {
        flex: appAlignments.alignItem.$defaultFlex,
        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
        marginBottom: appAlignments.alignItem.$defaultBodyBottomMargin,
        backgroundColor: appColors.colors.$defaultBackground
    },
    custInfoBottomRow: {
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        marginRight: appAlignments.alignItem.$defaultMarginRight,
        marginLeft: appAlignments.alignItem.$defaultMarginLeft,
        marginTop: 30
    },
    insuranceTextMainView: {
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        marginRight: appAlignments.alignItem.$defaultMarginRight,
        marginLeft: appAlignments.alignItem.$defaultMarginLeft,
        marginTop: appAlignments.alignItem.$defaultMarginTop
    },

    thumbnailImageBackgroundView : { height: 50, width: 75 }, //move to common

    thumbnailView:{flexDirection:'column',height:40, marginLeft:20},//move to common


    labelView: {
        flex: .55
    },

    textInputView: {
        marginLeft: 0, marginRight: 0
    },


    formTextColor: {
        color: appColors.colors.$defaultInputTextColor
    },
    thumbnailParentView:{
        flex: appAlignments.alignItem.$defaultFlex, 
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        marginTop:10
        
    },

    cameraImageStyle: { //move to common
        width:25,
        height:25
    },

    dateLabelView: { 
        marginTop: 20, height: 30 
    },

    dateTextInputView: { 
        justifyContent: "space-between", flex: 0.85, height: 80 
    },
    
    dateTextInput: { 
        marginTop: 20, height: 30, marginBottom: 15 
        
    }
})

