import { StyleSheet, Dimensions } from 'react-native';

import * as appFonts from "../shared/appFonts.js";
import * as appAlignments from "../shared/appAlignments";
import * as colors from "../shared/appColors";
let widthW = Dimensions.get('window').width;
export default StyleSheet.create({


    contentView: {
        backgroundColor: colors.colors.$defaultBackground,
        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
    },

    headerIconView: {
        flex: 1,
        marginLeft: appAlignments.alignItem.$defaultMarginLeft,
        marginTop: 30
    },

    headerMargin: {
        marginTop: 25,
        flex: 1,
    },
    headerButton: {
        flex: 0.3,
        marginTop: 25,
        justifyContent: appAlignments.alignItem.$defaultAlignItem,
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },


    singleTextHeaderView: {
        flex: 1,
        marginTop: 15,
        justifyContent: "flex-end",// appAlignments.alignItem.$defaultAlignItem,
        alignItems: "flex-end",//appAlignments.alignItem.$defaultAlignItem
    },


    headerTextView: {
        color: colors.colors.$defaultSecTextColor,
        fontSize: appFonts.textSize.$defaultHeaderFontSize,
        marginTop: 10
    },

    horizontalView: {
        height: appAlignments.alignItem.$defaultHeaderViewHeight,
        backgroundColor: colors.colors.$defaultTextViewBackground,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        justifyContent: 'space-between'
    },

    collectionListView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#fff'
    },
    busIconInListView: {
        width: 50,
        height: 50,
    },
    menuText: {
        marginVertical: appAlignments.alignItem.$defaultVerticalMargin,
        marginRight: appAlignments.alignItem.$defaultMariginRightListItems,
        fontSize: appFonts.textSize.$defaultListViewFontSize,
        color: colors.colors.$defaultLabelTextColor,
    },

    collectionViewText: {
        fontWeight: appFonts.fontWeight.$defaultfontWeight,
        fontSize: 12,
        color: colors.colors.$defaultLabelTextColor,

    },
    mainMenuTitle: {
        flex: appAlignments.alignItem.$defaultImageFlex,
        marginTop: 20
    },


    separator: {
        borderBottomColor: colors.colors.$defaultSeperatorColor,
        borderBottomWidth: appAlignments.alignItem.$defaultBorderWidth,
    },
    imageHolderView: {
        flex: widthW / 2,
        // flex:0.5,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10

    },
    mainMenuIconStyle: {
        height: 150,
        width: 150
    },
    new: {
        width: "100%",
        aspectRatio: 2 / 1,
        flexDirection: 'row'
    }
});
