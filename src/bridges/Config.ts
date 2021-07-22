import { NativeModules } from 'react-native';

interface RNConfigBridge {
  /**
   * 앱 버전
   * @return string
   */
  getAppVersion(): Promise<string>;

  /**
   * 디바이스 아이디
   * @return string
   */
  getDeviceId(): Promise<string>;

  /**
   * 앱 종료
   * @return void
   */
  exitApp(): void;
}

const { getAppVersion, getDeviceId, exitApp } = NativeModules.RNConfig as RNConfigBridge;

export const ConfigBridge = {
  getAppVersion,
  getDeviceId,
  exitApp,
};
