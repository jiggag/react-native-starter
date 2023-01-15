import groovy.lang.Closure

rootProject.name = "RNStarter"

apply(from = "../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")
val applyNativeModules: Closure<Any> = extra.get("applyNativeModulesSettingsGradle") as Closure<Any>
applyNativeModules(settings)

include(":app")

includeBuild("../node_modules/react-native-gradle-plugin")

include(":ReactAndroid")
include(":ReactAndroid:hermes-engine")
