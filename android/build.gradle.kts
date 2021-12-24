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
    classpath("com.android.tools.build:gradle:7.0.3")
    classpath("com.bugsnag:bugsnag-android-gradle-plugin:7.+")
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
    jcenter()
    maven("https://jitpack.io")
  }
}

subprojects {
  val ktlint by configurations.creating
  val targetFiles = listOf("src/**/*.kt", "../**/*.kts")

  dependencies {
    ktlint("com.pinterest:ktlint:0.42.1")
  }

  tasks.register<JavaExec>("ktlintCheck") {
    description = "Check Kotlin code style."
    classpath = ktlint
    main = "com.pinterest.ktlint.Main"
    args = targetFiles
  }

  tasks.register<JavaExec>("ktlintFormat") {
    description = "Fix Kotlin code style deviations."
    classpath = ktlint
    main = "com.pinterest.ktlint.Main"
    args = listOf("-F") + targetFiles
  }
}
