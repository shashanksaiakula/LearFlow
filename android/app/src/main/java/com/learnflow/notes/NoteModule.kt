package com.learnflow.notes

import android.annotation.SuppressLint
import android.util.Log
import com.example.video_player_lib.VideoPlayerApi
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil

class NoteModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    object PlayerHolder {

        @SuppressLint("StaticFieldLeak")
        var videoPlayerApi:
                VideoPlayerApi? = null
    }

    override fun getName(): String {
        return "NoteModule"
    }
    @ReactMethod
    fun getVideoId(videoUri: String,promise: Promise) {
//        promise.resolve(PlayerHolder.videoPlayerApi
//            ?.getId()
//            ?.toDouble())
        val id = videoUri.substring(videoUri.lastIndexOf("/") + 1).toLongOrNull()
        Log.e("check", "getVideoId: ${id}" )
        promise.resolve(id?.toDouble())
    }
    @ReactMethod
    fun addNote(note: String, id: Double) {
        Log.e("check", "addNote: $note, $id")
        PlayerHolder.videoPlayerApi
            ?.addNote(note, id.toLong())
    }

    @ReactMethod
    fun getTimeStamp(promise: Promise) {
        UiThreadUtil.runOnUiThread(
           runnable = {
               val timeStamp = PlayerHolder.videoPlayerApi?.getTimeStamp()
               Log.e("check", "getTimeStamp: ${timeStamp}" )
               promise.resolve(timeStamp)
           }
        );
    }
    @ReactMethod
    fun getNotesList(promise: Promise) {
        try {
            val nativeMap = Arguments.createMap()
            val notes = PlayerHolder.videoPlayerApi!!.getNotesList()
            for ((key, list) in notes) {
                val arr = Arguments.createArray()
                for (item in list) arr.pushString(item)
                // JS object keys must be strings, so use key.toString()
                nativeMap.putArray(key.toString(), arr)
            }
            promise.resolve(nativeMap)
        } catch (e: Exception) {
            promise.reject("ERR_NOTES", e)
        }
    }
}