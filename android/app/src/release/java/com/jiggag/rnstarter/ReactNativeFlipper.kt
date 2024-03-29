package com.jiggag.rnstarter

import android.content.Context
import com.facebook.react.ReactInstanceManager

/**
 * Class responsible of loading Flipper inside your React Native application. This is the release
 * flavor of it so it's empty as we don't want to load Flipper.
 */
object ReactNativeFlipper {
    fun initializeFlipper(context: Context?, reactInstanceManager: ReactInstanceManager) {
        // Do nothing as we don't want to initialize Flipper on Release.
    }
}