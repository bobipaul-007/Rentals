import { StyleSheet, Dimensions} from 'react-native'
import * as appColors from "./appColors.js";
import * as appAlignments from './appAlignments';
import * as textFont from "./appFonts.js";

let widthW = Dimensions.get('window').width;
let heightH = Dimensions.get('window').height;

export default StyleSheet.create({

    modalHeight: { height: appAlignments.alignItem.$defaultModalHeight },
    modalContent: {
        height: 100, 
        backgroundColor: appColors.colors.$defaultSecTextColor, 
        borderColor: "rgba(0, 0, 0, 0.1)",
    }

})
