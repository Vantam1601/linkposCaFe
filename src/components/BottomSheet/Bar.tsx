import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { normalize } from 'src/helpers/normalize';

export const Bar: React.SFC = React.memo(() => {
    return (
        <View style={BarStyles.barContainer}>
            <View style={BarStyles.bar} />
        </View>
    );
});

const BarStyles = StyleSheet.create<{
    barContainer: ViewStyle;
    bar: ViewStyle;
}>({
    barContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        width: normalize(40),
        height: normalize(4),
        borderRadius: normalize(2),
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#C8CCD7',
    },
});
