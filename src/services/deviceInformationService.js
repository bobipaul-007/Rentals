import DeviceInfo from 'react-native-device-info';
import { JsLoggerService } from "./jsLoggerService";
import { StorageAsync } from "./storageAsync";

export class DeviceInformationService {
    constructor() {
        this.storage = new StorageAsync();
        this.logger = new JsLoggerService();
    }

    getApplicationName() {
        this.logger.getLogger().info("entering: DeviceInformationService: getApplicationName");
        return DeviceInfo.getApplicationName();
    }
    getDeviceId() {
        this.logger.getLogger().info("entering: DeviceInformationService: getDeviceId");
        return DeviceInfo.getDeviceId();
    }

    getIpAddress() {
        this.logger.getLogger().info("entering: DeviceInformationService: getIpAddress");
        DeviceInfo.getIPAddress().then((ip) => {
            this.storage.storeItem("ipAddress", ip);
        });
    }
    getMacAddress() {
        this.logger.getLogger().info("entering: DeviceInformationService: getMacAddress");
        return DeviceInfo.getMACAddress();
    }
    getModel() {
        this.logger.getLogger().info("entering: DeviceInformationService: getModel");
        return DeviceInfo.getModel();
    }

    getVersion = () => DeviceInfo.getVersion()

    getBuildNumber = () => DeviceInfo.getBuildNumber()
  

    getSerialNumber() {
        this.logger.getLogger().info("entering: DeviceInformationService: getSerialNumber");
        return DeviceInfo.getSerialNumber();
    }

    getUniqueId() {
        this.logger.getLogger().info("entering: DeviceInformationService: getUniqueId");
        return DeviceInfo.getUniqueID();
    }
    getBundleId() {
        this.logger.getLogger().info("entering: DeviceInformationService: getBundleId");
        return DeviceInfo.getBundleId();
    }
    getDeviceDetails() {
        this.logger.getLogger().info("entering: DeviceInformationService: getDeviceDetails");
        let deviceDetails = {};
        try {
            deviceDetails = {
                'deviceId': this.getDeviceId(),
                'modelName': this.getModel(),
                'deviceName': this.getDeviceName(),
                'uniqueId': this.getUniqueId(),
            };
        } catch (error) {
            this.logger.getLogger().error("DeviceInformationService : getDeviceDetails with error message: " + error.message);
        }
        return deviceDetails;
    }

    getDeviceApplicationDetails() {
        this.logger.getLogger().info("entering: DeviceInformationService: getDeviceApplicationDetails");
        let deviceAppDetails = {};
        try {
            deviceAppDetails = {
                'appName': this.getApplicationName(),
                'bundleId': this.getBundleId(),
            };
        } catch (error) {
            this.logger.getLogger().error("DeviceInformationService: getDeviceApplicationDetails : with error message: " + error.message);
        }
        return deviceAppDetails;
    }
    getDeviceName() {
        this.logger.getLogger().info("entering: DeviceInformationService: getDeviceName");
        return DeviceInfo.getDeviceName();
    }

    isTablet() {
        this.logger.getLogger().info("entering: DeviceInformationService: isTablet");
        return DeviceInfo.isTablet();
    }
    getTimezone() {
        this.logger.getLogger().info("entering: DeviceInformationService: getTimezone");
        return DeviceInfo.getTimezone();
    }

}

