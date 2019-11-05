import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, Image, FlatList, TouchableHighlight, Alert, Keyboard } from 'react-native'
import * as textLabel from '../../config/TranslationProperties'
import common from '../../styles/shared/Components.js'
import HeaderComponent from '../common/shared/HeaderComponent.js'
import BottomNavigationComponent from '../common/functional/BottomNavigationView.js'
import styles from '../../styles/common/InspectionStyle.js'
import * as screenImages from '../../config/ImageProperties'
import moment from "moment"
import Accordion from 'react-native-collapsible/Accordion'
import { JsLoggerService } from '../../services/jsLoggerService'
import Modal from "react-native-modal";
import * as appColors from "../../styles/shared/appColors.js"
import { Actions } from "react-native-router-flux"
import { AppConstants } from '../../constants/AppConstants';
import { connect } from 'react-redux';
import { commonRequestParams } from "../../request/commonRequest";
import { actionConstants } from '../../actions/ActionConstants';
import { Util } from '../../utils/utils';
import { DeviceInformationService } from '../../services/deviceInformationService';
import Spinner from "../common/shared/Spinner.js";


class Inspection extends Component {
  constructor(props) {
    super(props);
    this.logger = new JsLoggerService();
    this.onRightSwipe = this.onRightSwipe.bind(this);
    this.category = [];
    this.questionAnswers = [];
    this.questionCount = 0;
    this.selectedQuestionId = 0;
    this.agreementNumber = "";
    this.state = {
      activeSections: [],
      conductedBy: '',
      height: 0,
      date: '',
      trailerDamages: false,
      visibleModal: null,
      refreshAccordianButton: false,
      answerComment: '',
      loaderText: '',
      loaderStatus: false,
      loaderLabelName: [textLabel.messages.inspection],
      loaderIsLoading: false
    }
    this.isReturnFlow = "";
    this.rentalType = "";
    this.shownSomethingWentWrong = true;
    this.isNextButtonClicked = false;
    this.isRetrieveQsnCalled = true;
    this.deviceInformation = new DeviceInformationService();
    this.progressIndicatorRenderItem = this.progressIndicatorRenderItem.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.onLeftSwipe = this.onLeftSwipe.bind(this);
  }

  //-----****  showLoader call for showing activityIndicator //-----****
  showLoader = () => {
    this.logger.getLogger("entering: Inspection: showLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: true
    });
    this.logger.getLogger("exiting: Inspection: showLoader");
  };

  //-----**** hideLoader call for hiding activityIndicator //-----****
  hideLoader = () => {
    this.logger.getLogger("entering: Inspection: hideLoader");
    this.setState({
      loaderText: this.state.loaderText,
      loaderStatus: this.state.loaderStatus,
      loaderLabelName: this.state.loaderLabelName,
      loaderIsLoading: false
    });
    this.logger.getLogger("exiting: Inspection: hideLoader");
  };

  //-----**** progressIndicatorRenderItem to call Spinner(Activity Indicator) component  //-----****
  progressIndicatorRenderItem() {
    this.logger.getLogger("entering: Inspection: progressIndicatorRenderItem");
    console.log("idloading>>>", this.state.loaderIsLoading);
    if (this.state.loaderIsLoading) {
      Keyboard.dismiss()
      return (<Spinner animating={this.state.loaderIsLoading} />);
    }
    this.logger.getLogger("exiting: Inspection: progressIndicatorRenderItem");
  }

  componentDidMount() {
    if (String(this.props.flow) === AppConstants.RENTAL_FLOW) {
      this.isReturnFlow = false;
      this.rentalType = AppConstants.DEFAULT_RENTAL_TYPE;
    }
    else if (String(this.props.flow) === AppConstants.RETURN_FLOW) {
      this.isReturnFlow = true;
      this.agreementNumber = this.props.selectedItem.rentalNumber;
      this.rentalType = AppConstants.DEFAULT_RETURN_TYPE;
    }
    let today = Util.getCurrentDateTime();
    today = moment(today).format(AppConstants.DEFAULT_DATE_FORMAT);
    this.setState({
      date: today,
      conductedBy: !Util.isEmpty(this.props.loginUser.userLoginData.response) ? this.props.loginUser.userLoginData.response.name : ""
    })

    // this.showLoader();
    // this.isRetrieveQsnCalled = true;
    // let headers = {
    //   params: this.props.headerParams.headerParameters,
    //   urlVariable: { itemId: this.props.selectedItem.itemId }
    if (Util.isEmpty(this.agreementNumber)) {
      this.showLoader();
      let headerParams = { params: this.props.headerParams.headerParameters };
      this.props.getRentalAgreementNumber([this.props.headerParams.headerParameters.storeId, ""], headerParams);
    } else {
      this.fetchInspectionQuestions();

    }
    //this.props.getInspectionQuestions([this.rentalType], headers);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isNextButtonClicked === true) {
      this.isNextButtonClicked = false;
      if (nextProps.updatedInspectionQuestions.response) {
        if (nextProps.updatedInspectionQuestions.response.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
          if (this.isReturnFlow) {
            this.hideLoader();
            Actions.push(AppConstants.SCREEN_NAMES.RETURN.RETURN_TRAILER_CONDITION, ({ selectedItem: this.props.selectedItem }));
          }
          else {
            this.hideLoader();

            Actions.push(AppConstants.SCREEN_NAMES.RENTAL.CUSTOMER_LOOKUP);
            //   Actions.push(AppConstants.SCREEN_NAMES.RENTAL.PRE_RENTAL_AGREEMENT);


          }

        } else if (nextProps.updatedInspectionQuestions.response.responseCode !== AppConstants.STRINGSUCCESSRETCODE) {
          this.hideLoader();
          Alert.alert(
            nextProps.updatedInspectionQuestions.response.message, textLabel.messages.emptyError,
            [
              {
                text: AppConstants.ALERT_OK_BUTTON_TITLE,
              },
            ],
            { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
          );
        }

      } else if (nextProps.updatedInspectionQuestions.isSystemError) {
        this.hideLoader();
        Alert.alert(
          textLabel.messages.errorWentWrong, textLabel.messages.emptyError,
          [
            {
              text: AppConstants.ALERT_OK_BUTTON_TITLE,
            },
          ],
          { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
        );
      } else {
        this.hideLoader();
      }
    }
    // else {
    //   this.hideLoader();
    //   if (this.isRetrieveQsnCalled) {
    //     this.isRetrieveQsnCalled = false;
    //     this.displayQuestion(nextProps.inspectionQuestions)
    //   }
    //   if (Util.isEmpty(this.agreementNumber)) {
    //     let headerParams = { params: this.props.headerParams.headerParameters };
    //     this.props.getRentalAgreementNumber([this.props.headerParams.headerParameters.storeId, ""], headerParams);
    //   }
    // }
    else {
      if (this.isRetrieveQsnCalled) {
        this.isRetrieveQsnCalled = false;
        this.hideLoader();
        this.displayQuestion(nextProps.inspectionQuestions)
      }

      if (nextProps.inspectionQuestions.agreementNumber && Util.isEmpty(this.agreementNumber)) {
        this.hideLoader();
        if (nextProps.inspectionQuestions.agreementNumber.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
          this.agreementNumber = nextProps.inspectionQuestions.agreementNumber.rentalNumber;
          this.fetchInspectionQuestions();
        } else if (this.shownSomethingWentWrong && nextProps.inspectionQuestions.agreementNumber.responseCode !== AppConstants.STRINGSUCCESSRETCODE) {
          this.shownSomethingWentWrong = false;
          alert(nextProps.inspectionQuestions.agreementNumber.message);
        }
      } else if (this.shownSomethingWentWrong && nextProps.inspectionQuestions.isSystemErrorInGetAgreementNo) {
        this.shownSomethingWentWrong = false;
        this.hideLoader();
        alert(textLabel.messages.errorWentWrong);
      } else {
        this.hideLoader();
      }
    }
  }

  fetchInspectionQuestions() {
    this.showLoader();
    this.isRetrieveQsnCalled = true;
    let headers = {
      params: this.props.headerParams.headerParameters,
      urlVariable: { itemId: this.props.selectedItem.itemId }
    }
    this.props.getInspectionQuestions([this.rentalType], headers);
  }


  //-----**** handling response of retrieve inspection question api//-----****
  displayQuestion(questionResponse) {
    if (questionResponse.response) {
      if (questionResponse.response.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
        const categoryDetails = questionResponse.response.category;
        this.category = categoryDetails;
        this.questionCount = 0;
        for (let i = 0; i < this.category.length; i++) {
          let questionList = this.category[i].questions;
          this.questionCount = this.questionCount + questionList.length;
          questionList = questionList.map((questions) => {
            return { ...questions, selectedAnswer: '', comments: '' };
      });
      this.category[i].questions = questionList;
    }

  } else if(questionResponse.response.responseCode !== AppConstants.STRINGSUCCESSRETCODE) {
    Alert.alert(
      questionResponse.response.message, textLabel.messages.emptyError,
      [
        {
          text: AppConstants.ALERT_OK_BUTTON_TITLE,
        },
      ],
      { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
    );
  }
} else if (questionResponse.isSystemErrorInRetrieveQsns) {
  Alert.alert(
    textLabel.messages.errorWentWrong, textLabel.messages.emptyError,
    [
      {
        text: AppConstants.ALERT_OK_BUTTON_TITLE,
      },
    ],
    { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
  );
}
  }

//-----**** onLeftSwipe call for navigating to prev Component//-----****
onLeftSwipe() {
  Alert.alert(
    textLabel.messages.returnInspectionExitMsg, textLabel.messages.emptyError,

    [
      { text: AppConstants.ALERT_YES_BUTTON_TITLE, onPress: () => { Actions.pop(); this.props.addAppDetails(['']); } },
      { text: AppConstants.ALERT_NO_BUTTON_TITLE }
    ],
    { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
  );
}

//-----**** onRightSwipe call for navigating to next Component; Update inspection question api is executed//-----****
onRightSwipe() {
  

  this.isNextButtonClicked = true;
  let isCommentValid = this.validateAnswerComments();
  if (!Util.isEmpty(this.state.conductedBy) && !Util.isEmpty(this.state.date) && this.questionAnswers.length === this.questionCount && isCommentValid) {
    this.showLoader();
    let headers = {
      params: this.props.headerParams.headerParameters,
      urlVariable: { itemId: this.props.selectedItem.itemId, rentalNumber: this.agreementNumber }//this.props.selectedItem.itemId,
    }
    this.props.updateInspectionQuestions([this.rentalType, this.questionAnswers], headers);
  } else if (this.questionAnswers.length !== this.questionCount) {
    this.isNextButtonClicked = false;
    Alert.alert(
      textLabel.messages.inspectionQuestionError, textLabel.messages.emptyError,
      [
        {
          text: AppConstants.ALERT_OK_BUTTON_TITLE,
        },
      ],
      { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
    );
  } else if (!isCommentValid) {
    this.isNextButtonClicked = false;
    Alert.alert(
      textLabel.messages.inspectionCommentsError, textLabel.messages.emptyError,
      [
        {
          text: AppConstants.ALERT_OK_BUTTON_TITLE,
        },
      ],
      { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
    );
  } else {
    this.isNextButtonClicked = false;
    Alert.alert(
      textLabel.messages.errorLableMissingField, textLabel.messages.errorType1,
      [
        {
          text: AppConstants.ALERT_OK_BUTTON_TITLE,
        },
      ],
      { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
    );
  }
}


//-----**** Validating whether all required answer comments are inputed or not//-----****
validateAnswerComments() {
  for (let i = 0; i < this.category.length; i++) {
    const questionList = this.category[i].questions;
    for (let j = 0; j < questionList.length; j++) {
      const questions = questionList[j];
      if ((String(questions.selectedAnswer) === AppConstants.SATISFACTORY && String(questions.commentsRequiredAT1) === AppConstants.COMMENT_REQUIRED) || (String(questions.selectedAnswer) === AppConstants.NOT_SATISFACTORY && String(questions.commentsRequiredAT2) === AppConstants.COMMENT_REQUIRED)) {
        if (Util.isEmpty(questions.comments)) {
          return false;
        }
      }
    }
  }
  return true;
}

//-----**** Displaying selected comment box//-----****
onPressCommentButton(index) {
  const questionList = this.category[this.state.activeSections[0]].questions;
  this.selectedQuestionId = questionList[index].questionId;
  const comment = questionList[index].comments;
  this.setState({ visibleModal: AppConstants.DEFAULT_MODAL_VISIBLE, answerComment: comment });
}

//-----**** handling inspection questions category//-----****
renderHeader(section, index, isActive) {
  return (

    <View style={common.accordianHeaderView}>
      <Text style={common.accordianSectionTitleView}>{section.categoryName}</Text>
      <Image
        style={common.downArrow}
        source={isActive ? screenImages.images.upArrow : screenImages.images.downArrow}
        />
    </View>
  );
};

//-----**** handling accordian view content i.e. inspection questions//-----****
renderContent = (section, index) => {
  return (
    <View style={common.renderContentHeight}>
      <FlatList data={this.category[index].questions}
        renderItem={this.renderItem}
        extraData={this.state} />
    </View>
  );
};

//-----**** rendering accordian view content i.e. inspection questions & answers//-----****
renderItem = ({ item, index }) => {
  return (
    <View style={common.sectionParentView}>
      <View style={common.contentSectionView}>
        <View >
          <Text>{item.question}</Text>
        </View>

        {(String(item.selectedAnswer) === AppConstants.SATISFACTORY && String(item.commentsRequiredAT1) === AppConstants.COMMENT_REQUIRED) || (String(item.selectedAnswer) === AppConstants.NOT_SATISFACTORY && String(item.commentsRequiredAT2) === AppConstants.COMMENT_REQUIRED) ?
          <View style={common.expandableSection1Flex}>
            <TouchableHighlight onPress={() => this.onPressCommentButton(index) }>
              <Image
                style={common.cameraImageView}
                source={screenImages.images.paperpen}
                />
            </TouchableHighlight>
          </View>
          :
          <View />
        }
      </View>

      <View style={common.contentSectionView}>
        <TouchableHighlight onPress={() => this.changeSatisfactoryStatus(index) }>
          <View style={String(item.selectedAnswer) === AppConstants.SATISFACTORY ? [common.satisfactoryButton, styles.satisfactoryGreen] : common.satisfactoryButton}>
            <Text style={String(item.selectedAnswer) === AppConstants.SATISFACTORY ? common.toggleBtnOnColor : common.toggleBtnOffColor}>{item.answerType1}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.changeNotSatisfactoryStatus(index) }>
          <View style={String(item.selectedAnswer) === AppConstants.NOT_SATISFACTORY ? [common.satisfactoryButton, styles.nonSatisfactoryRed] : common.satisfactoryButton}>
            <Text style={String(item.selectedAnswer) === AppConstants.NOT_SATISFACTORY ? common.toggleBtnOnColor : common.toggleBtnOffColor}>{item.answerType2}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

//-----**** updating view when tapping on accordian header views; i.e. accordian view expands & collapse//-----****
updateSections = activeSections => {
  this.logger.getLogger().info("_updateSections>>", activeSections); //Replace Logger with proper Logs
  this.setState({ activeSections });
};

//-----**** button action for comment box done button//-----****
renderButton = (text, onPress) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={common.doneLabelStyle}>{text}</Text>
  </TouchableOpacity>
);

//-----**** handles comment box for selected answers//-----****
renderModalContent = () => (
  <View style={common.modalContent}>
    <View style={common.doneLabelView}>
      {this.renderButton(textLabel.messages.doneLable, () => this.getAnswerComment()) }
    </View>
    <TextInput
      style={common.modalHeight}
      autoCorrect={false}
      onChangeText={(answerComment) => this.setState({ answerComment }) }
      value={this.state.answerComment}
      placeholderTextColor={appColors.colors.$defaultDialogBoxPlaceHolderColor}
      placeholder={textLabel.messages.inspecDialog}
      multiline={true}
      autoFocus={true}
      />

  </View>
);

//-----**** handles the user entered comments for selected answer//-----****
getAnswerComment() {
  const comment = this.state.answerComment;
  if (!Util.isEmpty(comment)) {
    const found = this.questionAnswers.some(data => data.questionId === this.selectedQuestionId);
    if (found) {
      const i = this.questionAnswers.findIndex((data) => data.questionId === this.selectedQuestionId);
      this.questionAnswers[i].comments = comment;
    }

    let questionList = this.category[this.state.activeSections[0]].questions
    const qsnfound = questionList.some(data => data.questionId === this.selectedQuestionId);
    if (qsnfound) {
      const i = questionList.findIndex((data) => data.questionId === this.selectedQuestionId);
      questionList[i].comments = comment;
      this.category[this.state.activeSections[0]].questions = questionList;
    }
  }
  this.setState({ visibleModal: null })
}

//-----**** Button action for satisfactory answer//-----****
changeSatisfactoryStatus(index) {
  this.updateAnswers(index, AppConstants.YES)
}

//-----**** Button action for non satisfactory answer//-----****
changeNotSatisfactoryStatus(index) {
  this.updateAnswers(index, AppConstants.NO)
}

//-----**** Updating UI and array according to selected answer//-----****
updateAnswers(index, type) {
  let questionList = this.category[this.state.activeSections[0]].questions

  const selectedAnswer = type === AppConstants.YES ? AppConstants.SATISFACTORY : AppConstants.NOT_SATISFACTORY;
  questionList[index].selectedAnswer = selectedAnswer;
  this.category[this.state.activeSections[0]].questions = questionList;

  if ((type === AppConstants.YES && questionList[index].tooltipRequiredAT1 === AppConstants.TOOL_TIP_REQUIRED) || (type === AppConstants.NO && questionList[index].tooltipRequiredAT2 === AppConstants.TOOL_TIP_REQUIRED)) {
    const tooltip = type === AppConstants.YES ? questionList[index].tooltipAT1 : questionList[index].tooltipAT2;
    Alert.alert(
      textLabel.messages.tooltip, tooltip,
      [
        {
          text: AppConstants.ALERT_OK_BUTTON_TITLE,
        },
      ],
      { cancelable: AppConstants.DEFAULT_ALERT_CANCELABLE },
    );
  }

  const questionId = questionList[index].questionId
  const answerType = type === AppConstants.YES ? questionList[index].answerType1 : questionList[index].answerType2;
  const answer = { questionId: questionId, answer: answerType, comments: '' }
  const found = this.questionAnswers.some(data => data.questionId === questionId);
  if (!found) {
    this.questionAnswers.push(answer);
  } else {
    const i = this.questionAnswers.findIndex((data) => data.questionId === questionId);
    this.questionAnswers[i] = answer;
  }
  this.setState({
    refreshAccordianButton: true
  })
}

handleConductedBy = (name) => {
  name = Util.alphaNumericWithSpacesAndDecimal(name)
  this.setState({
    conductedBy: name
  })
}


render() {
  this.logger.getLogger().info("render called: ");
  // if (this.props.inspectionQuestions.agreementNumber && Util.isEmpty(this.agreementNumber)) {
  //   if (this.props.inspectionQuestions.agreementNumber.responseCode === AppConstants.STRINGSUCCESSRETCODE) {
  //     this.agreementNumber = this.props.inspectionQuestions.agreementNumber.rentalNumber;
  //   } else if (this.shownSomethingWentWrong && this.props.inspectionQuestions.agreementNumber.responseCode !== AppConstants.STRINGSUCCESSRETCODE) {
  //     this.shownSomethingWentWrong = false;
  //     alert(this.props.inspectionQuestions.agreementNumber.message);
  //   }
  // } else if (this.shownSomethingWentWrong && this.props.inspectionQuestions.isSystemErrorInGetAgreementNo) {
  //   this.shownSomethingWentWrong = false;
  //   alert(textLabel.messages.errorWentWrong);
  // }

  return (
    <View style={common.mainParentView}>

      <HeaderComponent columnStatus={AppConstants.HEADER_DEFAULT_COLUMN_STATUS} labelName={[textLabel.messages.inspectionTitle, this.agreementNumber]} />

      <KeyboardAvoidingView style={[common.keybordAvoidingView, styles.keyboardAvoidingView]} behavior={AppConstants.KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR} enabled>

        <ScrollView keyboardShouldPersistTaps={AppConstants.SCROLL_VIEW_KEYBOARD_DEFAULT_TAP_BEHAVIOUR} keyboardDismissMode={AppConstants.KEYBOARD_DEFAULT_DISMISS_MODE}>

          <View style={[common.textInputMainView, styles.textInputMainView]}>

            <Text style={[common.labelView, styles.labelView]}>
              {textLabel.messages.conductedByLabel}
            </Text>

            <TextInput
              autoCorrect={false}
              style={[common.textInputView, styles.textInputView, { height: Util.getDynamicHeight(AppConstants.DEFAULT_TEXTINPUT_MIN_LENGTH, this.state.height) }]}
              placeholder={textLabel.messages.requiredPlaceholder}
              maxLength={AppConstants.DEFAULT_TEXTINPUT_MAX_LENGTH}
              multiline={true}
              onChangeText={this.handleConductedBy}
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              } }
              value={this.state.conductedBy}
              />

          </View>


          <View style={common.viewSeparator} />

          <View style={[common.textInputMainView, styles.textInputMainView]}>

            <Text style={[common.labelView, styles.labelView]}>
              {textLabel.messages.inspectDateLabel}
            </Text>

            <TextInput
              autoCorrect={false}
              style={[common.textInputView, styles.textInputView]}
              editable={false}
              onChangeText={(date) => this.setState({ date }) }
              value={this.state.date}
              />

          </View>

          <View style={common.viewSeparator} />

          {
            this.isReturnFlow ? <View>

              <View style={[common.textInputMainView, styles.textInputMainView]}>

                <Text style={[common.labelView, styles.labelView]}>
                  {textLabel.messages.anyTrailerDamages}
                </Text>

                <View style={[common.horizontalRowContentView, styles.radioButtonParentView, styles.dateTextInputView]}>
                  <TouchableOpacity onPress={() => { this.setState({ trailerDamages: true }) } } style={[common.textInputMainView, styles.textInputView, styles.radioButtonView]}>
                    <Image style={common.cameraImageView} source={this.state.trailerDamages ? screenImages.images.radioButtonSelected1 : screenImages.images.radioButtonUnselected1} />
                    <Text style={[common.radioButtonView, styles.radioButtonText]}>
                      {textLabel.messages.yes}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { this.setState({ trailerDamages: false }) } } style={[common.textInputMainView, styles.textInputView, styles.radioButtonView, styles.damagesRadioButtonSpaceBetween]}>
                    <Image style={common.cameraImageView} source={this.state.trailerDamages ? screenImages.images.radioButtonUnselected1 : screenImages.images.radioButtonSelected1} />
                    <Text style={[common.radioButtonView, styles.radioButtonText]}>
                      {textLabel.messages.no}
                    </Text>
                  </TouchableOpacity>
                </View>


              </View>

              <View style={common.viewSeparator} />
            </View> : <View></View>
          }


          <View style={styles.separationView}>

            {this.progressIndicatorRenderItem() }

            <Accordion
              sections={this.category}
              activeSections={this.state.activeSections}
              renderSectionTitle={this.renderSectionTitle}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              onChange={this.updateSections}
              />

          </View>

          <Modal isVisible={this.state.visibleModal === AppConstants.DEFAULT_MODAL_VISIBLE}>
            {this.renderModalContent() }
          </Modal>


        </ScrollView>
      </KeyboardAvoidingView>

      <BottomNavigationComponent leftSwipe={this.onLeftSwipe} rightSwipe={this.onRightSwipe} bothSideSwipable={true} />

    </View>
  )

}

  }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInspectionQuestions(reqParams, headerParams) {

      params1 = commonRequestParams(actionConstants.REQUEST_INSPECTION_QUESTIONS, reqParams);

      let params = {
        'parameters': params1,
        'headers': headerParams
      };

      dispatch({ type: actionConstants.REQUEST_INSPECTION_QUESTIONS, params });
    },
    updateInspectionQuestions(reqParams, header) {
      let params = commonRequestParams(actionConstants.UPDATE_INSPECTION_QUESTIONS, reqParams);
      params = {
        'parameters': params,
        'headers': header
      };
      dispatch({ type: actionConstants.UPDATE_INSPECTION_QUESTIONS, params });
    },

    getRentalAgreementNumber(reqParams, header) {
      params1 = commonRequestParams(actionConstants.REQUEST_RENTAL_AGREEMENT_NUMBER, reqParams);
      params = {
        'parameters': params1,
        'headers': header
      }
      dispatch({ type: actionConstants.REQUEST_RENTAL_AGREEMENT_NUMBER, params })
    },

    addAppDetails(parameters) {
      let params = commonRequestParams(actionConstants.REQUEST_APP_DETAILS, parameters);
      dispatch({ type: actionConstants.REQUEST_APP_DETAILS, params });
    }
  }
}

function mapStateToProps(state) {
  return {
    loginUser: state.LoginScreenReducer,
    headerParams: state.HeaderParamsReducer,
    inspectionQuestions: state.InspectionReducer,
    updatedInspectionQuestions: state.UpdateInspectionReducer
  }
}

export default Inspection = connect(mapStateToProps, mapDispatchToProps)(Inspection)
