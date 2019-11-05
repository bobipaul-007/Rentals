
import { actionConstants } from "../actions/ActionConstants";

export function commonRequestParams(serviceName, params) {
    let parameters = {};
    switch (serviceName) {


        case actionConstants.REQUEST_IP:
            return Object.assign({}, parameters, {
                "ipAddress": params[0]
            });

        case actionConstants.REQUEST_ITEM_STATUS:
            return Object.assign({}, parameters, {
                "storeId": String(params[0]),
                "itemStatus": params[1],
                "itemNumber": params[2]
            });

        case actionConstants.REQUEST_LOGOUT_USER:
            return Object.assign({}, parameters, {
                "userId": String(params[0])
            });

        case actionConstants.REQUEST_CANCEL_RENT_RETURN:
            return Object.assign({}, parameters, {
                "itemStoreId": params[0]
            });

        case actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES:
            return Object.assign({}, parameters, {
                "rentalType": params[0],
                "insuranceImage": params[1]
            });

        // case actionConstants.REQUEST_UPLOAD_IMAGES:
        //     return Object.assign({}, parameters, {
        //         "rentalType": params[0],
        //         "insuranceImage": params[1],
        //         "imageFiles": params[2],
        //     });
        case actionConstants.REQUEST_INSPECTION_QUESTIONS:
            return Object.assign({}, parameters, {
                "rentalType": params[0],
            });


        case actionConstants.REQUEST_RETRIEVE_STORE_INFO:
            return Object.assign({}, parameters, {
                "ipAddress": String(params[0]),
            });

        case actionConstants.UPDATE_INSPECTION_QUESTIONS:
            return Object.assign({}, parameters, {
                "rentalType": String(params[0]),
                "questions": params[1],
            });

        case actionConstants.REQUEST_RENTAL_AGREEMENT_NUMBER:
            return Object.assign({}, parameters, {
                "storeId": String(params[0]),
                "itemStoreId": String(params[1])
            });

        case actionConstants.REQUEST_CURRENT_RENTALS:
            return Object.assign({}, parameters, {
                "storeId": String(params[0]),
                "itemStatus": String(params[1]), //"[‘REN’,‘ISR’]",
                "itemNumber": String(params[2]),
                "orderBy": String(params[3]),
                "order": String(params[4]),
                "pageSize": String(params[5]),
                "pageFrom": String(params[6]),
                "pageTo": String(params[7]),
                "totalPageCount": String(params[8]),
            });

        case actionConstants.REQUEST_UPDATE_RETURN_DETAIL:
            return Object.assign({}, parameters, {
                "itemStoreId": String(params[0]),
                "teamMemberId": String(params[1]),
                "teamMemberName": String(params[2]),
                "returnQuestions": String(params[3]),
                "actualDateTime": String(params[4]),
                "returnPictures": String(params[5]),
                "returnComments": String(params[6]),
                "customerInitials": params[7],
                "teamMemberInitials": String(params[8]),
                "returnCustomerSignature": String(params[9]),
                "returnTeamMemberSignature": String(params[10]),
                "requestedReturnAggrementOptions": params[11],
                "emailId": String(params[12])
            });

        case actionConstants.REQUEST_LOGIN_USER:
            return Object.assign({}, parameters, {
                "userId": String(params[0])

            });

        case actionConstants.REQUEST_APP_DETAILS:
            return Object.assign({}, parameters, {
                "selectedItem": params[0]
            });

        case actionConstants.REQUEST_RETRIEVE_STORE_TIMING:
            return Object.assign({}, parameters, {
                "storeId": String(params[0]),
                "day": String(params[1]),
                "localTimeZone": String(params[2])
            });

        case actionConstants.REQUEST_HEADER_PARAMS:
            return Object.assign({}, parameters, {
                "deviceName": String(params[0]),
                "storeId": String(params[1]),
                "applicationVersion": String(params[2]),
                "userId": String(params[3]),
                "channelType": String(params[4]),
                "localTimeZone": String(params[5]),
                "storeName": String(params[6]),
                "storeType": String(params[7]),
                "ipAddress": String(params[8])
            });

        //    case actionConstants.UPDATE_STORE_ID:
        // return Object.assign({}, parameters, {
        //     "response": {
        //         'storeNo': "0525",//params[0],
        //         'storeName': "",
        //         'status': "True"
        //     }
        // });
    }
}



