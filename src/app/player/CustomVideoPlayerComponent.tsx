import { Button, findNodeHandle, requireNativeComponent, ScrollView, StyleSheet, Text, UIManager, View, ViewProps, NativeModules, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const { NoteModule } = NativeModules;

export type CustomVideoPlayerProps = ViewProps & {
    videoUri: string;
};

// export const CustomVideoPlayer = requireNativeComponent<CustomVideoPlayerProps>('CustomVideoPlayer');

declare global {
    var __CustomVideoPlayerRef: any;
}

// 2. Safely register and cache the component globally
export const CustomVideoPlayer = globalThis.__CustomVideoPlayerRef || (
    globalThis.__CustomVideoPlayerRef = requireNativeComponent<CustomVideoPlayerProps>('CustomVideoPlayer')
);
const Commands =
    UIManager.getViewManagerConfig(
        'CustomVideoPlayer',
    ).Commands;

const CustomVideoPlayerComponent = ({ videoUri }: CustomVideoPlayerProps) => {

    const nativeRef = useRef<any>(null);
    const [isplaying, setIsPlaying] = React.useState(true);
    const [forwardSeek, setForwardSeek] = React.useState(0);
    const [reverseSeek, setReverseSeek] = React.useState(0);
    const [videoId, setVideoId] = React.useState(0);
    const [text, setText] = useState("");
    const [ViewSelector, setViewSelector] = React.useState("actions");
    const [timeStamp, setTimeStamp] = useState("");
    const [notesList, setNotesList] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        getId();
    }, [videoUri]);

    function getId() {
        const videoId = async (videoUri: string) => {
            const id = await NoteModule.getVideoId(videoUri);
            setVideoId(id);
            console.log("Video Id from Native Module: ", id);
        }
        videoId(videoUri);
    }
    const addNote = async (note: string, videoId: number) => {
        const result = await NoteModule.addNote(note, videoId);
        console.log("Add Note Result: ", result);
    }
    const getNotes = async () => {
        const notes = await NoteModule.getNotes();
    }


    const timestamp = async () => {
        const time = await NoteModule.getTimeStamp();
        setTimeStamp(time);
    }

    const getNotesList = async () => {
        const notesList = await NoteModule.getNotesList();
        setNotesList(new Map(Object.entries(notesList)));
        console.log("Notes List: ", notesList);
    }


    // useImperativeHandle(ref, () => ({

    //   play() {

    //     UIManager.dispatchViewManagerCommand(
    //       findNodeHandle(nativeRef.current),
    //       Commands.play,
    //       [],
    //     );
    //   },

    //   pause() {

    //     UIManager.dispatchViewManagerCommand(
    //       findNodeHandle(nativeRef.current),
    //       Commands.pause,
    //       [],
    //     );
    //   },
    // }));
    return (
        <>
            <View style={{ flex: 1, }} >
                <CustomVideoPlayer style={styles.container} videoUri={videoUri} isPlaying={isplaying} ref={nativeRef} />
                <Text>Video Id: {videoId}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 10 }} >
                    <Button title="Actions" onPress={() => setViewSelector("actions")} />
                    <Button title="Notes" onPress={() => setViewSelector("notes")} />
                </View>
                {ViewSelector === "actions" && (
                    <>
                        <Button title={isplaying ? "Pause" : "Play"} onPress={() => {
                            setIsPlaying(!isplaying)
                        }} />
                        <Button
                            title="Play Command"
                            onPress={() => {

                                UIManager.dispatchViewManagerCommand(
                                    findNodeHandle(nativeRef.current),
                                    Commands.play,
                                    [],
                                );
                            }}
                        />

                        <Button
                            title="Pause Command"
                            onPress={() => {

                                UIManager.dispatchViewManagerCommand(
                                    findNodeHandle(nativeRef.current),
                                    Commands.pause,
                                    [],
                                );
                            }}
                        />
                        <Button
                            title="LongPress Command"
                            onPress={() => {
                                UIManager.dispatchViewManagerCommand(
                                    findNodeHandle(nativeRef.current),
                                    Commands.longPress,
                                    [4],
                                );
                            }}
                        />
                        <Button title="skip +10 sec" onPress={() =>
                            UIManager.dispatchViewManagerCommand(
                                findNodeHandle(nativeRef.current),
                                Commands.skipForward,
                                [5000],
                            )

                        } />
                        <Button title="skip -10 sec" onPress={() =>
                            UIManager.dispatchViewManagerCommand(
                                findNodeHandle(nativeRef.current),
                                Commands.skipReverse,
                                [5000],
                            )
                        } />

                        {/* <Button title="add Note" onPress={() => addNote()} />
                <Button title="get Notes" onPress={() => getNotes()} /> */}
                    </>
                )}
                {ViewSelector === "notes" && (
                    <View style={{
                        flex: 1,
                        width: "100%",
                        padding: 10,
                        justifyContent: 'space-between',
                        backgroundColor: "gray",
                    }}>
                        <View
                            style={{
                                flexDirection: "row", backgroundColor: "white",
                                padding: 10, borderRadius: 5,
                                marginBottom: 10, alignItems: "center",
                                width: "100%", borderColor: "gray",
                                borderWidth: 1
                            }}

                        >
                            {timeStamp && <Text>{`${timeStamp} - `}</Text>}
                            <TextInput
                                placeholder="Add a note"

                                value={text}
                                onChangeText={setText}
                                onFocus={() => {
                                    timestamp();
                                    UIManager.dispatchViewManagerCommand(
                                        findNodeHandle(nativeRef.current),
                                        Commands.pause,
                                        [],
                                    );
                                }
                                }
                                onSubmitEditing={() => {
                                    addNote(timeStamp + " - " + text, videoId);
                                    setTimeStamp("");
                                    setText("");
                                    UIManager.dispatchViewManagerCommand(
                                        findNodeHandle(nativeRef.current),
                                        Commands.play,
                                        [],
                                    );
                                    getNotesList();
                                }}
                            />
                        </View>
                        <FlatList
                            data={Array.from(notesList.entries())}
                            keyExtractor={([key]) => String(key)}
                            renderItem={({ item }) => {
                                const [key, value] = item as [string, string | string[]];
                                if (key !== videoId.toString()) return null;
                                const text = Array.isArray(value) ? value.join('\n') : value;
                                return (
                                    <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>
                                        {text}
                                    </Text>
                                );
                            }}
                        />

                    </View>

                )}
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'red',
    },
});

export default CustomVideoPlayerComponent;