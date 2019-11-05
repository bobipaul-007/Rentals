
import {StyleSheet, Dimensions} from 'react-native'
import * as appColors from "../shared/appColors.js";
import * as textFont from "../shared/appFonts.js";
import * as itemAlign from "../shared/appAlignments.js";
var widthW = Dimensions.get('window').width;

export default StyleSheet.create({

    ListTextView:
    {
        height: widthW / 6
    },

    flex: {
        flex: itemAlign.alignItem.$defaultFlex,
    },

    textMargin: { marginTop: widthW / 2 },
    textStyle: { color: appColors.colors.$defaultNoTrailerColor, fontSize: 15 },
    separator: { marginTop: 1, borderBottomColor: appColors.colors.$defaultBottomColor, borderBottomWidth: 1 }
    ,
    color: {
        backgroundColor: appColors.colors.$defaultHeaderBackground,
    },
    listText:
    {
        fontSize:textFont.textSize.$defaultListViewFontSize,
        color: appColors.colors.$defaultTextColor,
        marginLeft:10, //itemAlign.alignItem.$defaultTrailerTypeMarginLeft,
        marginTop: 10
    },

    custListIcon: {
        marginRight: itemAlign.alignItem.$defaultMarginRight,
        alignItems: itemAlign.alignItem.$defaultAlignItem,
        justifyContent: itemAlign.alignItem.$defaultAlignItem
    },

    image: { marginLeft: widthW / 7,marginTop:10,marginRight:15},
  

})