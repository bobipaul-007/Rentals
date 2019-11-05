import { JL } from 'jsnlog';

export class JsLoggerService {
    constructor() {
        this.loggerInstance = "";
        this.ROOT_MODULE = "";
        this.moduleName = "";
    }

    enhance(message) {
        return message;
    }

    trace(msg) {
        this.loggerInstance.trace(this.enhance(msg));
    }

    debug(msg) {
        this.loggerInstance.debug(this.enhance(msg));
    }

    info(msg) {
        this.loggerInstance.info(this.enhance(msg));
    }

    warn(msg) {
        this.loggerInstance.warn(this.enhance(msg));
    }

    error(msg) {
        this.loggerInstance.error(this.enhance(msg));
    }

    fatal(msg) {
        this.loggerInstance.fatal(this.enhance(msg));
    }

    setModule(moduleName) {
        this.moduleName = moduleName;
    }

    getLogger(moduleName) {
        if (moduleName == null || moduleName == undefined || moduleName == "") {
            this.setModule(this.ROOT_MODULE);
            this.loggerInstance = JL();
        }
        else {
            this.setModule(moduleName);
            this.loggerInstance = JL(moduleName);
        }
        return this;
    }

    /*
    Initialize log creation
    */

    initLogger(config) {
        let globalConfig = config['GlobalConfig'];
        let requestId = globalConfig['requestId'];
        let defaultAjaxUrl = globalConfig['defaultAjaxUrl'];
        JL.setOptions({
            requestId: requestId,
            defaultAjaxUrl: defaultAjaxUrl
        });

        let appenders = {};
        let options = {};
        let appenderConfig = config['AppenderConfig'];
        let appenderType;

        for (let appenderConfigKey in appenderConfig) {
            console.log("A: I am inside the for");
            options = appenderConfig[appenderConfigKey];
            appenderType = options.appenderType;
            if (appenderType === 'ajax') {
                console.log("A: AppenderType is ajax");
                let level = options['level'];
                if (level) {
                    level = Number(level);
                }
                let batchSize = options['batchSize'];
                if (batchSize) {
                    batchSize = Number(batchSize);
                }
                appenders[appenderConfigKey] = JL.createAjaxAppender('ajax').setOptions({
                    level: level,
                    batchSize: batchSize
                });
            }
            else if (appenderType === 'console') {
                console.log("A: appenderType is console");
                let level = options['level'];
                if (level) {
                    level = Number(level);
                }
                appenders[appenderConfigKey] = JL.createConsoleAppender('console').setOptions({
                    level: level
                });
            }
        }

        for (let logConfigKey in config.LoggerConfig) {
            let logConfigEntry = config.LoggerConfig[logConfigKey];
            let options = logConfigEntry['options'];
            let level;
            if (options) {
                level = options['level'];
                if (level) {
                    level = Number(level);
                }
            }

            let appenderList = [];
            let appenderNames = (logConfigEntry.appenders == null ||
                logConfigEntry.appenders === undefined)
                ? []
                : logConfigEntry.appenders.split("|");

            for (let i = 0; i < appenderNames.length; i++) {
                let appender = appenders[appenderNames[i]];
                if (appender !== null &&
                    appender !== undefined) {
                    appenderList.push(appender);
                }

            }

            if (logConfigKey === "root") {
                JL().setOptions({
                    appenders: appenderList,
                    level: level
                });
            }
            else {
                JL(logConfigKey).setOptions({
                    appenders: appenderList,
                    level: level
                });
            }
        }


    }


}


