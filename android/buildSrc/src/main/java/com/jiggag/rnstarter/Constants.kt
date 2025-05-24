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
    const val KOTLIN_VERSION = "2.0.21"
    const val BUILD_TOOLS_VERSION = "35.0.0"
    const val MIN_SDK_VERSION = 24
    const val COMPILE_SDK_VERSION = 35
    const val TARGET_SDK_VERSION = 35
    val NDK_VERSION = "27.1.12297006"
    val REACT_NATIVE_ARCHITECTURES = getProperty("reactNativeArchitectures")
    val HERMES_ENABLED = getProperty("hermesEnabled")
}
