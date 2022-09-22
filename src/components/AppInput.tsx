import React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, ViewStyle } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { COLOR } from 'src/theme/color';

export type AppInputProps = {
    hasError?: boolean;
} & InputProps &
    Partial<typeof defaultProps>;

const defaultProps = {
    enableFocusStyle: false,
    focusStyle: {
        borderColor: COLOR.main_color,
    } as ViewStyle,
    errorStyle: {
        borderColor: COLOR.borderRed,
    } as ViewStyle,
};
export const AppInput = React.forwardRef<Input, AppInputProps>(
    ({ focusStyle, errorStyle, enableFocusStyle, hasError, ...props }, ref) => {
        const [isFocused, setFocused] = React.useState(false);

        const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocused(true);
            if (props.onFocus) {
                props.onFocus(e);
            }
        };
        const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocused(false);
            if (props.onBlur) {
                props.onBlur(e);
            }
        };
        return (
            <Input
                {...props}
                ref={ref}
                textAlignVertical={'bottom'}
                inputContainerStyle={[
                    enableFocusStyle && isFocused && focusStyle,
                    hasError && errorStyle,
                    props.inputContainerStyle,
                    {
                        alignContent: 'flex-start',
                        alignSelf: 'flex-start',
                        justifyContent: 'flex-start',
                    },
                ]}
                placeholderTextColor={COLOR.gray}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        );
    },
);

AppInput.defaultProps = defaultProps;
