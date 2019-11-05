

import {StyleSheet} from 'react-native';
import * as fonts from '../../styles/shared/appFonts.js'
import * as appAlignments from '../../styles/shared/appAlignments';

export default StyleSheet.create({
    textInputMainView: {
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },

    textInputView: {
        marginLeft: 0, marginRight: 0
    },

    dateTextInputView: {
        flex: 0.7, marginRight: -20, marginLeft: 3
    },

    marginTop: { marginTop: 20 },
    labelView: {
        flex: 0.4, marginBottom: 10
    },

    temp: {
        marginBottom: 50
    },

    dropDownContainer: {
        marginTop: -30
    },

    // styles for radio button

    radioButtonText: {
        fontSize: fonts.textSize.$defaultLabelFontSize, marginLeft: 7, marginRight: 0
    },

    radioButtonParentView: {
        flex: appAlignments.alignItem.$defaultTextInputViewFlex, alignItems: appAlignments.alignItem.$defaultAlignItem
    },

    radioButtonView: {
        marginRight: appAlignments.alignItem.$defaultImageMarginRight
    },

    damagesRadioButtonSpaceBetween: {
        marginLeft: 29
    }

})