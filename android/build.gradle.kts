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
        classpath("com.android.tools.build:gradle:7.3.1")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("com.google.gms:google-services:4.3.14")
    }
}

allprojects {
    repositories {
        maven("$rootDir/../node_modules/@notifee/react-native/android/libs")
    }

    configurations.all {
        resolutionStrategy.dependencySubstitution {
            substitute(project(":ReactAndroid"))
                .using(module("com.facebook.react:react-android:0.71.0"))
                .because("On New Architecture we're building React Native no longer builds from source")
            substitute(project(":ReactAndroid:hermes-engine"))
                .using(module("com.facebook.react:hermes-android:0.71.0"))
                .because("On New Architecture we're building Hermes no longer builds from source")
        }
    }
}
