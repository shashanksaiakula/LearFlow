import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OutLineButton from '../common/OutLineButton'
import { Colors } from '../../theme/colors'
import { Strings } from '../../strings/String'
import { Spacing } from '../../theme/spacing'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { Input } from '../Input'
import CommonCard from '../common/CommonCard'
import { Typography } from '../../theme/typography'

interface NoteModalProps {
    showModel: boolean,
    saveBtnAction: () => void
    cancelBtnAction: () => void,
    timeStamp: string,
    note: string,
    onChangeValue: (e: string) => void,
    title: string
}

const NoteModal = ({ title, cancelBtnAction, saveBtnAction, showModel, timeStamp, note, onChangeValue }: NoteModalProps) => {
    return (
        <Modal
            visible={showModel}
            style={styles.modleStyle}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.overlay}>
                <CommonCard>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.timeStamp}>{Strings.Time_stamp} {timeStamp}</Text>
                    <Input
                        placeHolder={Strings.write_your_obs}
                        value={note}
                        onChangeText={onChangeValue}
                        height={100}
                    />
                    <View style={styles.bottomContainer}>
                        <View style={{ flex: 1 }}>
                            <OutLineButton color={Colors.secondary} onPress={cancelBtnAction} text={Strings.cancel} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <PrimaryButton onPress={saveBtnAction} title={Strings.save} />
                        </View>
                    </View>
                </CommonCard>
            </View>
        </Modal>
    )
}

export default NoteModal

const styles = StyleSheet.create({
    bottomContainer: {
        // flex:1,
        flexDirection: 'row',
        paddingHorizontal: Spacing.md
    },
    modleStyle: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        minHeight: 400,
        justifyContent: 'flex-end'
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    }, title: {
        ...Typography.h1,
        padding: Spacing.xxs

    }, timeStamp: {
        ...Typography.body1,
        color: Colors.primary,
        fontWeight: 'bold',
        padding: Spacing.xxs
    }
})