import { AppConfig } from '../config/AppConfig';
import { ServiceConfig } from '../config/ServiceConfig';
import { ProviderService } from './providerService';
import { environment } from '../config/environment.js';
import { JsLoggerService } from './jsLoggerService';


export class StartUpService {
    constructor() {
        this.serviceConfig = new ServiceConfig()
        this.providerService = new ProviderService()
        this.logger = new JsLoggerService()
        this.appConfig = new AppConfig()
    }
    initialize() {
        this.logger.getLogger().info("entering:initialize: application:initializer");
        let app = this.appConfig.environmentConfiguration(environment.name);
        this.providerService.setAppConfig(app);
        
        if (this.serviceConfig.backendConfig.demoDb == true) {

            this.providerService.loadInitialData();

        }


        let logConfig = app['LogConfig']
        let promiseArray = [];

        promiseArray.push(new Promise((resolve, reject) => {
            this.logger.initLogger(logConfig);
            resolve(true);
        }));
        this.logger.getLogger().info("exiting: initialize");
        return Promise.all(promiseArray);
    }
}

