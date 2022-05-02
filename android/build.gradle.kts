import com.jiggag.rnstarter.Constants

extra["buildToolsVersion"] = Constants.BUILD_TOOLS_VERSION
extra["minSdkVersion"] = Constants.MIN_SDK_VERSION
extra["compileSdkVersion"] = Constants.COMPILE_SDK_VERSION
extra["targetSdkVersion"] = Constants.TARGET_SDK_VERSION
extra["ndkVersion"] = Constants.NDK_VERSION

buildscript {
    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:7.1.1")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("de.undercouch:gradle-download-task:5.0.1")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${com.jiggag.rnstarter.Constants.KOTLIN_VERSION}")
        classpath("com.google.gms:google-services:4.3.10")
    }
}

allprojects {
    repositories {
        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        maven("$rootDir/../node_modules/react-native/android")
        // Android JSC is installed from npm
        maven("$rootDir/../node_modules/jsc-android/dist")

        mavenCentral {
            // We don't want to fetch react-native from Maven Central as there are
            // older versions over there.
            content {
                excludeGroup("com.facebook.react")
            }
        }

        google()
        maven("https://jitpack.io")

        maven("$rootDir/../node_modules/@notifee/react-native/android/libs")
    }
}
