import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLOR } from 'src/theme/color';
import { AppText } from '../Apptext';

type Props = {
    activeOpacity?: number;
    children?: React.ReactNode;
    loading?: Boolean;
    disabled?: boolean;
    loadingColor?: String;
    onPress: () => void;
    text?: String;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    type?: string;
};
const Button = React.memo<Props>(
    ({ loading, onPress, text, loadingColor, buttonStyle, textStyle, activeOpacity, children, disabled,type }) => {
        const colorIndicator = (loadingColor ? loadingColor : COLOR.main_color) as string;

        let btnstyle:any={color:COLOR.white};
        switch (type) {
            case "primary":
                btnstyle.backgroundColor = COLOR.bgDrawer; 
                break;
            
            case "danger":
                btnstyle.backgroundColor = COLOR.bgRedFresh; 
                break;
            case "warning":
                btnstyle.backgroundColor = COLOR.bgOrange; 
                break;
            case "info":
                btnstyle.backgroundColor = COLOR.bgBlue; 
                break;

            case "success":
                btnstyle.backgroundColor = COLOR.bgGreen;
            break;
        }
        return (
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={activeOpacity ? activeOpacity : 0.6}
                style={[styles.button, buttonStyle,btnstyle]}
                onPress={onPress}>
                {children ? children : null}
                {text ? <AppText style={[styles.textBtn, textStyle]}>{text}</AppText> : null}
                {loading ? (
                    <View style={styles.viewLoading}>
                        <ActivityIndicator color={colorIndicator} />
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    },
);

const styles = StyleSheet.create({
    viewLoading: {
        position: 'absolute',
        right: 10,
    },
    textBtn: {
        fontSize: 16,
        fontWeight: '700',
    },
    button: {
        marginBottom:8,
        marginTop:8,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLOR.main_color,
        ...Platform.select({
            ios: {
                shadowColor: COLOR.gray,
                shadowOffset: {
                    height: 3,
                    width: 0,
                },
                shadowRadius: 2,
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 0.5,
            },
        }),
    },
});

export default Button;
