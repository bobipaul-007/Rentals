import { JsLoggerService } from "./jsLoggerService";
import { AsyncStorage } from 'react-native';

export class StorageAsync {

    constructor() {
        this.logger = new JsLoggerService();
    }

    /**
     * Store Item in Async Storage
     * @param {*} key
     * @param {*} value
     */
    async storeItem(key, value) {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            this.logger.getLogger().info("entering: storeItem");
            this.logger.getLogger().info("storeItem called with key: " + key + " and value: " + value);
            let jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(value));
            return jsonOfItem;
        } catch (error) {
            this.logger.getLogger().error("AsyncStorage : storeItem : " + error.message);
        }
    }

    /**
     * Retrieve item from Async Storage
     * @param {*} key
     */
     async retrieveItem(key) {
         let token = "";
         try {
            
             this.logger.getLogger().info("entering: retrieveItem");
             this.logger.getLogger().info("retrieveItem called with key: " + key);
             const retrievedItem = await AsyncStorage.getItem(key);
             const item = JSON.parse(retrievedItem);
             token = item;
            
             return Promise.resolve(token);
                
        
           // return  token;
        
         } catch (error) {
             this.logger.getLogger().error("AsyncStorage : retrieveItem : " + error.message);
         }
         return token;
     }

    /**
     * Delete item from Async Storage
     * @param {*} key
     */
    async deleteItem(key) {
        try {
            this.logger.getLogger().info("entering: deleteItem");
            this.logger.getLogger().info("deleteItem called with key: " + key);
            const deletedItem=  await AsyncStorage.removeItem(key);
        const item = JSON.parse(deletedItem);
        return item;
        } catch (error) {
            this.logger.getLogger().error("AsyncStorage : deleteItem : " + error.message);
        }
        return;
    }

    /**
    * Clear all item from Async Storage
    */
    async clearItem() {
        try {

            this.logger.getLogger().info("entering: clearItem");
            let clearedItem = await AsyncStorage.clear();
            return clearedItem ;


        } catch (error) {
            this.logger.getLogger().error("AsyncStorage : clearItem : " + error.message);
        }
        return;
    }

    /**
    * Merge item from Async Storage
    * @param {*} key
    * @param {*} value
    */
    async mergeItem(key, value) {
        try {
            this.logger.getLogger().info("entering: deleteItem");
            this.logger.getLogger().info("deleteItem called with key: " + key + " and value: " + value);
            let jsonOfitem = await AsyncStorage.mergeItem(key, JSON.stringify(value));
                     return jsonOfitem ;

        } catch (error) {
            this.logger.getLogger().error("AsyncStorage : clearItem : " + error.message);
        }
        return;
    }
}

//Changed for TR
