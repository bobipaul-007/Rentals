import {StyleSheet, Dimensions} from 'react-native'
import * as appColors from "../shared/appColors.js";
import * as textFont from "../shared/appFonts.js";
import * as itemAlign from "../shared/appAlignments.js";
var widthW = Dimensions.get('window').width;

export default StyleSheet.create({

    horizontalRowContentView: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: itemAlign.alignItem.$defaultFlex,
        flexDirection: itemAlign.alignItem.$defaultFlexDirection
    },
    rentalListIcon: {
        marginRight: itemAlign.alignItem.$defaultMarginRight,
        alignItems: itemAlign.alignItem.$defaultAlignItem,
        justifyContent: itemAlign.alignItem.$defaultAlignItem,
        marginTop: 'auto',
        marginBottom: 'auto'
    },

    viewSeparator: {
        marginTop: itemAlign.alignItem.$defaultViewSeperatorMarginTop,
        marginRight: 0,
        marginLeft: 0,
        borderBottomColor: appColors.colors.$defaultSeperatorColor,
        borderBottomWidth: itemAlign.alignItem.$defaultBorderWidth,
    },



})