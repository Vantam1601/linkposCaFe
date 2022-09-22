import type { TFunctionResult } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native';
export type AppTextProps = {
  value?: string | number | null | TFunctionResult;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  fontFamily?: string;
} & TextProps;

export type EllipsizeMode = 'clip' | 'head' | 'middle' | 'tail';

const defaultProps: Partial<AppTextProps> = {
  fontSize: 14,
};

const fonts = [
  { key: 'normal', value: 'Inter-Regular' },
  { key: '400', value: 'Inter-Regular' },
  { key: '500', value: 'Inter-Medium' },
  { key: '600', value: 'Inter-SemiBold' },
  { key: '700', value: 'Inter-Bold' },
  { key: 'bold', value: 'Inter-Bold' },
];

export const AppText: React.SFC<AppTextProps> = React.memo(
  ({ children, color, value, fontFamily, fontWeight, fontSize = 14, lineHeight, ...props }) => {
    const [textFamily, setTextFamily] = useState<string>('Inter-Regular');
    useEffect(() => {
      if (fontWeight) {
        const font = fonts.find((e) => e.key === fontWeight);
        if (font) {
          setTextFamily(font.value);
        }
      }
    }, [fontWeight]);

    return (
      <Text
        {...props}
        style={StyleSheet.flatten([
          {
            fontSize,
            color,
            fontWeight: fontWeight ? fontWeight : '400',
            lineHeight: lineHeight ? lineHeight : fontSize ? fontSize + 4 : fontSize,
            fontFamily: fontFamily ? fontFamily : fontWeight ? textFamily : 'Inter-Regular',
          },
          props.style,
        ])}>
        {value ? value : children}
      </Text>
    );
  },
);

AppText.defaultProps = defaultProps;
