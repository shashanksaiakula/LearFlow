package com.learnflow.notes

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class NotesPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<in Nothing, in Nothing>> {
        return emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<com.facebook.react.bridge.NativeModule> {
        return listOf(NoteModule(reactContext))
    }

}