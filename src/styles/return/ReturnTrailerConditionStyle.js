import { StyleSheet } from 'react-native'
import * as appAlignments from "../shared/appAlignments.js";
import * as appColors from '../shared/appColors';
import * as textFont from '../shared/appFonts';

export default StyleSheet.create({

    scrollViewStyle : {
         flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection, marginTop: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    imageHeaderTextView : {
        height: appAlignments.alignItem.$defaultSwiperHeight, marginTop: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    imageHeaderText : {
        fontSize: 17, color: appColors.colors.$defaultInputTextColor, marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },
   
    returnTrailerTextView:{
        height: appAlignments.alignItem.$defaultSwiperHeight, marginTop: appAlignments.alignItem.$defaultInputViewMarginTop, flexDirection: appAlignments.alignItem.$defaultFlexDirection
    },
    returnTrailerTextStyle:{
        fontSize:17, color: appColors.colors.$defaultInputTextColor, marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },
    cameraImageViewStyle:{
        position: appAlignments.alignItem.$defaultPosition, right: 0, marginRight: 15, alignItems: appAlignments.alignItem.$defaultAlignItem, justifyContent:appAlignments.alignItem.$defaultAlignItem
    },
    cameraImageStyle:{
         width: appAlignments.alignItem.$defaultCameraIcon, height: appAlignments.alignItem.$defaultSwiperHeight, marginBottom: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    bottomAcknowledgeTextStyle:{
        marginTop: appAlignments.alignItem.$defaultInputViewMarginTop, fontSize: textFont.textSize.$defaultInputTextFontSize, color: appColors.colors.$defaultInputTextColor, marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },


   
})

