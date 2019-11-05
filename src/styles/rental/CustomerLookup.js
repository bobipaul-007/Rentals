import {StyleSheet} from 'react-native';
import * as font from "../../styles/shared/appFonts.js";
import * as appAlignments from "../../styles/shared/appAlignments.js";
import * as color from "../../styles/shared/appColors.js";

export default StyleSheet.create({

    buttonText: {
        fontSize: font.textSize.$defaultSumbitButtonFontSize
    },
    borderColor:{borderColor: color.colors.$defaultCustLookupBgColor},
    buttonColor: { backgroundColor: color.colors.$defaultCustLookupBgColor },
    textInputMargin: { marginTop: 6,
                       height: 35 },
    iconMargin: { marginTop: 0 },
})
