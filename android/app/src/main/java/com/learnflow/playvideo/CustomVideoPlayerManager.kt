package com.learnflow.playvideo

import android.net.Uri
import android.util.Log
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.core.net.toUri

import com.example.video_player_lib.VideoPlayerApi
import com.example.video_player_lib.VideoPlayerListener
import com.facebook.react.bridge.Promise

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.learnflow.notes.NoteModule

class CustomVideoPlayerManager(
    private val appContext: ReactApplicationContext,
) : SimpleViewManager<FrameLayout>() {

    companion object {
        const val COMMAND_PLAY = 1
        const val COMMAND_PAUSE = 2
        const val LONG_PRESS = 3
        const val SKIP_FORWARD = 4
        const val SKIP_REVERSE = 5
    }

    private var videoPlayerApi: VideoPlayerApi? = null

    private var playerContainer: FrameLayout? = null

    private var currentUri: String? = null
    private var playerViewCreated = false

    override fun getName(): String {
        return "CustomVideoPlayer"
    }

    override fun createViewInstance(
        reactContext: ThemedReactContext
    ): FrameLayout {

        val rootView = FrameLayout(reactContext)


        try {

            videoPlayerApi =
                VideoPlayerApi.initialize(
                    reactContext.currentActivity
                        ?: appContext
                )

            videoPlayerApi?.setListener(
                object : VideoPlayerListener {

                    override fun onPlaybackStateChanged(
                        state: Int
                    ) {
                        Log.d(
                            "CustomVideoPlayer",
                            "state: $state"
                        )
                    }

                    override fun onIsPlayingChanged(
                        isPlaying: Boolean
                    ) {
                        Log.d(
                            "CustomVideoPlayer",
                            "playing: $isPlaying"
                        )
                    }

                    override fun onPlayerError(
                        error: String
                    ) {
                        Log.e(
                            "CustomVideoPlayer",
                            error
                        )
                    }
                }
            )

            // CREATE PLAYER VIEW ONLY ONCE
            val playerView =
                videoPlayerApi?.getFullPlayerView(
                    Uri.EMPTY,
                    true
                )

            if (playerView != null) {
                rootView.addView(playerView)
            }

            playerContainer = rootView
            NoteModule.PlayerHolder.videoPlayerApi =
                videoPlayerApi

        } catch (e: Exception) {

            Log.e(
                "CustomVideoPlayer",
                "create error",
                e
            )
        }

        return rootView
    }

    @ReactProp(name = "videoUri")
    fun setVideoUri(
        view: FrameLayout,
        videoUri: String?
    ) {

        if (videoUri.isNullOrBlank()) {
            return
        }

        if (videoUri == currentUri) {
            return
        }

        currentUri = videoUri

        try {

            // FIRST VIDEO
            if (!playerViewCreated) {

                view.removeAllViews()

                val playerView =
                    videoPlayerApi?.getFullPlayerView(
                        videoUri.toUri(),
                        true
                    )

                if (playerView != null) {

                    if (playerView.parent != null) {
                        (playerView.parent as ViewGroup)
                            .removeView(playerView)
                    }

                    view.addView(
                        playerView,
                        FrameLayout.LayoutParams(
                            FrameLayout.LayoutParams.MATCH_PARENT,
                            FrameLayout.LayoutParams.MATCH_PARENT
                        )
                    )

                    playerViewCreated = true
                }

            } else {

                // NEXT VIDEOS
                videoPlayerApi?.prepare(
                    videoUri.toUri()
                )

                videoPlayerApi?.play()
            }

        } catch (e: Exception) {

            Log.e(
                "CustomVideoPlayer",
                "video error",
                e
            )
        }
    }

    override fun onDropViewInstance(
        view: FrameLayout
    ) {

        super.onDropViewInstance(view)

        try {

            videoPlayerApi?.onClose()

        } catch (e: Exception) {

            Log.e(
                "CustomVideoPlayer",
                "release error",
                e
            )
        }
    }

    @ReactProp("isPlaying")
    fun isPlaying(
        view: FrameLayout,
        isPlaying: Boolean
    ) {
        if (isPlaying) {
            videoPlayerApi?.play()
        } else {
            videoPlayerApi?.pause()
        }
    }

    override fun getCommandsMap(): MutableMap<String, Int> {
        return hashMapOf(
            "play" to COMMAND_PLAY,
            "pause" to COMMAND_PAUSE,
            "longPress" to LONG_PRESS,
            "skipForward" to SKIP_FORWARD,
            "skipReverse" to SKIP_REVERSE

        )
    }

    @Deprecated("Deprecated in Java")
    override fun receiveCommand(view: FrameLayout, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            COMMAND_PLAY -> {
                videoPlayerApi?.play()
            }

            COMMAND_PAUSE -> {
                videoPlayerApi?.pause()
            }

            LONG_PRESS -> {
                val speed = args?.getDouble(0) ?: 2.0
                videoPlayerApi?.setLongPressSpeed(speed.toFloat())
            }
            SKIP_FORWARD -> {
                val seek = args?.getInt(0) ?: 10000
                videoPlayerApi?.skipForword(seek.toLong())
            }
            SKIP_REVERSE -> {
                val seek = args?.getInt(0) ?: 10000
                videoPlayerApi?.skipBackword(seek.toLong())
            }
        }
    }

    @ReactProp("forwardSeek")
    fun farwrodSeek(
        view: FrameLayout,
        seek: Int
    ) {
        videoPlayerApi?.skipForword(seek.toLong())
    }

    @ReactProp("reverseSeek")
    fun reverseSeek(
        view: FrameLayout,
        seek: Int
    ) {
        videoPlayerApi?.skipBackword(seek.toLong())
    }
}
