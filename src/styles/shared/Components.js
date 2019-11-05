import { StyleSheet, Dimensions} from 'react-native'
import * as appColors from "./appColors.js";
import * as appAlignments from './appAlignments';
import * as textFont from "./appFonts.js";

let widthW = Dimensions.get('window').width;
let heightH = Dimensions.get('window').height;

export default StyleSheet.create({


    emailDomainSeparator: {
        height: appAlignments.alignItem.$defaultAccessoryViewHeight,
        width: appAlignments.alignItem.$defaultWidth,
        backgroundColor: appColors.colors.$defaultTextColor
    },
    mainParentView: {
        flex: appAlignments.alignItem.$defaultFlex,
        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
        backgroundColor: appColors.colors.$defaultBackground,
        marginBottom: appAlignments.alignItem.$defaultBodyBottomMargin,
    },

    headerParentView: {
        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
        height: appAlignments.alignItem.$defaultHeaderHeight,
    },

    singleTextHeaderView: {
        flex: 0.7, marginTop: 15,
        justifyContent: appAlignments.alignItem.$defaultAlignItem,
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },

    headerSingleParentView: {

        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
        height: 63,
        backgroundColor: appColors.colors.$defaultHeaderBackground

    },

    subHeaderView: {
        height: 35,
        justifyContent: appAlignments.alignItem.$defaultAlignItem,
        alignItems: appAlignments.alignItem.$defaultAlignItem,
        backgroundColor: appColors.colors.$secHeaderColor
    },
    subHeaderTextView: {
        color: appColors.colors.$defaultSecTextColor,
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5
    },


    headerView: {
        flex: 0.67,
        justifyContent: appAlignments.alignItem.$defaultAlignItem,
        alignItems: appAlignments.alignItem.$defaultAlignItem,
        marginTop: 14
    },
    leftSwiperView: {
        height: appAlignments.alignItem.$defaultSwiperHeight, borderRadius: appAlignments.alignItem.$defaultBorderRadius, borderWidth: appAlignments.alignItem.$defaultBorderWidth, borderColor: appColors.colors.$borderColor, position: appAlignments.alignItem.$defaultPosition,
        bottom: 10, left: 0, backgroundColor: appColors.colors.$defaultSecTextColor, width: appAlignments.alignItem.$defaultBottomSwiperWidth, justifyContent: appAlignments.alignItem.$defaultAlignItem, alignItems: appAlignments.alignItem.$defaultAlignItem, marginLeft: appAlignments.alignItem.$defaultMarginLeft
    },

    headerTextView: {
        color: appColors.colors.$defaultSecTextColor,
        fontSize: textFont.textSize.$defaultHeaderFontSize,
        marginTop: 10
    },
    rightSwiperView: {
        height: appAlignments.alignItem.$defaultSwiperHeight, borderRadius: appAlignments.alignItem.$defaultBorderRadius, borderWidth: appAlignments.alignItem.$defaultBorderWidth, borderColor: appColors.colors.$borderColor, position: appAlignments.alignItem.$defaultPosition,
        bottom: 30, right: 0, backgroundColor: appColors.colors.$defaultSecTextColor, width: appAlignments.alignItem.$defaultBottomSwiperWidth, justifyContent: appAlignments.alignItem.$defaultAlignItem, alignItems: appAlignments.alignItem.$defaultAlignItem, marginRight: appAlignments.alignItem.$defaultMarginRight
    },
    bottomNavigateView: {
        position: appAlignments.alignItem.$defaultPosition,
        height: appAlignments.alignItem.$defaultSwiperHeight,
        left: 0,
        top: 600,
        //top: heightH - 40,
        width: widthW,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        alignItems: appAlignments.alignItem.$defaultLoginTextAlignment

    },
    emailDomainView: { backgroundColor: appColors.colors.$defaultEmailDomainBGColor, color: appColors.colors.defaultSecTextColor, width: widthW / 4, height: appAlignments.alignItem.$defaultAccessoryViewHeight, alignItems: appAlignments.alignItem.$defaultAlignItem, justifyContent: appAlignments.alignItem.$defaultAlignItem },
    emailDomainText: { color: appColors.colors.$defaultSecTextColor, fontSize: textFont.textSize.$defaultInputTextFontSize },


    headerViewWithHorizontalContent: {
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        height: appAlignments.alignItem.$defaultHeaderViewHeight,
        backgroundColor: appColors.colors.$defaultHeaderBackground
    },

    horizontalRowContentView: {
        flex: appAlignments.alignItem.$defaultFlex,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection
    },
    horizontalView: {
        height: appAlignments.alignItem.$defaultHeaderViewHeight,
        backgroundColor: appColors.colors.$defaultTextViewBackground,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        justifyContent: 'space-between'
    },

    satisfactoryButton: {
        height: 40, width: 130, backgroundColor: appColors.colors.$defaultTextInputBorderColor,
        marginLeft: appAlignments.alignItem.$defaultSecMarginLeft, alignItems: appAlignments.alignItem.$defaultLoginTextAlignment,
        justifyContent: appAlignments.alignItem.$defaultLoginTextAlignment, borderColor: 'gray', borderWidth: appAlignments.alignItem.$defaultBorderWidth
    },

    expandableSection1: { position: appAlignments.alignItem.$defaultPosition, bottom: 0, right: 0, marginRight: 10, marginBottom: 10 },
    expandableSection1Flex: { flex: 1, position: appAlignments.alignItem.$defaultPosition, bottom: 0, right: 0, marginRight: 10, marginBottom: 10 },

    thumbnailview: {
        height: 20
    },

    keybordAvoidingView: {
        marginTop: appAlignments.alignItem.$defaultKeyboardAvoidViewMarginTop,
        flex: appAlignments.alignItem.$defaultFlex,
        marginBottom: appAlignments.alignItem.$defaultKeyboardAvoidViewMarginBottom
    },

    labelView: {
        flex: 0.5,
        marginTop: appAlignments.alignItem.$defaultInputViewMarginTop,
        fontSize: textFont.textSize.$defaultLabelFontSize,
        color: appColors.colors.$defaultLabelTextColor
    },

    labelReturnTrailerCondition: {
        flex: appAlignments.alignItem.$defaultTextInputViewFlex,
        marginTop: appAlignments.alignItem.$defaultInputViewMarginTop,
        fontSize: textFont.textSize.$defaultLabelFontSize,
        color: appColors.colors.$defaultLabelTextColor
    },

    textInputMainView: {
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        marginRight: appAlignments.alignItem.$defaultMarginRight,
        marginLeft: appAlignments.alignItem.$defaultMarginLeft,
        marginTop: appAlignments.alignItem.$defaultMarginTop
    },
    textInputView: {
        flex: 0.65,//appAlignments.alignItem.$defaultTextInputViewFlex,
        margin: appAlignments.alignItem.$defaultMargin,
        marginTop: appAlignments.alignItem.$defaultTextViewMarginTop,
        height: 40, //appAlignments.alignItem.$defaultTextInputViewHeight,
        fontSize: textFont.textSize.$defaultInputTextFontSize,
        color: appColors.colors.$defaultInputTextColor
    },

    viewSeparator: {
        marginTop: appAlignments.alignItem.$defaultViewSeperatorMarginTop,
        marginRight: appAlignments.alignItem.$defaultMarginRight,
        marginLeft: appAlignments.alignItem.$defaultMarginLeft,
        borderBottomColor: appColors.colors.$defaultSeperatorColor,
        borderBottomWidth: appAlignments.alignItem.$defaultBorderWidth,
    },
    ImageView: {
        position: appAlignments.alignItem.$defaultPosition,
        bottom: appAlignments.alignItem.$defaultImageBottom,
        right: appAlignments.alignItem.$defaultImageRight,
        marginRight: appAlignments.alignItem.$defaultImageMarginRight,
        marginBottom: appAlignments.alignItem.$defaultImageMarginBottom
    },

    CameraView: {
        position: appAlignments.alignItem.$defaultPosition,
        bottom: appAlignments.alignItem.$defaultImageBottom,
        right: appAlignments.alignItem.$defaultImageRight,
        marginRight: appAlignments.alignItem.$defaultImageMarginRight,
        marginBottom: appAlignments.alignItem.$defaultCameraMarginBottom
    },

    defaultImageView: {
        width: appAlignments.alignItem.$defaultHeaderIconWidth,
        height: appAlignments.alignItem.$defaultHeaderIconHeight
    },

    cameraImageView: {
        width: appAlignments.alignItem.$defaultCameraImageViewWidth,
        height: appAlignments.alignItem.$defaultCameraImageViewHeight
    },
    DropdownContainerView: {
        flex: appAlignments.alignItem.$defaultDropdownContainerFlex,
        // marginTop: appAlignments.alignItem.$defaultDropdownContainerMarginTop
    },

    mainView: {
        flex: appAlignments.alignItem.$defaultFlex,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        marginBottom: appAlignments.alignItem.$defaultBodyBottomMargin,
        backgroundColor: appColors.colors.$defaultBackground
    },
    enterButton: {
        // flex: appAlignments.alignItem.$defaultFlex,
        // fontSize: textFont.textSize.$defaultEnterButtonFontSize,
        // height: appAlignments.alignItem.$defaultEnterButtonHeight,
        // color: appColors.colors.defaultLabelViewBackground,
        // backgroundColor: appColors.colors.$defaultEnterButtonColor,
        // flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
        // justifyContent: appAlignments.alignItem.$defaultLoginTextAlignment,
        // alignItems: appAlignments.alignItem.$defaultLoginTextAlignment

        justifyContent: appAlignments.alignItem.$defaultLoginTextAlignment,
        alignItems: appAlignments.alignItem.$defaultLoginTextAlignment,
        backgroundColor: appColors.colors.$defaultEnterButtonColor,
        height: appAlignments.alignItem.$defaultEnterButtonHeight
    },



    radioButtonView: {
        fontSize: textFont.textSize.$defaultInputTextFontSize,
        marginRight: appAlignments.alignItem.$defaultSecMarginRight,
        marginLeft: appAlignments.alignItem.$defaultSecMarginLeft,
        color: appColors.colors.$defaultRadioButtonTextColor
    },

    reciptTextInputView: {
        flex: .7,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        margin: 20,
        marginTop: 7,
        height: 20
    },


    digitalSignView: { fontSize: 17, color: appColors.colors.$defaultInputTextColor },

    leftHeaderView: {
        flex: appAlignments.alignItem.$defaultFlex,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        justifyContent: 'flex-start',
        alignItems: appAlignments.alignItem.$defaultAlignItem,
        marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },

    button: {
        backgroundColor: appColors.colors.$defaultInputTextColor,
        height: appAlignments.alignItem.$defaultButtonHeight,
        alignItems: appAlignments.alignItem.$defaultLoginTextAlignment,
        justifyContent: appAlignments.alignItem.$defaultLoginTextAlignment,
        marginTop: 40,
        alignSelf: appAlignments.alignItem.$defaultLoginTextAlignment,
        paddingLeft: appAlignments.alignItem.$defaultTextInputPadding,
        paddingRight: appAlignments.alignItem.$defaultTextInputPadding
    },

    buttonText: {
        color: appColors.colors.$defaultSecTextColor,
        fontSize: textFont.textSize.$defaultButtonFontSize
    },

    rightHeaderView: {
        flex: appAlignments.alignItem.$defaultFlex,
        flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        justifyContent: 'flex-end',
        alignItems: appAlignments.alignItem.$defaultAlignItem,
        marginRight: appAlignments.alignItem.$defaultSecMarginRight
    },
    middleHeaderView: {
        // flex: appAlignments.alignItem.$defaultFlex,
        // flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        alignSelf: appAlignments.alignItem.$defaultAlignItem,
        // marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },

    headerTextViewStyle: {
        color: appColors.colors.$defaultSecTextColor, fontSize: 18
    },

    downArrow: {
        position: appAlignments.alignItem.$defaultPosition,
        bottom: 0,
        right: 0,
        marginRight: 10,
        marginBottom: 10
    },

    renderContentHeight: {
        height: 250
    },

    custListTextView:
    {
        marginTop: appAlignments.alignItem.$defaultListViewMarginTop,
        marginLeft: appAlignments.alignItem.$defaultListTextMarginLeft,
        height: widthW / 4
    },


    toggleBtnOnColor: { color: appColors.colors.$defaultSecTextColor, padding: 10, fontSize: 12 },
    toggleBtnOffColor: { color: appColors.colors.$defaultTextColor, padding: 10, fontSize: 12 },


    rightArrow: {

        width: appAlignments.alignItem.$defaultHeaderIconWidth,
        height: appAlignments.alignItem.$defaultHeaderIconHeight,
        padding: appAlignments.alignItem.$defaultIconPadding,
        marginTop: 15,
        marginRight: appAlignments.alignItem.$defaultImageMarginRight,
        resizeMode: appAlignments.alignItem.$defaultResizeMode
    },


    textview: {
        //   marginTop: appAlignments.alignItem.$defaultImageMarginRight,
        fontSize: textFont.textSize.$defaultHeaderFontSize,
        color: appColors.colors.$defaultTextViewBackground
    },



    textInputBordered: {
        fontSize: 13,
        justifyContent: 'flex-start',
        margin: 10
    },

    pickerView: {
        position: appAlignments.alignItem.$defaultPosition,
        bottom: appAlignments.alignItem.$defaultImageBottom,
        right: appAlignments.alignItem.$defaultImageRight,
        marginRight: appAlignments.alignItem.$defaultSecMarginRight, marginBottom: 30
    },

    segmentControl: {
        color: appColors.colors.$defaultInputTextColor,
        marginLeft: appAlignments.alignItem.$defaultLeftMargin,
        marginRight: appAlignments.alignItem.$defaultRightMargin,
        marginTop: 15,
        height: appAlignments.alignItem.$defaultSegmentControlHeight
    },

    tabStyle: {
        borderColor: '#D52C43',
    },
    activeTabStyle: {
        backgroundColor: '#D52C43',
    },

    borderedTextInput: {
        marginLeft: appAlignments.alignItem.$defaultLeftMargin,
        marginRight: appAlignments.alignItem.$defaultRightMargin,
        marginTop: 15,
        borderWidth: appAlignments.alignItem.$defaultBorderWidth,
        borderColor: appColors.colors.$defaultTextColor,
        height: appAlignments.alignItem.$defaultBorderedTextInputHeight,
        paddingLeft: appAlignments.alignItem.$defaultTextInputPadding,
        fontSize: textFont.textSize.$defaultLabelFontSize
    },

    textInputPlaceHolderText: {
        fontSize: textFont.textSize.$defaultInputTextFontSize,
        color: appColors.colors.$defaultTextInputPlaceHolderColor
    },

    //------inspection Accordian and Modal common styles for rent and return flow-----------------//
    modalHeight: { height: appAlignments.alignItem.$defaultModalHeight },
    modalContent: {
        height: appAlignments.alignItem.$defaultModalContentHeight, backgroundColor: appColors.colors.$defaultSecTextColor, borderRadius: appAlignments.alignItem.$defaultModalBorderRadius, borderColor: "rgba(0, 0, 0, 0.1)",
    },
    accordianHeaderView: {
        borderColor: appColors.colors.$defaultPrimaryTextColor,
        borderWidth: appAlignments.alignItem.$defaultBorderWidth, flexDirection: appAlignments.alignItem.$defaultFlexDirection,
        backgroundColor: appColors.colors.$defaultTextInputBorderColor,
        padding: appAlignments.alignItem.$defaultIconPadding,
    },
    accordianSectionTitleView: {
        textAlign: appAlignments.alignItem.$defaultAlignItem, fontSize: textFont.textSize.$defaultAccordianSectionFontSiz, fontWeight: '500',
    },
    sectionParentView: {
        padding: appAlignments.alignItem.$defaultAccordianSectionPadding,
        backgroundColor: appColors.colors.$defaultSecTextColor, flex: appAlignments.alignItem.$defaultFlex
    },

    contentSectionView: {
        flex: 2, flexDirection: appAlignments.alignItem.$defaultFlexDirection, marginTop: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    doneLabelView: {
        height: appAlignments.alignItem.$defaultButtonHeight,
        backgroundColor: appColors.colors.$defaultEnterButtonColor
    },

    doneLabelStyle: {
        color: appColors.colors.$defaultSecTextColor,
        textAlign: appAlignments.alignItem.$defaultSecAlignItem,
        fontSize: textFont.textSize.$defaultFontSize,
        marginRight: appAlignments.alignItem.$defaultSecMarginRight,
        marginTop: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    //------inspection Accordian and Modal common styles for rent and return flow-----------------//

    fullWidthSaprator: {
        marginTop: 1, borderBottomColor: appColors.colors.$black, borderBottomWidth: appAlignments.alignItem.$defaultBorderWidth
    },
    commentSectionView: {
        height: appAlignments.alignItem.$commentSectionHeight, flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection
    },
    commentsTextStyle: {
        color: appColors.colors.$defaultInputTextColor, fontSize: textFont.textSize.$defaultLabelFontSize, marginLeft: 15, marginTop: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    commentTextInputStyle: {
        fontSize: textFont.textSize.$defaultLabelFontSize,
        color: appColors.colors.$defaultInputTextColor,
        marginLeft: appAlignments.alignItem.$defaultSecMarginLeft
    },
    thumbnailImageBackgroundView: { height: appAlignments.alignItem.$thumbanailHeight, width: appAlignments.alignItem.$thumbanailWidth },

    thumbnailView: { flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection, height: appAlignments.alignItem.$defaultModalHeight, marginLeft: appAlignments.alignItem.$defaultMarginLeft },
    redCrossimageView: {
        width: appAlignments.alignItem.$defaultHeaderIconWidth,
        height: appAlignments.alignItem.$defaultTextInputViewHeight
    },
    trailerImageScrollViewHeight: {
        height: appAlignments.alignItem.$commentSectionHeight, marginTop: 10
    },
    commonEndAlignments: {
        justifyContent: appAlignments.alignItem.$defaultEndAlignItem,
        alignItems: appAlignments.alignItem.$defaultEndAlignItem
    },
    commonCenterAlignments: {
        justifyContent: appAlignments.alignItem.$defaultAlignItem,
        alignItems: appAlignments.alignItem.$defaultAlignItem
    },
    acknowledgementView: {
        height: 70,
    },
    //Renamed When Anchal comes back
    preRentalPicturesView: {
        height: 55,
        flexDirection: "row"
    },

    clearIconView: {
        position: appAlignments.alignItem.$defaultPosition,
        bottom: 0,
        right: 0,
        marginRight: appAlignments.alignItem.$defaultImageMarginRight,
        marginBottom: 2
    },

    clearIcon: {
        width: appAlignments.alignItem.$defaultIconWidth,
        height: appAlignments.alignItem.$defaultIconHeight,
        justifyContent: 'flex-end',
        marginLeft: 80,
        margin: 5
    },
    acknowledgementText: {
        flex: appAlignments.alignItem.$defaultFlex,
        margin: appAlignments.alignItem.$defaultMargin,
        marginBottom: appAlignments.alignItem.$defaultImageBottom,
        height: 2 * appAlignments.alignItem.$defaultTextInputViewHeight,
        fontSize: textFont.textSize.$defaultInputTextFontSize,
        color: appColors.colors.$defaultInputTextColor,
    },

    imagesFlatList: {
        margin: appAlignments.alignItem.$defaultMargin,
    },

    preRentalPicturesText: {
        flex: 1,
        margin: appAlignments.alignItem.$defaultMargin,
        marginBottom: appAlignments.alignItem.$defaultImageBottom,
        height: 2 * appAlignments.alignItem.$defaultTextInputViewHeight,
        fontSize: textFont.textSize.$defaultInputTextFontSize,
        color: appColors.colors.$defaultInputTextColor,
        textAlignVertical: "center",
    },

    preRentalImage: {
        flexDirection: "column",
        alignItems: "center",
        margin: appAlignments.alignItem.$defaultMargin,
        height: appAlignments.alignItem.$defaultButtonHeight,
        width: appAlignments.alignItem.$defaultHeaderHeight,
        color: appColors.colors.$defaultInputTextColor,
    },

    retakeText: {
        color: "steelblue",
        fontWeight: textFont.fontWeight.$defaultfontWeight,
    },

    scrollView: {
        flexDirection: appAlignments.alignItem.$defaultSecondaryFlexDirection,
        marginTop: appAlignments.alignItem.$defaultInputViewMarginTop
    },
    rentalListTextView:
    {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: appAlignments.alignItem.$defaultMarginLeft,
        height: widthW / 3,
        marginRight: 'auto'
    },
    rentalListTitlText:
    {
        fontSize: textFont.textSize.$defaultFontSize,//23,
        color: appColors.colors.$defaultInputTextColor,
        marginBottom: 10
    },
    rentalListSubTitlText:
    {
        fontSize: textFont.textSize.$defaultLabelFontSize, //15,
        color: appColors.colors.$defaultInputTextColor,
        lineHeight: 30,
    },
    renderMainView: {
        flexDirection: appAlignments.alignItem.$defaultListViewDirection, backgroundColor: appColors.colors.$defaultListViewColor
    },
    labelViews: {
        flex: 0.52,//0.53,
        marginTop: appAlignments.alignItem.$defaultInputViewMarginTop,
        fontSize: textFont.textSize.$defaultLabelFontSize,
        color: appColors.colors.$defaultLabelTextColor
    },
   textInputViews: {
        flex: 0.65,
        margin: appAlignments.alignItem.$defaultMargin,
        marginTop: appAlignments.alignItem.$defaultTextViewMarginTop,
        height: 40, //appAlignments.alignItem.$defaultTextInputViewHeight,
        fontSize: textFont.textSize.$defaultInputTextFontSize,
        color: appColors.colors.$defaultInputTextColor
    },
})
