import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { formatTime } from '../../utils/timeUtils'
import NotesCard from '../../components/NotesCard'
import { useDispatch, useSelector } from 'react-redux'
import { addNote } from '../../redux/slices/noteSlice'
import { RootState } from '../../redux/store'

type NotesPros = {
    currentTime: number
    playResumeAction : (isPLay : boolean) => void
    onClick : (timeStamp : number) => void
    courseId : number
    lessonId : number
}

interface NotesModel {
    id: string
    timestamp: string
    note: string,
}

const NotesView = ({ currentTime, playResumeAction, onClick, courseId, lessonId }: NotesPros) => {

    const dispach = useDispatch()
    const [input, setInput] = useState("")
    const [note, setNote] = useState<NotesModel[]>([])
    const [focus, setOnFocus] = useState(false)
    // const {records} = useSelector((state : RootState) => state.note)
    // const notes = records.map((item) => )
     const notesList = useSelector((state: RootState) => state.note.records[courseId]?.[lessonId] ?? []);
    function handleSaveNote() {
        const newNote = {
            id: Date.now().toString(),
            timestamp: formatTime(currentTime),
            note: input
        }
        setNote((perviosuNote) => [...perviosuNote, newNote])
        setInput("")
        setOnFocus(false)
        playResumeAction(false)
        dispach(addNote({
            courseId : courseId,
            lessonId : lessonId,
            note : newNote
        }))
    }
    function handelOnFouus(){
        setOnFocus(true)
        playResumeAction(true)
    }

    return (
        <View style={styles.constainer}>
            <FlatList
                data={notesList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NotesCard text={item.note} timeStamp={item.timestamp} onClick={onClick} />}

            />
            <View style={styles.inputFiledStyle}>
                {focus && <Text>{formatTime(currentTime)}</Text>}
                <TextInput value={input} onChangeText={setInput} placeholder={focus ?  "" : 'Please enter Note'}
                onFocus={handelOnFouus}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        handleSaveNote()
                    }} />
            </View>
        </View>
    )
}

export default NotesView

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    inputFiledStyle: {
        borderWidth: 2,
        borderColor: "#aeb4e7",
        marginHorizontal: 8,
        borderRadius: 6,
        marginVertical: 10,
        flexDirection : "row",
        // justifyContent: 'center',
        alignItems : 'center'
    }
})