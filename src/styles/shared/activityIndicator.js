import {StyleSheet, Dimensions} from 'react-native';
import * as itemAlign from "../shared/appAlignments.js";

export default StyleSheet.create({
    container: {
        flex: itemAlign.alignItem.$defaultFlex,
        justifyContent: itemAlign.alignItem.$defaultAlignItem
    },
    horizontal: {
        flexDirection: itemAlign.alignItem.$defaultIndicatorFlexDirection,
        justifyContent: itemAlign.alignItem.$defaultIndicatorAlign,
        padding: itemAlign.alignItem.$defaultIndicatorPadding
    }
})