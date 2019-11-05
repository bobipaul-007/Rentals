
import { combineReducers } from "redux";
import LoginScreenReducer from "./common/LoginScreenReducer";
import LogoutReducer from "./common/LogoutReducer";
import UpdateCustomerReducer from "./rental/UpdateCustomerReducer";
import ItemStatusReducer from "./common/ItemStatusReducer";
import HeaderParamsReducer from "./common/HeaderParamsReducer";
import NewCustomerReducer from "./rental/NewCustomerReducer";
import MainMenuReducer from "./common/MainMenuReducer";
import CustomerDLInfoReducer from "./rental/CustomerDLInfoReducer";
import SearchCustomerReducer from "./rental/SearchCustomerReducer";
import UpdateRentalDetailReducer from "./rental/UpdateRentalDetailReducer";
import TrailerTypeReducer from "./rental/TrailerTypeReducer";
import FillingRentalInfoReducer from "./rental/FillingRentalInfoReducer";
import BlockRentalItemReducer from "./rental/BlockRentalItemReducer";
import retriveRentalImageReducer from "./common/retriveRentalImageReducer";
import UploadImagesReducer from "./common/UploadImagesReducer";
import InspectionReducer from "./common/InspectionReducer";
import PreRentalAgreementReducer from './rental/PreRentalAgreementReducer';
import UpdateInspectionReducer from "./common/UpdateInspectionReducer";
import TermsAndConditionsReducer from './rental/TermsAndConditionsReducer';
import ExtendItemRentalReducer from './extend/ExtendItemRentalReducer';
import RetrieveStoreInfoReducer from './common/RetrieveStoreInfoReducer';
import CustomerInfoReducer from './rental/CustomerInfoReducer';
import UpdateReturnDetailReducer from './return/UpdateReturnDetailReducer'
import CancelRentReturnReducer from './common/CancelRentReturnReducer'

const rootReducer = combineReducers({
    LoginScreenReducer,
    LogoutReducer,
    HeaderParamsReducer,
    ItemStatusReducer,
    UpdateCustomerReducer,
    NewCustomerReducer,
    MainMenuReducer,
    CustomerDLInfoReducer,
    SearchCustomerReducer,
    UpdateRentalDetailReducer,
    TrailerTypeReducer,
    FillingRentalInfoReducer,
    BlockRentalItemReducer,
    retriveRentalImageReducer,
    UploadImagesReducer,
    InspectionReducer,
    PreRentalAgreementReducer,
    UpdateInspectionReducer,
    TermsAndConditionsReducer,
    ExtendItemRentalReducer,
    RetrieveStoreInfoReducer,
    CustomerInfoReducer,
    UpdateReturnDetailReducer,
    CancelRentReturnReducer
});

export default rootReducer;