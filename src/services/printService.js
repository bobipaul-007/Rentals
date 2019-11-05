import { environment } from '../config/environment'
import RNPrint from 'react-native-print'
import { AppConstants } from '../constants/AppConstants.js';

export class PrintService {
    constructor() {
   
    }

    createPdfUrl(urlVariable)
    {
        let urlPath = "";
        urlPath = environment.centerBaseURL + '/item/{rentalNumber}/agreement/{type}'
        let numberOfVariables = Number(String(urlPath).split("{").length) - 1;
        for (let i = 0; i < numberOfVariables; i++) {
            urlPath =this.insertVariableInURL(urlPath, urlVariable);
        }
        return urlPath;
    }

    insertVariableInURL(url, variableName) {
        let urlVal = String(url).substring(String(url).indexOf("{") + 1);
        urlVal = urlVal.substring(0, urlVal.indexOf("}") + 1);
        url = url.replace("{" + urlVal, variableName[urlVal.substring(0, urlVal.length - 1)]);
        return url;
    }


    remotePrint = async (pdfUrl) => {
        const selectedPrinter = await RNPrint.selectPrinter({ x: 10, y: 10 })
        if (selectedPrinter) {
          await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
        // await RNPrint.print({ filePath: 'http://t1ratmm501.ssc.tsc:8080/TMM-Rentals/RentalJsonService/item/051508132019101/agreement/RENTAL' })
        }
        
      }

}