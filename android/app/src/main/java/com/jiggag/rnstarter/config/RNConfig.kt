package com.jiggag.rnstarter.config

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.provider.Settings.Secure

class RNConfig(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "RNConfig"
  }

  @ReactMethod
  fun getAppVersion(promise: Promise) {
    promise.resolve(
      reactApplicationContext.packageManager.getPackageInfo(reactApplicationContext.packageName, 0).versionName
    )
  }

  @ReactMethod
  fun getDeviceId(promise: Promise) {
    val deviceId = Secure.getString(reactApplicationContext.contentResolver, Secure.ANDROID_ID)
    promise.resolve(deviceId)
  }

  @ReactMethod
  fun exitApp() {
    android.os.Process.killProcess(android.os.Process.myPid())
  }
}
