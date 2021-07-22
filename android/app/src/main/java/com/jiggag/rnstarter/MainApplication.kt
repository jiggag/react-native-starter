package com.jiggag.rnstarter;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.bugsnag.android.Bugsnag;
import com.jiggag.rnstarter.config.RNConfigPackage
import com.microsoft.codepush.react.CodePush;

import java.lang.reflect.InvocationTargetException;

class MainApplication : Application(), ReactApplication {
    private val reactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            val packages: MutableList<ReactPackage> = PackageList(this).packages
            packages.addAll(
                listOf(
                    RNConfigPackage(),
                )
            )
            return packages
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }

        override fun getJSBundleFile(): String? {
            return CodePush.getJSBundleFile()
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return reactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        Bugsnag.start(this)
        SoLoader.init(this, /* native exopackage */ false)
        initializeFlipper(this, getReactNativeHost().reactInstanceManager)
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                val aClass = Class.forName("com.jiggag.rnstarter.ReactNativeFlipper")
                aClass.getMethod("initializeFlipper", Context::class.java, ReactInstanceManager::class.java).invoke(null, context, reactInstanceManager)
            } catch (e: ClassNotFoundException) {
                e.printStackTrace()
            } catch (e: NoSuchMethodException) {
                e.printStackTrace()
            } catch (e: IllegalAccessException) {
                e.printStackTrace()
            } catch (e: InvocationTargetException) {
                e.printStackTrace()
            }

        }

    }
}
