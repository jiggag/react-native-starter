import com.jiggag.rnstarter.Constants
import groovy.lang.Closure
import com.android.build.api.variant.FilterConfiguration.FilterType.*
import org.apache.tools.ant.taskdefs.condition.Os

plugins {
    id("com.android.application")
    id("com.google.gms.google-services")
    id("org.jetbrains.kotlin.android") version "1.6.10"
}

ext["react"] = mapOf(
    "entryFile" to "index.js",
    "enableHermes" to true
)

apply(from = "../../node_modules/react-native/react.gradle")

val enableSeparateBuildPerCPUArchitecture = true
val enableProguardInReleaseBuilds = true
val jscFlavor = "org.webkit:android-jsc:+"
val enableHermes = (ext["react"] as Map<*, *>)["enableHermes"] as Boolean
val reactNativeArchitectures = Constants.REACT_NATIVE_ARCHITECTURES.split(",")
val isNewArchitectureEnabled = Constants.NEW_ARCH_ENABLED === "true"

android {
    compileSdk = Constants.COMPILE_SDK_VERSION
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
        buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", isNewArchitectureEnabled.toString())

        if (isNewArchitectureEnabled) {
            // We configure the CMake build only if you decide to opt-in for the New Architecture.
            externalNativeBuild {
                cmake {
                    arguments += listOf(
                        "-DPROJECT_BUILD_DIR=$buildDir",
                        "-DREACT_ANDROID_DIR=$rootDir/../node_modules/react-native/ReactAndroid",
                        "-DREACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build",
                        "-DNODE_MODULES_DIR=$rootDir/../node_modules",
                        "-DANDROID_STL=c++_shared"
                    )
                }

                if (!enableSeparateBuildPerCPUArchitecture) {
                    ndk {
                        abiFilters += reactNativeArchitectures.joinToString()
                    }
                }
            }
        }
    }

    if (isNewArchitectureEnabled) {
        externalNativeBuild {
            cmake {
                path = file("$projectDir/src/main/jni/CMakeLists.txt")
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
            // between configureCMakeDebug* tasks and the preBuild tasks.
            // This can be removed once this is solved: https://issuetracker.google.com/issues/207403732
            tasks.findByName("configureCMakeRelWithDebInfo")?.configure<Copy> {
                dependsOn("preReleaseBuild")
            }
            tasks.findByName("configureCMakeDebug")?.configure<Copy> {
                dependsOn("preDebugBuild")
            }

            reactNativeArchitectures.forEach { architecture ->
                tasks.findByName("configureCMakeDebug[${architecture}]")?.configure<Copy> {
                    dependsOn("preDebugBuild")
                }
                tasks.findByName("configureCMakeRelWithDebInfo[${architecture}]")?.configure<Copy> {
                    dependsOn("preReleaseBuild")
                }
            }
        }
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
        //noinspection GradleDynamicVersion
        implementation("com.facebook.react:hermes-engine:+") { // From node_modules
            exclude(group = "com.facebook.fbjni")
        }
    } else {
        implementation(jscFlavor)
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
                .using(project(":ReactAndroid"))
                .because("On New Architecture we're building React Native from source")
            substitute(module("com.facebook.react:hermes-engine"))
                .using(project(":ReactAndroid:hermes-engine"))
                .because("On New Architecture we're building Hermes from source")
        }
    }
}

// React Native
apply(from = "../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")

val applyNativeModulesAppBuildGradle: Closure<Any> by ext
applyNativeModulesAppBuildGradle(project)
