import { actionConstants } from "../../actions/ActionConstants";
import { Util } from '../../utils/utils';
 let val = "";
  

export default function LoginScreenReducer(
    state = {
        userLoginData: "",
        userLoginRecieved: false,
        isSystemError: false,

        isloginState: false,
        retcodeVal: "",
    },
    action
) {
    switch (action.type) {
        case actionConstants.RECIEVED_LOGIN_USER:
        console.log("LoginReducer",action.login_details.response['operator-id']);
            return Object.assign({}, state, {

                userLoginData: action.login_details,
                userLoginRecieved: true,
                isSystemError: false,
                isloginState: true,
                retcodeVal: action.login_details.response.retcode,
            });
        case actionConstants.SYSTEM_ERROR:
            return Object.assign({}, state, {
                isSystemError: true
            });
       
        case actionConstants.RECIEVED_LOGOUT_USER:
            return Object.assign({}, state, {
                userLoginData: "",
                userLoginRecieved: false,
                isSystemError: false,
                isloginState: false,
                retcodeVal: "",
            });

        default:
            return state;
    }
}