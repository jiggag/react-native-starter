import groovy.lang.Closure

rootProject.name = "RNStarter"

apply(from = "../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")
val applyNativeModules: Closure<Any> = extra.get("applyNativeModulesSettingsGradle") as Closure<Any>
applyNativeModules(settings)

include(":app", ":react-native-code-push")
project(":react-native-code-push").projectDir =
        File(rootProject.projectDir, "../node_modules/react-native-code-push/android/app")
