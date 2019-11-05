import {StyleSheet} from 'react-native';
import * as appFonts from '../shared/appFonts';
import * as appAlignments from '../shared/appAlignments';
import * as appColors from "../shared/appColors";

export default StyleSheet.create({

    keyboardAvoidingView: {
        marginBottom: 0,
        // marginTop: 0
    },

    labelView: {
        flex : 0.4, marginBottom: 10
    },

    textInputMainView: {
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },

    textInputView: {
        marginLeft: 0, marginRight: 0
    },

    dateTextInputView: {
        flex: 0.7, marginRight: -20, marginLeft: 3
    },

    radioButtonParentView: {
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },
    
    radioButtonView: {
        marginRight: appAlignments.alignItem.$defaultImageMarginRight
    },

    radioButtonText: {
        fontSize: appFonts.textSize.$defaultLabelFontSize, marginLeft: appAlignments.alignItem.$defaultSecMarginLeft, marginRight: 0
    },

    separationView: { 
        marginTop: 10 
    },

    satisfactoryGreen: {
        backgroundColor: appColors.colors.$defaultSatisfactoryBgColor
    },

    nonSatisfactoryRed: {
        backgroundColor: appColors.colors.$emptyLabelFontColor
    }
})