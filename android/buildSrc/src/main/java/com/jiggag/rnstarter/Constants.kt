package com.jiggag.rnstarter

import java.io.FileInputStream
import java.util.Properties
import org.apache.tools.ant.taskdefs.condition.Os

private fun getProperty(key: String): String {
    val properties = Properties()
    properties.load(FileInputStream("gradle.properties"))

    return properties.getProperty(key)
}

private fun getNdkVersion(): String {
    return if (System.getProperty("os.arch").equals("aarch64")) {
        // For M1 Users we need to use the NDK 24 which added support for aarch64
        "24.0.8215888"
    } else if (Os.isFamily(Os.FAMILY_WINDOWS)) {
        // For Android Users, we need to use NDK 23, otherwise the build will
        // fail due to paths longer than the OS limit
        "23.1.7779620"
    } else {
        // Otherwise we default to the side-by-side NDK version from AGP.
        "21.4.7075529"
    }
}

object Constants {
    const val KOTLIN_VERSION = "1.6.0"
    const val BUILD_TOOLS_VERSION = "31.0.0"
    const val MIN_SDK_VERSION = 21
    const val COMPILE_SDK_VERSION = 31
    const val TARGET_SDK_VERSION = 31
    val NDK_VERSION = getNdkVersion()
    val FLIPPER_VERSION = getProperty("FLIPPER_VERSION")
    const val VERSION_CODE = 1
    const val VERSION_NAME = "0.0.1"
}
