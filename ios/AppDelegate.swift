//
//  AppDelegate.swift
//  RNStarter
//
//  Created by jiggag on 2021/07/17.
//

import Foundation

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var bridge: RCTBridge!

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    #if FB_SONARKIT_ENABLED
      InitializeFlipper(application);
    #endif

    let jsCodeLocation: URL
    #if DEBUG
      jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil)
    #else
      jsCodeLocation = CodePush.bundleURL()
    #endif

    Bugsnag.start()
    AppCenterReactNative.register()
    AppCenterReactNativeAnalytics.register(withInitiallyEnabled: true)
    AppCenterReactNativeCrashes.registerWithAutomaticProcessing()

    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "RNStarter", initialProperties: nil, launchOptions: launchOptions)

    if #available(iOS 13.0, *) {
      rootView.backgroundColor = UIColor.systemBackground
    } else {
      rootView.backgroundColor = UIColor.white
    }

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    return true
  }
}
