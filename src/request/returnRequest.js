
import { actionConstants } from "../actions/ActionConstants";

export function returnRequestParams(serviceName, params) {
    let parameters = {};
    switch (serviceName) {

        case actionConstants.REQUEST_RETURN_INSPECTION_DETAILS:
            return Object.assign({}, parameters, {
                "conductedBy": String(params[0]),
                "date": String(params[1]),
                "trailerDamages": String(params[2])
            });

        case actionConstants.REQUEST_UPLOAD_IMAGES:
            return Object.assign({}, parameters, {
                "rentalType": params[0],
                "insuranceImage": params[1],
                "imageFiles": params[2],
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

        case actionConstants.REQUEST_PRE_RETURN_INFO:
            return Object.assign({}, parameters, {
                "comments": params[0],
                "tMInitials": params[1],
                "custInitials": params[2]
            });
    }
}



