import { JsLoggerService } from "./jsLoggerService";
import { encrypt, decrypt } from "react-native-simple-encryption";

export class DataSecurityService {

    constructor() {
        this.logger = new JsLoggerService();
    }

    /**
     * Encrypt data with
     * @param {*} key
     * @param {*} value
     */
    encryptData(key, value) {
        this.logger.getLogger().info("entering: encryptData");
        let encryptedData = encrypt(key, value);
        this.logger.getLogger().info("exiting: encryptData");
        return encryptedData;
    }

    /**
     * Decrypt data with
     * @param {*} key
     * @param {*} value
     */

    decryptData(key, value) {
        this.logger.getLogger().info("entering: decryptData");
        let decryptedData = decrypt(key, value);
        this.logger.getLogger().info("exiting: decryptData");
        return decryptedData;
    }
}

