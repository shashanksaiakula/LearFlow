package com.learnflow.nativegetvideo

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.util.Log
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.learnflow.NativeGetVideoListSpec

class NativeGetVideoListModule(reactContext: ReactApplicationContext) :
    NativeGetVideoListSpec(reactContext) {
    val TAG = "check"
    private val PICK_VIDEO_REQUEST = 1234
    private var pendingPromise: Promise? = null



    override fun getName(): String {
        return "NativeGetVideoList"
    }

    private val mActivityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(
            activity: Activity,
            requestCode: Int,
            resultCode: Int,
            data: Intent?
        ) {
            if (requestCode == PICK_VIDEO_REQUEST) {
                if (pendingPromise != null) {
                    if (resultCode == Activity.RESULT_OK && data != null) {
                        val uri = data.data
                        Log.e(TAG, "Selected video URI: $uri")
                        pendingPromise?.resolve(uri.toString())
                    } else {
                        pendingPromise?.reject("CANCELLED", "User closed picker")
                    }
                    pendingPromise = null
                }
            }
        }
    }

    init {
        // 2. Register the listener
        reactContext.addActivityEventListener(mActivityEventListener)

    }

    // Helper to get required permissions dynamically based on Android version
    private fun getRequiredPermissions(): Array<String> {
        return when {
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE -> {
                arrayOf(
                    Manifest.permission.READ_MEDIA_VIDEO,
                    Manifest.permission.READ_MEDIA_VISUAL_USER_SELECTED
                )
            }

            Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> {
                arrayOf(Manifest.permission.READ_MEDIA_VIDEO)
            }

            else -> {
                arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
            }
        }
    }

    // Helper to check the ACTUAL current permission status (not cached)
    private fun getCurrentPermissionStatus(): String {
        val activity = reactApplicationContext.currentActivity ?: return "denied"

        val persistedUris = reactApplicationContext.contentResolver.persistedUriPermissions
            .filter { it.isReadPermission }
            .map { it.uri }

        // READ_MEDIA_VISUAL_USER_SELECTED = Limited access (user selected specific photos/videos)
        val hasLimitedVideo =
            (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE &&
                activity.checkSelfPermission(Manifest.permission.READ_MEDIA_VISUAL_USER_SELECTED) == PackageManager.PERMISSION_GRANTED)

        // READ_MEDIA_VIDEO or READ_EXTERNAL_STORAGE = Full access
        val hasFullVideo = when {
            Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU ->
                (activity.checkSelfPermission(Manifest.permission.READ_MEDIA_VIDEO) == PackageManager.PERMISSION_GRANTED)

            else ->
                (activity.checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED)
        }

        return when {
            hasFullVideo -> "granted"
            hasLimitedVideo -> "limited"
            persistedUris.isNotEmpty() -> "limited"
            else -> "denied"
        }
    }

    override fun requestVideoPermission(promise: Promise?) {
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            promise?.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        val currentStatus = getCurrentPermissionStatus()
        Log.e(TAG, "requestVideoPermission: $currentStatus")

        // If already granted full access, resolve immediately
        if (currentStatus == "granted") {
            promise?.resolve(currentStatus)
            return
        }

        // If already limited, check whether we already have a selected URI.
        if (currentStatus == "limited") {
            val persistedUris = reactApplicationContext.contentResolver.persistedUriPermissions
                .filter { it.isReadPermission }
                .map { it.uri }
            if (persistedUris.isNotEmpty()) {
                promise?.resolve(persistedUris[0].toString())
                return
            }
            reselectVideos(promise)
            return
        }

        // Request permission; on Android 13+ the OS will show the media selection dialog.
        // If the user chooses limited access, the persisted URI is read below.
        if (activity is PermissionAwareActivity) {
            val permissionsToRequest = getRequiredPermissions()
            this.pendingPromise = promise
            val listener = object : PermissionListener {
                override fun onRequestPermissionsResult(
                    requestCode: Int,
                    permissions: Array<String>,
                    grantResults: IntArray
                ): Boolean {
                    if (requestCode == 1) {
                        val finalStatus = getCurrentPermissionStatus()
                        when (finalStatus) {
                            "granted" -> {
                                pendingPromise?.resolve(finalStatus)
                                pendingPromise = null
                            }
//                            "limited" -> {
//                                val persistedUris = reactApplicationContext.contentResolver.persistedUriPermissions
//                                    .filter { it.isReadPermission }
//                                    .map { it.uri }
//                                if (persistedUris.isNotEmpty()) {
//                                    pendingPromise?.resolve(persistedUris[0].toString())
//                                    pendingPromise = null
//                                } else {
//                                    reselectVideos(pendingPromise)
//                                }
//                            }
//                            else -> {
//                                pendingPromise?.reject("NO_PERMISSION", "Permission not granted")
//                                pendingPromise = null
//                            }
                        }
                        return true
                    }
                    return false
                }
            }
            activity.requestPermissions(permissionsToRequest, 1, listener)
        } else {
            promise?.reject(
                "NOT_PERMISSION_AWARE",
                "Activity is not PermissionAwareActivity"
            )
        }
    }

    override fun checkVideoPermission(promise: Promise?) {
        val currentStatus = getCurrentPermissionStatus()

        if (currentStatus == "granted" || currentStatus == "limited" || currentStatus.contains("content")) {
            promise?.resolve(currentStatus)
        } else {
            promise?.reject("NO_PERMISSION", "Permission not granted")
        }
    }


    override fun reselectVideos(promise: Promise?) {
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            promise?.reject("NO_ACTIVITY", "Activity doesn't exist")
            return
        }

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            val status = getCurrentPermissionStatus()
            if (status == "denied") {
                promise?.reject("NO_PERMISSION", "Permission not granted")
                return
            }
        }

        // 3. Store promise and launch Intent instead of ActivityResultLauncher
        this.pendingPromise = promise
        try {
            val intent = Intent(Intent.ACTION_PICK)
            intent.type = "video/*"

            // To support the modern Photo Picker look if available:
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                intent.action = Intent.ACTION_GET_CONTENT
            }

            activity.startActivityForResult(intent, PICK_VIDEO_REQUEST)
        } catch (e: Exception) {
            pendingPromise?.reject("ERROR", e.message)
            pendingPromise = null
        }
    }
}