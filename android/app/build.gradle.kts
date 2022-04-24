import com.jiggag.rnstarter.Constants
import groovy.lang.Closure
import com.android.build.api.variant.FilterConfiguration.FilterType.*
import org.apache.tools.ant.taskdefs.condition.Os

plugins {
    id("com.android.application")
    id("kotlin-android")
    id("com.google.gms.google-services")
}

ext["react"] = mapOf(
    "entryFile" to "index.js",
    "enableHermes" to true
)

apply(from = "../../node_modules/react-native/react.gradle")

val enableHermes = (ext["react"] as Map<*, *>)["enableHermes"] as Boolean
val architectures = Constants.ARCHITECTURES.split(",")
val isNewArchitectureEnabled = Constants.NEW_ARCH_ENABLED === "true"

android {
    compileSdkVersion(Constants.COMPILE_SDK_VERSION)
    ndkVersion = Constants.NDK_VERSION

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    defaultConfig {
        applicationId = "com.jiggag.rnstarter"
        minSdk = Constants.MIN_SDK_VERSION
        targetSdk = Constants.TARGET_SDK_VERSION
        versionCode = Constants.VERSION_CODE
        versionName = Constants.VERSION_NAME
        multiDexEnabled = true
        manifestPlaceholders += mutableMapOf()
        buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", "true")

        if (isNewArchitectureEnabled) {
            externalNativeBuild {
                ndkBuild {
                    arguments += listOf(
                        "APP_PLATFORM=android-21",
                        "APP_STL=c++_shared",
                        "NDK_TOOLCHAIN_VERSION=clang",
                        "GENERATED_SRC_DIR=$buildDir/generated/source",
                        "PROJECT_BUILD_DIR=$buildDir",
                        "REACT_ANDROID_DIR=$rootDir/../node_modules/react-native/ReactAndroid",
                        "REACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build"
                    )

                    cFlags += listOf(
                        "-Wall",
                        "-Werror",
                        "-fexceptions",
                        "-frtti",
                        "-DWITH_INSPECTOR=1"
                    )
                    cppFlags += listOf("-std=c++17")
                    // Make sure this target name is the same you specify inside the
                    // src/main/jni/Android.mk file for the `LOCAL_MODULE` variable.
                    targets += listOf("rnstarter_appmodules")

                    // Fix for windows limit on number of character in file paths and in command lines
                    if (Os.isFamily(Os.FAMILY_WINDOWS)) {
                        arguments += listOf(
                            "NDK_OUT=${rootProject.projectDir.parent}\\.cxx",
                            "NDK_APP_SHORT_COMMANDS=true"
                        )
                    }
                }
            }
        }
    }

    if (isNewArchitectureEnabled) {
        externalNativeBuild {
            ndkBuild {
                path = file("$projectDir/src/main/jni/Android.mk")
            }
        }

        val reactAndroidProjectDir = project(":ReactAndroid").projectDir
        val packageReactNdkDebugLibs = tasks.register<Copy>("packageReactNdkDebugLibs") {
            dependsOn(":ReactAndroid:packageReactNdkDebugLibsForBuck")
            from("$reactAndroidProjectDir/src/main/jni/prebuilt/lib")
            into("$buildDir/react-ndk/exported")
        }
        val packageReactNdkReleaseLibs = tasks.register<Copy>("packageReactNdkReleaseLibs") {
            dependsOn(":ReactAndroid:packageReactNdkReleaseLibsForBuck")
            from("$reactAndroidProjectDir/src/main/jni/prebuilt/lib")
            into("$buildDir/react-ndk/exported")
        }

        afterEvaluate {
            // If you wish to add a custom TurboModule or component locally,
            // you should uncomment this line.
//            tasks.findByName("preBuild")?.configure<Copy> {
//                dependsOn("generateCodegenArtifactsFromSchema")
//            }
            tasks.findByName("preDebugBuild")?.configure<Copy> {
                dependsOn(packageReactNdkDebugLibs)
            }
            tasks.findByName("preReleaseBuild")?.configure<Copy> {
                dependsOn(packageReactNdkReleaseLibs)
            }
            // Due to a bug inside AGP, we have to explicitly set a dependency
            // between configureNdkBuild* tasks and the preBuild tasks.
            // This can be removed once this is solved: https://issuetracker.google.com/issues/207403732
            tasks.findByName("configureNdkBuildRelease")?.configure<Copy> {
                dependsOn("preReleaseBuild")
            }
            tasks.findByName("configureNdkBuildDebug")?.configure<Copy> {
                dependsOn("preDebugBuild")
            }

            architectures.forEach { architecture ->
                tasks.findByName("configureNdkBuildDebug[${architecture}]")?.configure<Copy> {
                    dependsOn("preDebugBuild")
                }
                tasks.findByName("configureNdkBuildRelease[${architecture}]")?.configure<Copy> {
                    dependsOn("preReleaseBuild")
                }
            }
        }
    }

    splits {
        abi {
            isEnable = true
            reset()
            include(architectures.joinToString())
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
            isMinifyEnabled = true
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
    implementation(fileTree(mapOf("dir" to "libs", "include" to "*.jar")))
    implementation("com.facebook.react:react-native:+")  // From node_modules
    implementation("androidx.multidex:multidex:2.0.1")
    implementation("androidx.appcompat:appcompat:1.4.0")
    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.0.0")
    implementation("com.google.firebase:firebase-bom:29.0.4")

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
    from(configurations.implementation)
    into("libs")
}

if (isNewArchitectureEnabled) {
    // If new architecture is enabled, we let you build RN from source
    // Otherwise we fallback to a prebuilt .aar bundled in the NPM package.
    // This will be applied to all the imported transtitive dependency.
    configurations.all {
        resolutionStrategy.dependencySubstitution {
            substitute(module("com.facebook.react:react-native"))
                .using(project(":ReactAndroid")).because("On New Architecture we're building React Native from source")
        }
    }
}

// React Native
apply(from = "../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")

val applyNativeModulesAppBuildGradle: Closure<Any> by ext
applyNativeModulesAppBuildGradle(project)
