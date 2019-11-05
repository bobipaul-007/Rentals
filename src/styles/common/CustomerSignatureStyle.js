import { StyleSheet } from 'react-native'
import * as appAlignments from "../shared/appAlignments.js";
import * as fonts from '../../styles/shared/appFonts.js'


export default StyleSheet.create({

    labelView: {
        marginBottom: 15
    },

    textInputView: {
        flex: 0.8, marginRight: -5, marginLeft: 5
    },

    radioButtonParentView: {
        flexDirection: appAlignments.alignItem.$defaultFlexDirection, flex: 0.8, marginRight: -5, marginLeft: 5
    },

    radioButtonView: {
        marginRight: appAlignments.alignItem.$defaultImageMarginRight, 
        marginTop: 10,
        flex: 0.75, 
        marginLeft: 0
    },

    radioButtonText: {
        fontSize: fonts.textSize.$defaultLabelFontSize, marginLeft: appAlignments.alignItem.$defaultSecMarginLeft, marginRight: 0
    }

});