package com.learnflow.nativegetvideo

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeGetVideoListPackage : BaseReactPackage() {

    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext
    ): NativeModule? {

        return (if (name == "NativeGetVideoList") {
            NativeGetVideoListModule(reactContext)
        } else {
            null
        }) as NativeModule?
    }

    override fun getReactModuleInfoProvider():
            ReactModuleInfoProvider {

        return ReactModuleInfoProvider {
            mapOf(
                "NativeGetVideoList" to ReactModuleInfo(
                    "NativeGetVideoList",
                    "NativeGetVideoList",
                    false,
                    false,
                    false,
                    true
                )
            )
        }
    }
}