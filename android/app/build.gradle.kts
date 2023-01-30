import com.jiggag.rnstarter.Constants
import groovy.lang.Closure
import com.android.build.api.variant.FilterConfiguration.FilterType.ABI

plugins {
    id("com.android.application")
    id("com.facebook.react")
    id("com.google.gms.google-services")
    id("org.jetbrains.kotlin.android") version "1.6.10"
}

/**
 * This is the configuration block to customize your React Native Android app.
 * By default you don't need to apply any configuration, just uncomment the lines you need.
 */
react {
    /* Folders */
    //   The root of your project, i.e. where "package.json" lives. Default is '..'
    // root = file("../")
    //   The folder where the react-native NPM package is. Default is ../node_modules/react-native
    // reactNativeDir = file("../node_modules/react-native")
    //   The folder where the react-native Codegen package is. Default is ../node_modules/react-native-codegen
    // codegenDir = file("../node_modules/react-native-codegen")
    //   The cli.js file which is the React Native CLI entrypoint. Default is ../node_modules/react-native/cli.js
    // cliFile = file("../node_modules/react-native/cli.js")
    /* Variants */
    //   The list of variants to that are debuggable. For those we're going to
    //   skip the bundling of the JS bundle and the assets. By default is just 'debug'.
    //   If you add flavors like lite, prod, etc. you'll have to list your debuggableVariants.
    // debuggableVariants = ["liteDebug", "prodDebug"]
    /* Bundling */
    //   A list containing the node command and its flags. Default is just 'node'.
    // nodeExecutableAndArgs = ["node"]
    //
    //   The command to run when bundling. By default is 'bundle'
    // bundleCommand = "ram-bundle"
    //
    //   The path to the CLI configuration file. Default is empty.
    // bundleConfig = file(../rn-cli.config.js)
    //
    //   The name of the generated asset file containing your JS bundle
    // bundleAssetName = "MyApplication.android.bundle"
    //
    //   The entry file for bundle generation. Default is 'index.android.js' or 'index.js'
    // entryFile = file("../js/MyApplication.android.js")
    //
    //   A list of extra flags to pass to the 'bundle' commands.
    //   See https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle
    // extraPackagerArgs = []
    /* Hermes Commands */
    //   The hermes compiler command to run. By default it is 'hermesc'
    // hermesCommand = "$rootDir/my-custom-hermesc/bin/hermesc"
    //
    //   The list of flags to pass to the Hermes compiler. By default is "-O", "-output-source-map"
    // hermesFlags = ["-O", "-output-source-map"]
}

/**
 * Set this to true to create four separate APKs instead of one,
 * one for each native architecture. This is useful if you don't
 * use App Bundles (https://developer.android.com/guide/app-bundle/)
 * and want to have separate APKs to upload to the Play Store.
 */
val enableSeparateBuildPerCPUArchitecture = true

/**
 * Set this to true to Run Proguard on Release builds to minify the Java bytecode.
 */
val enableProguardInReleaseBuilds = true

/**
 * The preferred build flavor of JavaScriptCore (JSC)
 *
 * For example, to use the international variant, you can use:
 * `def jscFlavor = 'org.webkit:android-jsc-intl:+'`
 *
 * The international variant includes ICU i18n library and necessary data
 * allowing to use e.g. `Date.toLocaleString` and `String.localeCompare` that
 * give correct results when using with locales other than en-US. Note that
 * this variant is about 6MiB larger per architecture than default.
 */
val jscFlavor = "org.webkit:android-jsc:+"

/**
 * Private function to get the list of Native Architectures you want to build.
 * This reads the value from reactNativeArchitectures in your gradle.properties
 * file and works together with the --active-arch-only flag of react-native run-android.
 */
val reactNativeArchitectures = Constants.REACT_NATIVE_ARCHITECTURES.split(",")
val hermesEnabled = Constants.HERMES_ENABLED == "true"

android {
    compileSdk = Constants.COMPILE_SDK_VERSION
    ndkVersion = Constants.NDK_VERSION

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    namespace = "com.jiggag.rnstarter"

    defaultConfig {
        applicationId = "com.jiggag.rnstarter"
        minSdk = Constants.MIN_SDK_VERSION
        targetSdk = Constants.TARGET_SDK_VERSION
        versionCode = Constants.VERSION_CODE
        versionName = Constants.VERSION_NAME
        multiDexEnabled = true
        manifestPlaceholders += mutableMapOf()
    }

    splits {
        abi {
            reset()
            isEnable = enableSeparateBuildPerCPUArchitecture
            isUniversalApk = false
            include(reactNativeArchitectures.joinToString())
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
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        getByName("debug") {
            signingConfig = signingConfigs.getByName("debug")
        }
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = enableProguardInReleaseBuilds
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

val abiCodes = mapOf(
    "armeabi-v7a" to 1,
    "x86" to 2,
    "arm64-v8a" to 3,
    "x86_64" to 4
)

androidComponents {
    onVariants { variant ->
        variant.outputs.forEach { output ->
            val name = output.filters.find { it.filterType == ABI }?.identifier
            val baseAbiCode = abiCodes[name]
            if (baseAbiCode != null) {
                output.versionCode.set(baseAbiCode + (output.versionCode.get() ?: 0).times(1000))
            }
        }
    }
}

dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")
    implementation("androidx.multidex:multidex:2.0.1")
    implementation("androidx.appcompat:appcompat:1.4.0")
    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.0.0")
    implementation("com.google.firebase:firebase-bom:29.0.4")

    debugImplementation("com.facebook.flipper:flipper:${Constants.FLIPPER_VERSION}")

    debugImplementation("com.facebook.flipper:flipper-network-plugin:${Constants.FLIPPER_VERSION}") {
        exclude(group = "com.squareup.okhttp3", module = "okhttp")
    }

    debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${Constants.FLIPPER_VERSION}")

    if (hermesEnabled) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation(jscFlavor)
    }
}

// React Native
apply(from = "../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")

val applyNativeModulesAppBuildGradle: Closure<Any> by ext
applyNativeModulesAppBuildGradle(project)
