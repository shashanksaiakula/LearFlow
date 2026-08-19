import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatTime } from '../../utils/timeUtils'
import NotesCard from '../../components/NotesCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteNotes, getNotes, postNotes, updateNotes } from '../../redux/thunk/notesThunk'
import { Spacing } from '../../theme/spacing'
import { Strings } from '../../strings/String'
import { Typography } from '../../theme/typography'
import { Colors } from '../../theme/colors'
import NoteModal from '../../components/notebottommodal/NoteModal'

type NotesPros = {
    currentTime: number
    playResumeAction: (isPLay: boolean) => void
    onClick: (timeStamp: number) => void
    courseId: string
    lessonId: string
}

const NotesView = ({ currentTime, playResumeAction, onClick, courseId, lessonId }: NotesPros) => {

    const dispach = useDispatch<AppDispatch>()
    const [isShowModal, setIsShowModal] = useState(false)
    const [addNote, setAddNote] = useState("")
    const [editNotId, setEditNoteId] = useState("")
    const { loding, error, note, noteslist, lodingDelete, lodingEdit } = useSelector((state: RootState) => state.note)
    const [focus, setOnFocus] = useState(false)
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    useEffect(() => {
        dispach(getNotes({ courseCode: courseId, lessonCode: lessonId }))
    }, [dispach, courseId, lessonId])

    async function handleSaveNote() {
        setActiveCardId(null)
        // setInput("")y
        setOnFocus(false)
        playResumeAction(false)
        setIsShowModal(!isShowModal)
        if (editNotId) {
            await dispach(updateNotes({ note: addNote, id: editNotId })).unwrap()
        } else {
            await dispach(postNotes({ courseCode: courseId, lessonCode: lessonId, note: addNote, timestamp: currentTime })).unwrap()
        }
        dispach(getNotes({ courseCode: courseId, lessonCode: lessonId }))
    }

    function handelCancel() {
        setAddNote("")
        setIsShowModal(false)
        playResumeAction(false)
        setActiveCardId(null)
    }

    function handleDeleteClick(id: string) {
        dispach(deleteNotes({ id: id }))
        setActiveCardId(null)
         playResumeAction(false)
        dispach(getNotes({ courseCode: courseId, lessonCode: lessonId }))
    }
    function handelEditClick(note: string, id: string, selectedText? : string) {
        setAddNote(note)
        setIsShowModal(!isShowModal)
        playResumeAction(true)
        setEditNoteId(id)
    }

    function handelAddNote() {
        setIsShowModal(!isShowModal)
        playResumeAction(true)
    }

    return (
        <View style={styles.constainer}>
            <View style={styles.topContainer}>
                <Text style={styles.myNoteStyle}>{Strings.my_notes}</Text>
                <Pressable onPress={() => handelAddNote()}>
                    <Text style={styles.addNoteStyle}>+ {Strings.add_notes}</Text>
                </Pressable>
            </View>
            <FlatList
                data={noteslist}
                keyExtractor={(item, index) => `${item.id}+${index}`}
                renderItem={({ item, index }) =>
                    <NotesCard text={item.note} timeStamp={item.timestamp.toString()} onClick={onClick}
                        isSelected={activeCardId === index}
                        onSelectActive={() => {
                            playResumeAction(activeCardId === null ? true : false)
                            setActiveCardId(activeCardId === index ? null : index);
                        }}
                        deleteClickHandel={() => handleDeleteClick(item._id ?? "")}
                        editClickHandel={() => handelEditClick(item.note, item._id)}
                        isLodingDelete={lodingDelete}
                        isLodingEdit={lodingEdit}
                        date={item.createdAt ?? ""}
                        selectedText={item.selectedText}
                    />}

            />
            {/* <View style={styles.inputFiledStyle}>
                {focus && <Text>{formatTime(currentTime)}</Text>}
                <TextInput value={input} onChangeText={setInput} placeholder={focus ? "" : 'Please enter Note'}
                    onFocus={handelOnFouus}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        handleSaveNote()
                    }} />
            </View> */}
            {isShowModal &&
                <NoteModal
                    cancelBtnAction={() => { handelCancel() }}
                    saveBtnAction={() => handleSaveNote()}
                    showModel={isShowModal}
                    timeStamp={formatTime(currentTime)}
                    note={addNote}
                    onChangeValue={setAddNote}
                    title={Strings.note}
                />
            }
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
        flexDirection: "row",
        // justifyContent: 'center',
        alignItems: 'center'
    }, topContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xs,
        margin: Spacing.xxs
    },
    myNoteStyle: {
        ...Typography.h2,
        fontWeight: 'bold'
    },
    addNoteStyle: {
        ...Typography.body1,
        fontWeight: 'bold',
        color: Colors.primary
    }
})