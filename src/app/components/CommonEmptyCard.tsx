import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonCard from './common/CommonCard'
import { Spacing } from '../theme/spacing'
import PrimaryButton from './PrimaryButton/PrimaryButton'
import CommonIconWithLoder from './CommonIconWithLoder'
import { Colors } from '../theme/colors'
import { Typography } from '../theme/typography'

interface CommonEmptyCard {
    title: string;
    buttomTitle: string;
    onPress: () => void;
    icon: string;
}

const CommonEmptyCard = ({ buttomTitle, onPress, title, icon }: CommonEmptyCard) => {
    return (
        <View>
            <CommonCard>
                <View style={styles.card}>
                    <View style={{ backgroundColor: Colors.border, borderRadius: 30, padding: 15 }}>
                        <CommonIconWithLoder icon={icon} loding={false} isBackground={false} color={Colors.iconsColor} size={30} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={onPress} title={buttomTitle} />
                    </View>
                </View>
            </CommonCard>
        </View>
    )
}

export default CommonEmptyCard

const styles = StyleSheet.create({
    card: {
        padding: Spacing.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        marginVertical: Spacing.xxs,
    },
    titleText: {
        ...Typography.body1,
        fontWeight: 800,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '50%',
    }
})
