import Foundation

@objc(RNConfig)
@objcMembers final class RNConfig: NSObject {
  @objc(getAppVersion:reject:)
  func getAppVersion(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] ?? "0.0.1"
    resolve(appVersion)
  }

  @objc(getDeviceId:reject:)
  func getDeviceId(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let deviceId = UIDevice.current.identifierForVendor!.uuidString
    resolve(deviceId)
  }

  @objc(exitApp:reject:)
  func exitApp(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    exit(0)
  }
}
