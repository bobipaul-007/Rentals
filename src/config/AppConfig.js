export class AppConfig {
    COMMON = {

        EventStreamConfig: {
            eventStreamEnabled: true
        },

        HeartBeatConfig:{
            idleTimeoutInterval: 900000,
            _idleTimeoutInterval: 20000,
            isHeartBeatApplicable: true,
            heartBeatInterval: 30000,
            countDownTimer: 60
        },
        LogConfig: {
            GlobalConfig: {
                "requestId": "",
                "defaultAjaxUrl": "ajaxUrl"
            },
            LoggerConfig: {
                "root": {
                    "appenders": "ajaxAppender|consoleAppender",
                    "options": {
                        "level": 1000
                    }
                }
            },
            AppenderConfig: {
                "ajaxAppender": {
                    "appenderType": "ajax",
                    "level": 1000,
                    "batchSize": 4
                },
                "consoleAppender": {
                    "appenderType": "console",
                    "level": 1000
                },
            }
        },
        MapsConfig:{},
        ServerConfig: {},
        ThreatMetrixConfig: {
            "enable": false,
            "url" : ""
        },

        loginConfig: {
            "url" : ""
        },

        logoutConfig: {
            "url" : ""
        },

        contentSecurityPolicy:{
            "default-src": "none",
            "script-src" : "",
            "font-src" : "",
            "connect-src" : "",
            "img-src": "../../assets/images/deviceLocator", 
            "style-src": "",
            "media-src" :""
        },
        i18n:{
            deafultLocale: "en",
            supportedLocales: []
        },
        serverPrefixType: 'API-URL'
    }


    ENVIRONMENTS = {
        serverPrefixType: 'API-URL'
    };

    DEVELOPMENT = {
        serverURLs: {
            'API-URL': "/"
        }
    };

    QA = {
        serverURLs: {
            'API-URL': "/"
        }
    };

    PRODUCTION = {
        serverURLs: {
            'API-URL': "/"
        }
    };

    environmentConfiguration(presentEnvironment) {
        let presentConfiguration = {};
        switch (presentEnvironment.toUpperCase()) {
            case ("QA"):
                presentConfiguration = Object.assign(this.ENVIRONMENTS, this.QAENV);
                break;
            case ("PROD"):
                presentConfiguration = Object.assign(this.ENVIRONMENTS, this.PRODUCTION);
                break;
            default:
                presentConfiguration = Object.assign(this.ENVIRONMENTS, this.DEVELOPMENT);
        }
        return presentConfiguration;
    }
}   