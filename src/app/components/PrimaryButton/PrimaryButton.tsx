import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";

type ButtonVariant = "primary" | "secondary" | "danger";

interface PrimaryButtonProps {
    title: string;
    loadingTitle?: string;
    onPress: () => void;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
}

const buttonBackgroundColors: Record<ButtonVariant, string> = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    danger: Colors.danger,
};

const PrimaryButton = ({
    title,
    loadingTitle,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
}: PrimaryButtonProps) => {

    const buttonTitle =
        loading && loadingTitle
            ? loadingTitle
            : title;

    const isDisabled = loading || disabled;

    const backgroundColor = isDisabled
        ? Colors.disabled
        : buttonBackgroundColors[variant];

    return (
        <Pressable
            disabled={isDisabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor,
                    opacity: pressed ? 0.85 : 1,
                    transform: [
                        {
                            scale: pressed ? 0.98 : 1,
                        },
                    ],
                },
            ]}
        >
            <View style={styles.content}>
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color={Colors.white}
                    />
                )}

                <Text
                    numberOfLines={1}
                    style={styles.title}
                >
                    {buttonTitle}
                </Text>
            </View>
        </Pressable>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        height: 52,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: Spacing.sm,
    },

    title: {
        ...Typography.button,
        color: Colors.white,
    },
});