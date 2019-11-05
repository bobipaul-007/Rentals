import { StyleSheet } from 'react-native'
import * as appAlignments from "../shared/appAlignments.js";
import * as appColors from '../shared/appColors';
import * as appFonts from '../shared/appFonts';


export default StyleSheet.create({

    thumbnailParentView: {
        flex: appAlignments.alignItem.$defaultFlex, 
        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection, backgroundColor: appColors.colors.$transparentBackgroundColor
    },
    thumbnailEnlargeViewHeight: {
        height: appAlignments.alignItem.$defaultThumbnailImageHeight
    },
    thumbnailEnlargeLeftView: {
        position: appAlignments.alignItem.$defaultPosition, top:appAlignments.alignItem.$defaultMargin, left: 0
    },
    thumbnailEnlargeRightView: {
        position: appAlignments.alignItem.$defaultPosition, top: appAlignments.alignItem.$defaultMargin, right: 0
    },
    thumbnailEnlargeLeftText: {
        fontSize: appFonts.textSize.$defaultFontSize, color: appFonts.textSize.$defaultTextColor, fontWeight: appFonts.textSize.$defaultfontWeight, marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },
    thumbnailEnlargeRightText: {
        fontSize: appFonts.textSize.$defaultFontSize, color: appFonts.textSize.$defaultTextColor, fontWeight: appFonts.textSize.$defaultfontWeight, marginRight: appAlignments.alignItem.$defaultSecMarginLeft
    },
    thumbnailEnlargeImageBackgroundView: {
        width: '100%', height: '100%'
    }
});