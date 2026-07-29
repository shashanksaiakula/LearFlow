import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import LearFlow from '../../assets/svg/learnflow-icon.svg'
import Icon from '../../assets/svg/splashlogo1.svg'
import TitleComponent from '../common/TitleComponent';


type LogoSize = "small" | "medium" | "large" | "xl";

interface LogoProps {
    size?: LogoSize;
    showTitle?: boolean;
}

const logoSizes: Record<LogoSize, number> = {
    small: 40,
    medium: 60,
    large: 80,
    xl: 120,
};

const Logo = ({ size = "large", showTitle = true }: LogoProps) => {
    const logoSize = logoSizes[size]
    return (
        <View style={styles.container}>
        <View
            style={[
                styles.logoContainer,
                {
                    width: logoSize,
                    height: logoSize,
                    borderRadius: logoSize / 4,
                },
            ]}
        >
            <Icon  width={100} height={100}/>
        </View>
        {showTitle && (
                <TitleComponent/>
            )}
        </View>
    );
};

export default Logo;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: Spacing.xs,
    },

    logoContainer: {
        // backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    logoText: {
        color: Colors.white,
        fontWeight: "700",
    },

    title: {
        marginTop: Spacing.sm,
        color: Colors.textPrimary,
        ...Typography.h2,
    },
});