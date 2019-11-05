import { StyleSheet, Dimensions } from 'react-native';
import * as appColors from "../shared/appColors";
import * as appFonts from '../shared/appFonts';
import * as appAlignments from '../shared/appAlignments';


let widthW = Dimensions.get('window').width;
let heightH = Dimensions.get('window').height;

export default StyleSheet.create({
    view: {
        flex: appAlignments.alignItem.$defaultFlex,
        width: widthW,
        backgroundColor: appColors.colors.$defaultBackground
    },
    loginContentView: {
        backgroundColor:appColors.colors.$defaultBackground,
        marginBottom: appAlignments.alignItem.$defaultBodyBottomMargin,
        alignItems: appAlignments.alignItem.$defaultLoginTextAlignment,
        justifyContent: appAlignments.alignItem.$defaultLoginTextAlignment,
    },
    contentView: {
        alignItems: appAlignments.alignItem.$defaultLoginTextAlignment,
        justifyContent: appAlignments.alignItem.$defaultLoginTextAlignment,
    },

    loginTextInput: {
        fontSize: 13,
        justifyContent: 'flex-start',
        margin: 10
    },
    applicationNameText: {
        fontSize: 19
    },
    applicationVersionText: {
        fontSize: appFonts.$defaultSubHeaderFontSize,
        fontStyle: appFonts.fontStyle.$defaultVersionTextStyle,

    },

    userIdtextInput: {
        flex: appAlignments.alignItem.$defaultFlex,
        borderRadius: 1,
        marginTop: appAlignments.alignItem.$defaultMarginTop,
        height: '9%',
        borderColor: appColors.colors.$defaultInputborderColor,
        width: '70%'
    },
    marginBottom: { marginBottom: 60 }

})
