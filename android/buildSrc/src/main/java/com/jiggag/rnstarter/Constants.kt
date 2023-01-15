package com.jiggag.rnstarter

import java.io.FileInputStream
import java.util.Properties

private fun getProperty(key: String): String {
    val properties = Properties()
    properties.load(FileInputStream("gradle.properties"))

    return properties.getProperty(key)
}

object Constants {
    const val VERSION_CODE = 1
    const val VERSION_NAME = "0.0.1"
    const val KOTLIN_VERSION = "1.6.10"
    const val BUILD_TOOLS_VERSION = "33.0.0"
    const val MIN_SDK_VERSION = 21
    const val COMPILE_SDK_VERSION = 33
    const val TARGET_SDK_VERSION = 33
    val NDK_VERSION = "23.1.7779620"
    val FLIPPER_VERSION = getProperty("FLIPPER_VERSION")
    val REACT_NATIVE_ARCHITECTURES = getProperty("reactNativeArchitectures")
    val HERMES_ENABLED = getProperty("hermesEnabled")
}
