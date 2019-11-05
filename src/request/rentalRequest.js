
import { actionConstants } from "../actions/ActionConstants";

export function rentalRequestParams(serviceName, params) {
    let parameters = {};
    switch (serviceName) {
        // case actionConstants.REQUEST_LOGIN_USER:
        //     return Object.assign({}, parameters, {
        //         "userId": String(params[0])

        //     });

        // case actionConstants.REQUEST_IP:
        //     return Object.assign({}, parameters, {
        //         "ipAddress": params[0]
        //     });

        // case actionConstants.UPDATE_STORE_ID:
        //     return Object.assign({}, parameters, {
        //         "response": {
        //             'storeNo': "0525",//params[0],
        //             'storeName': "",
        //             'status': "True"
        //         }
        //     });

        case actionConstants.UPDATE_CUST_INFO:
            return Object.assign({}, parameters, {

                "firstName": String(params[0]),
                "lastName": String(params[1]),
                "address1": String(params[2]),
                "address2": String(params[3]),
                "city": String(params[4]),
                "state": String(params[5]),
                "zipcode": String(params[6]),
                "country": "US",
                "phoneNumber": String(params[7]),
                "emailId": String(params[8]),
                "ncEnrolled": String(params[9]),
                //"isEdit": String(params[9])


            });
        // case actionConstants.REQUEST_ITEM_STATUS:
        //     return Object.assign({}, parameters, {
        //         "storeId": String(params[0]),
        //         "itemStatus": params[1],
        //         "itemNumber": params[2]
        //     });

        case actionConstants.REQUEST_NEW_CUSTOMER:
            return Object.assign({}, parameters, {
                "firstName": String(params[0]),
                "lastName": String(params[1]),
                "address1": String(params[2]),
                "address2": String(params[3]),
                "city": String(params[4]),
                "state": String(params[5]),
                "zipcode": String(params[6]),
                "country": "US",
                "phoneNumber": String(params[7]),
                "emailId": String(params[8]),
                "dob": "2008-03-20",
                "ncEnrolled": "N",
                //"isEdit": "N"
            });

        // case actionConstants.REQUEST_LOGOUT_USER:
        //     return Object.assign({}, parameters, {
        //         "userId": String(params[0])
        //         //"userId": "1678"
        //     });

        case actionConstants.REQUEST_DL_CUSTOMER:
            return Object.assign({}, parameters, {
                "imageArray": params[0],
                "DriverLicenseNumber": String(params[1]),
                "DriverLicenseState": String(params[2]),
                "DriverLicenseExpiration": String(params[3]),
                "InsuranceCompanyName": String(params[4]),
                "insurancePolicyNumber": String(params[5]),
                "DOB": String(params[6]),

            });

        case actionConstants.REQUEST_SEARCH_CUSTOMER:
            return Object.assign({}, parameters, {
                "searchCriteria": params[0]
                //use obj & assign to search criteria
            });

        // case actionConstants.REQUEST_CANCEL_RENT_RETURN:
        //     return Object.assign({}, parameters, {
        //         "itemStoreId": params[0]
        //     });

        case actionConstants.REQUEST_UPDATE_RENTAL_DETAIL:
            return Object.assign({}, parameters, {
                "itemStoreId": String(params[0]),
                "rentalPictures": String(params[1]),
                "rentalComments": String(params[2]),
                "customerInitials": String(params[3]),
                "teamMemberInitials": String(params[4]),
                "disclosureAggreed": String(params[5]),
                "rentalCustomerSignature": String(params[6]),
                "requestedRentalAggrementOptions": params[7],
                "trailerDamage": String(params[8]),
                "expectedReturnDate": String(params[9]),
                "emailId": String(params[10])
            });

        case actionConstants.REQUEST_FILLING_RENTAL_INFO:
            return Object.assign({}, parameters, {
                "tmName": String(params[0]),
                "VIN": String(params[1]),
                "trailerLicense": String(params[2]),
                "dateTimeRented": String(params[3]),
                "rentDuration": String(params[4]),
                "returnDateTime": String(params[5]),
                "trailerDamages": String(params[6])
            });

        case actionConstants.REQUEST_TRAILER_TYPE_DETAIL:
            return Object.assign({}, parameters, {
                "itemId": ""
            });

        case actionConstants.REQUEST_BLOCK_RENTAL_ITEM:
            return Object.assign({}, parameters, {
                "itemId": String(params[0]),
                "driverLicenseNumber": String(params[1]),
                "driverLincenseState": String(params[2]),
                "driverLienceExpiration": String(params[3]),
                "dob": String(params[4]),
                "insuranceCompany": String(params[5]),
                "insurancePolicyNumber": String(params[6]),
                "teamMemberId": String(params[7]),
                "rentedDateTime": String(params[8]),
                "expectedReturnDate": String(params[9]),
                "teamMemberName": String(params[10]),
                "rentalQuestions": String(params[11]),
                "rentedDuration": String(params[12]),
                "trailerDamage": String(params[13])
            });

        // case actionConstants.REQUEST_RETRIVE_RENTAL_IMAGES:
        //     return Object.assign({}, parameters, {
        //         "rentalType": params[0],
        //         "insuranceImage": params[1]


        //     });


        // case actionConstants.REQUEST_UPLOAD_IMAGES:
        //     return Object.assign({}, parameters, {

        //         "rentalType": params[0],
        //         "insuranceImage": params[1],
        //         "imageFiles": params[2],
        //     });

        // case actionConstants.REQUEST_CURRENT_RENTALS:
        //     return Object.assign({}, parameters, {
        //         "storeId": String(params[0]),
        //         "itemStatus": String(params[1]), //"[‘REN’,‘ISR’]",
        //         "itemNumber": String(params[2]),
        //         "orderBy": String(params[3]),
        //         "order": String(params[4]),
        //         "pageSize": String(params[5]),
        //         "pageFrom": String(params[6]),
        //         "pageTo": String(params[7]),
        //         "totalPageCount": String(params[8]),
        //     });

        // case actionConstants.UPDATE_INSPECTION_QUESTIONS:
        //     return Object.assign({}, parameters, {
        //         "rentalType": String(params[0]),
        //         "questions": params[1],
        //     });

        case actionConstants.REQUEST_PRE_RENTAL_INFO:
            return Object.assign({}, parameters, {
                "images": params[0],
                "comments": params[1],
                "tMInitials": params[2],
                "custInitials": params[3]
            });

        // case actionConstants.REQUEST_RETURN_INSPECTION_DETAILS:
        //     return Object.assign({}, parameters, {
        //         "conductedBy": String(params[0]),
        //         "date": String(params[1]),
        //         "trailerDamages": String(params[2])
        //     });

        case actionConstants.SAVE_PRE_RENTAL_INFO_IMAGES:
            return Object.assign({}, parameters, {
                "rentalType": params[0],
                "insuranceImage": params[1],
                "imageFiles": params[2],
            });

        case actionConstants.SAVE_CUST_INSURANCE_IMAGES:
            return Object.assign({}, parameters, {
                "rentalType": params[0],
                "insuranceImage": params[1],
                "imageFiles": params[2],
            });


        // case actionConstants.REQUEST_RENTAL_AGREEMENT_NUMBER:
        //     return Object.assign({}, parameters, {
        //         "storeId": String(params[0]),
        //         "itemStoreId": String(params[1])
        //     });

        // case actionConstants.REQUEST_EXTEND_ITEM_RENTAL:
        //     return Object.assign({}, parameters, {
        //         "itemStoreId": String(params[0]),
        //         "teamMemberId": String(params[1]),
        //         "teamMemberName": String(params[2]),
        //         "extentedDuration": String(params[3]),
        //         "expectedReturnDate": String(params[4]),
        //         "rentalExtensionComments": "",
        //         "requestedRentalAggrementOptions": [],
        //     });

        // case actionConstants.REQUEST_RETRIEVE_STORE_INFO:
        //     return Object.assign({}, parameters, {
        //         "ipAddress": String(params[0]),
        //     });

        // case actionConstants.REQUEST_INSPECTION_QUESTIONS:
        //     return Object.assign({}, parameters, {
        //         "rentalType": params[0],
        //     });

        // case actionConstants.REQUEST_HEADER_PARAMS:
        //     return Object.assign({}, parameters, {
        //         "deviceName": String(params[0]),
        //         "storeId": String(params[1]),
        //         "applicationVersion": String(params[2]),
        //         "userId": String(params[3]),
        //         "channelType": String(params[4]),
        //         "localTimeZone": String(params[5]),
        //         "storeName": String(params[6]),
        //         "storeType": String(params[7]),
        //         "ipAddress": String(params[8])
        //     });

        // case actionConstants.REQUEST_RETRIEVE_STORE_TIMING:
        //     return Object.assign({}, parameters, {
        //         "storeId": String(params[0]),
        //         "day": String(params[1]),
        //         "localTimeZone": String(params[2])
        //     });

        // case actionConstants.REQUEST_APP_DETAILS:
        //     return Object.assign({}, parameters, {
        //         "selectedItem": params[0]
        //     });

        case actionConstants.REQUEST_CUSTOMER_INFO:
            return Object.assign({}, parameters, {
                "emailId": String(params[0]),
                "firstName": String(params[1]),
                "lastName": String(params[2]),
                "address1": String(params[3]),
                "address2": String(params[4]),
                "zipCode": String(params[5]),
                "city": String(params[6]),
                "state": String(params[7]),
                "phoneNumber": String(params[8])
            });

        // case actionConstants.REQUEST_PRE_RETURN_INFO:
        //     return Object.assign({}, parameters, {
        //         "comments": params[0],
        //         "tMInitials": params[1],
        //         "custInitials": params[2]
        //     });
    }
}



