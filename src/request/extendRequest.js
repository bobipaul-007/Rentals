
import { actionConstants } from "../actions/ActionConstants";

export function extendRequestParams(serviceName, params) {
    let parameters = {};
    switch (serviceName) {


        case actionConstants.REQUEST_EXTEND_ITEM_RENTAL:
            return Object.assign({}, parameters, {
                "itemStoreId": String(params[0]),
                "teamMemberId": String(params[1]),
                "teamMemberName": String(params[2]),
                "extentedDuration": String(params[3]),
                "expectedReturnDate": String(params[4]),
                "rentalExtensionComments": "",
                "requestedRentalAggrementOptions": [],
            });
    }
}



