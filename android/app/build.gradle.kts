import com.jiggag.rnstarter.Constants
import groovy.lang.Closure

plugins {
    id("com.android.application")
    id("com.bugsnag.android.gradle")
    id("kotlin-android")
}

ext["envConfigFiles"] = mapOf(
    "debug" to ".env",
    "release" to ".env.production"
)

apply(from = "${project(":react-native-config").projectDir.path}/dotenv.gradle")

ext["react"] = mapOf(
    "entryFile" to "index.js",
    "enableHermes" to true
)

apply(from = "../../node_modules/react-native/react.gradle")
apply(from = "../../node_modules/react-native-code-push/android/codepush.gradle")

val enableHermes = (ext["react"] as Map<*, *>)["enableHermes"] as Boolean

android {
    compileSdkVersion(Constants.COMPILE_SDK_VERSION)
    ndkVersion = Constants.NDK_VERSION

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    defaultConfig {
        applicationId = "com.jiggag.rnstarter"
        minSdkVersion(Constants.MIN_SDK_VERSION)
        targetSdkVersion(Constants.TARGET_SDK_VERSION)
        versionCode = 1
        versionName = "0.0.1"
        multiDexEnabled = true
        manifestPlaceholders(mutableMapOf(
            "bugsnagApiKey" to Constants.BUGSNAG_API_KEY
        ))
    }

    splits {
        abi {
            isEnable = true
            reset()
            include("armeabi-v7a", "x86", "arm64-v8a", "x86_64")
            isUniversalApk = false
        }
    }

    signingConfigs {
        getByName("debug") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
        create("release") {
            storeFile =  file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        getByName("debug") {
            signingConfig = signingConfigs.getByName("debug")
            resValue("string", "CodePushDeploymentKey", "")
        }
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            resValue("string", "CodePushDeploymentKey", Constants.CODE_PUSH_AOS_KEY)
        }

        val versionCodes = mapOf(
            "armeabi-v7a" to 1,
            "x86" to 2,
            "arm64-v8a" to 3,
            "x86_64" to 4
        )

//        applicationVariants.all {
//            this.outputs.all {
//                val output = this as ApkVariantOutput
//                val name = output.filters.find { it.filterType === "ABI" }?.identifier
//                val versionCode = versionCodes[name]
//                if (versionCode !== null) {
//                    output.versionCode.set((defaultConfig.versionCode?.times(1000) ?: 0) + versionCodes)
//                }
//            }
//        }
    }
}


dependencies {
    implementation(fileTree(mapOf("dir" to "libs", "include" to "*.jar")))
    implementation("com.facebook.react:react-native:+")  // From node_modules
    implementation("androidx.multidex:multidex:2.0.1")
    implementation("androidx.appcompat:appcompat:1.3.0-rc01")
    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02")

    debugImplementation("com.facebook.flipper:flipper:${Constants.FLIPPER_VERSION}") {
        exclude(group = "com.facebook.fbjni")
    }

    debugImplementation("com.facebook.flipper:flipper-network-plugin:${Constants.FLIPPER_VERSION}") {
        exclude(group = "com.facebook.flipper")
        exclude(group = "com.squareup.okhttp3", module = "okhttp")
    }

    debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${Constants.FLIPPER_VERSION}") {
        exclude(group = "com.facebook.flipper")
    }

    if (enableHermes) {
        val hermesPath = "../../node_modules/hermes-engine/android/"
        debugImplementation(files("${hermesPath}hermes-debug.aar"))
        releaseImplementation(files("${hermesPath}hermes-release.aar"))
    } else {
        implementation("org.webkit:android-jsc:+")
    }
}

// Run this once to be able to run the application with BUCK
// puts all compile dependencies into folder libs for BUCK to use
tasks.register<Copy>("copyDownloadableDepsToLibs") {
    from(configurations.compile)
    into("libs")
}

bugsnag {
    variantFilter {
        val name = this.name.toLowerCase()
        if (name == "debug" || name == "staging") {
            enabled.set(false)
        }
    }
}


// React Native
apply(from = "../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")

val applyNativeModulesAppBuildGradle: Closure<Any> by ext
applyNativeModulesAppBuildGradle(project)

// Bugsnag
apply(from = "../../node_modules/@bugsnag/react-native/bugsnag-react-native.gradle")
