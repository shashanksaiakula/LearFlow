import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'

type OutParamsProps = {
    text: string
    color: string,
    onPress: () => void
    icon?: React.ReactNode
}

const OutLineButton = ({ color = Colors.primary, icon, onPress, text }: OutParamsProps) => {
    return (
        <Pressable onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                {
                    borderColor: color,
                    opacity: pressed ? 0.85 : 1,
                    transform: [
                        {
                            scale: pressed ? .98 : 1
                        }
                    ]
                }
            ]}
        >
            <View style={styles.buttonRaper}>
                {icon}
                <Text style={{color:color}}>{text}</Text>
            </View>
        </Pressable>
    )
}

export default OutLineButton

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 2,
        margin: 5,
        borderRadius: 10
    },
    buttonRaper:{
        flexDirection: 'row',
        width: "100%",
        justifyContent:'center',
        alignItems:'center'
    }

})