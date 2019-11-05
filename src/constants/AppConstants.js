export const AppConstants = {
    HTTP_Methods: {
        API_GET: "GET",
        API_POST: "POST",
        API_PUT: "PUT",
        API_DELETE: "DELETE"
    },
    ErrorDetails: {
        ERR_DETAIL_LENGTH: 3
    },
    APP_JSON_UTF8: "application/json;charset=UTF-8",
    APP_JSON: "application/json",
    JSON_RESPONSE_TYPE: "json",
    ASTERISK: "*",

    DEMO_DB: "demoDB",
    REALM_DB_NOT_FOUND: "REALM_DB_NOT_FOUND",
    SUCCESSRETCODE: 0,

    STRINGSUCCESSRETCODE: "0",

    RESPONSECODE: "0",
    ArrayEmptyCheck: 0,

    UNSUCCESSRETCODE: 1101,
    LENGTH: 6,
    KEYBOARDVERTICALOFFSET: 65,
    EMAILDOMAIN: [{ 'title': '@gmail' }, { 'title': '@yahoo' }, { 'title': '@hotmail' }, { 'title': '@aol' }],
    DONE: "Done",
    BASE64_IMAGE_URI_PATH: 'data:image/jpeg;base64,',
    SCREEN_NAMES: {
        RENTAL: {
            CUSTOMER_DL_INFO: "CustomerDLInfo",
            CUSTOMER_INFO: "CustomerInfo",
            CUSTOMER_LIST: "CustomerList",
            CUSTOMER_LOOKUP: "CustomerLookup",
            FILLING_RENTAL_INFO: "FillingRentalInfo",
            PRE_RENTAL_AGREEMENT: "PreRentalAgreement",
            TRAILER_TYPE: "TrailerType",
            TERMS_AND_CONDITIONS: "TermsAndConditions",

        },
        RETURN: {
            RETURN_TRAILER_CONDITION: "ReturnTrailerCondition"
        },
        EXTEND: {
            EXTEND_RENTAL: "ExtendRental",
        },
        COMMON_VIEWS: {
            THUMBNAIL_VIEW: "ThumbnailView",
            LOADINGSPLASH: "LoadingSplashScreen",
            INSPECTION: "Inspection",
            MAIN_MENU: "MainMenu",
            LOGIN_SCREEN: "LoginScreen",
            CURRENT_RENTAL: "CurrentRental",
            CUSTOMER_SIGNATURE: "CustomerSignature",
            DIGITAL_SIGNATURE: "DigitalSignature",
        }

    },

    BASE_URLS: {
        BASE_URL1: "storeBaseUrl",
        BASE_URL2: "centerBaseURL",
        BASE_URL3: "getStoreInfoBaseURL"

    },

    PRE_RENTAL_IMAGES_MAX: 7,
    CUST_DL_MAX_INPUT: 20,
    CUST_DL_MAX_LENGTH_INPUT: 100,
    PRE_RENTAL_COMMENTS_MAX_LENGTH: 200,
    RETURN_KEY_NEXT: "next",
    PRE_RENTAL_AGREEMENT_ACKNOWLEDGEMENT_LINES: 2,
    KEYBOARD_AVOIDING_VIEW_DEFAULT_BEHAVIOUR: "padding",
    HEADER_DEFAULT_COLUMN_STATUS: "true",
    SCROLL_VIEW_KEYBOARD_DEFAULT_TAP_BEHAVIOUR: 'handled',
    KEYBOARD_DEFAULT_DISMISS_MODE: 'on-drag',

    //Might need to be moved
    DEFAULT_RENTAL_TYPE_RENTAL: "rental",
    DENY_INSURANCE_IMAGE: "N",

    DEFAULT_RETUTN_TYPE: 'return',
    ALERT_YES_BUTTON_TITLE: 'Yes',
    ALERT_NO_BUTTON_TITLE: 'No',
    ALERT_OK_BUTTON_TITLE: 'OK',


    SATISFACTORY: 'satisfactory',
    NOT_SATISFACTORY: 'notSatisfactory',
    COMMENT_REQUIRED: 'Y',
    TOOL_TIP_REQUIRED: 'Y',

    YES: 'yes',
    NO: 'no',
    DL_DRIVER_AGE: 21,
    RETURN_KEY_TYPE: 'done',
    CUST_DL_IMAGES_MAX: 1,

    DEFAULT_DATE_FORMAT: "MM/DD/YYYY hh:mm A",

    RENTAL_FLOW: "rentalFlow",
    RETURN_FLOW: "returnFlow",
    EXTEND_FLOW: "extendFlow",

    DEFAULT_INSPECTION_CATEGORY_LENGTH: 0,
    DEFAULT_ALERT_CANCELABLE: false,
    DEFAULT_TEXTINPUT_MAX_LENGTH: 75,
    DEFAULT_TEXTINPUT_MIN_LENGTH: 25,

    DEFAULT_MODAL_VISIBLE: 1,

    DEFAULT_RENTAL_TYPE: "RENTAL",
    DEFAULT_CHANNEL_TYPE_MOBILE: "M",
    DEFAULT_CHANNEL_TYPE_TABLET: "T",

    DEFAULT_RENTAL_PICTURES_STATUS: "Y",
    DEFAULT_TRAILER_DAMAGES_YES: "Y",
    DEFAULT_TRAILER_DAMAGES_NO: "N",
    DEFAULT_DISCLOSURE_AGREED_STATUS: "Y",
    DEFAULT_TRAILER_DAMAGES_TRUE: "true",

    DEFAULT_RENTAL_FLOW_ACTION: "rent",
    DEFAULT_CANCEL_ACTION: "cancel",
    DEFAULT_EXTEND_SESSION_ACTION: "extend-session",

    DEFAULT_ITEM_NUMBER: "101",

    DEFAULT_RETURN_QUESTIONS_STATUS: "Y",
    DEFAULT_RETURN_PICTURES_STATUS: "Y",

    DEFAULT_RETURN_TYPE: "RETURN"

};
