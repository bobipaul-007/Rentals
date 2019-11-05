
import {StyleSheet, Dimensions} from 'react-native'
import * as appColors from "../shared/appColors.js";
import * as textFont from "../shared/appFonts.js";
import * as itemAlign from "../shared/appAlignments.js";
var widthW = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default StyleSheet.create({

    custListText:
    {
        fontSize: textFont.textSize.$defaultLabelFontSize,
        color: appColors.colors.$defaultInputTextColor
    },

    list: {
        flexDirection: "row"
    },

    horizontalView: {

        height: height / 7.5,
        backgroundColor: appColors.colors.$defaultTextViewBackground,
        flexDirection: itemAlign.alignItem.$defaultFlexDirection,
        justifyContent: 'space-between'
    },
    custListTextView:
    {
        flex: 2.5,
        flexDirection: "column",
        marginLeft:15,//itemAlign.alignItem.$defaultListTextMarginLeft,

    },
    custListIcon: {
        marginRight: itemAlign.alignItem.$defaultMarginRight,
        alignItems: itemAlign.alignItem.$defaultAlignItem,
        justifyContent: itemAlign.alignItem.$defaultAlignItem,
    },

    arrow: {
        alignItems: "flex-start",//itemAlign.alignItem.$defaultAlignItem,
        justifyContent: itemAlign.alignItem.$defaultAlignItem, marginTop: 10
    }

})