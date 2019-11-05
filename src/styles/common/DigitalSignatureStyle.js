import {StyleSheet, Dimensions} from 'react-native'
let widthW = Dimensions.get('window').width; //full width
import * as appColors from "../shared/appColors.js";
import * as itemAlign from "../shared/appAlignments.js";
import * as textFont from '../shared/appFonts';



export default StyleSheet.create({
  
  imageview: { width: 30, height: 30 },

  captionText: {
   fontSize: textFont.textSize.$defaultFontSize, marginTop: itemAlign.alignItem.$defaultMarginLeft, color: appColors.colors.$defaultInputTextColor, paddingHorizontal: 10
  },

  signatureParentView: {
        flex: itemAlign.alignItem.$defaultFlex,
        flexDirection: itemAlign.alignItem.$defaultSecondaryFlexDirection,
        backgroundColor: appColors.colors.$defaultBackground
    },

  signatureView: { 
    fontSize: textFont.textSize.$defaultFontSize , backgroundColor: appColors.colors.$defaultSecTextColor,
     marginTop: itemAlign.alignItem.$defaultMargin, 
     marginLeft: 5,
     marginRight: 5,
     height: widthW / 2, 
     borderWidth:itemAlign.alignItem.$defaultBorderWidth, 
     borderColor: appColors.colors.$defaultTextColor,
  },
  signCaptureView: { 
    flex: 1, borderColor:appColors.colors.$signatureFontColor, borderWidth: itemAlign.alignItem.$defaultBorderWidth },



})