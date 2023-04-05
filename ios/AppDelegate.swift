import Foundation
import UIKit

// MARK: - AppDelegate

@UIApplicationMain
final class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow? = nil

  func isConcurrentRootEnabled() -> Bool {
    // Switch this bool to turn on and off the concurrent root
    return true
  }

  // MARK: - App Life Cycle
  func application(
    _ application: UIApplication,
    willFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    return true
  }
  
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    RCTAppSetupPrepareApp(application, false)

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = MainViewController()
    self.window?.makeKeyAndVisible()

    return true
  }
}
