
import React
import UIKit

public class MainViewController: UIViewController {
  public init() {
    super.init(nibName: nil, bundle: nil)
  }

  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override public func viewDidLoad() {
    super.viewDidLoad()

    setupRootView()
  }
}

extension MainViewController: RCTBridgeDelegate {
  public func sourceURL(for bridge: RCTBridge!) -> URL! {
//    return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index")

      let host = Bundle.main.object(forInfoDictionaryKey: "METRO_HOST") as? String ?? "localhost"
      let provider = RCTBundleURLProvider.sharedSettings()!
      return RCTBundleURLProvider.jsBundleURL(
        forBundleRoot: "index",
        packagerHost: host,
        enableDev: provider.enableDev,
        enableMinification: provider.enableMinification
      )


  }
}

// MARK: - Setup RCTRootView

private extension MainViewController {
  /// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
  ///
  /// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
  /// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
  /// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
  func isConcurrentRootEnabled() -> Bool {
    // Switch this bool to turn on and off the concurrent root
    return true
  }

  func setupRootView() {
    let bridge = RCTBridge(delegate: self, launchOptions: [:])!
    let rootView = RCTAppSetupDefaultRootView(bridge, "RNStarter", ["concurrentRoot": true], true)!
    view.insertSubview(rootView, at: 0)

    rootView.translatesAutoresizingMaskIntoConstraints = false

    NSLayoutConstraint.activate([
      rootView.topAnchor.constraint(equalTo: view.topAnchor),
      rootView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
      rootView.leftAnchor.constraint(equalTo: view.leftAnchor),
      rootView.rightAnchor.constraint(equalTo: view.rightAnchor),
    ])
  }
}
