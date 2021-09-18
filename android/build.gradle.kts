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
        classpath("com.android.tools.build:gradle:4.2.1")
        classpath("com.bugsnag:bugsnag-android-gradle-plugin:5.+")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${com.jiggag.rnstarter.Constants.KOTLIN_VERSION}")
        classpath("io.realm:realm-gradle-plugin:10.8.0")
    }
}

allprojects {
    repositories {
        mavenCentral()
        mavenLocal()

        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        maven("$rootDir/../node_modules/react-native/android")
        // Android JSC is installed from npm
        maven("$rootDir/../node_modules/jsc-android/dist")

        google()
        maven("https://jitpack.io")
    }
}
