import React, { useState, useContext } from "react";
import { Input as RNEInput, ThemeContext } from "react-native-elements";
import { COLOR } from "src/theme/color";

const Input = (props: any) => {
  const [focused, setFocused] = useState(false);
  const [showPasswordText, togglePasswordText] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onFocus = () => {
    setFocused(true);
    props.onFocus();
  };

  const onBlur = () => {
    setFocused(false);
    props.onBlur();
  };

  const primaryColor = COLOR.main_color;

  const inputContainerStyle = {
    ...props.inputContainerStyle,
    ...(focused ? { borderColor: primaryColor } : {}),
    ...(focused || props.autoBorder
      ? { borderBottomWidth: 1 }
      : { borderBottomWidth: 0 }),
  };

  const labelStyle = {
    ...props.labelStyle,
    ...(focused ? { color: primaryColor } : {}),
  };

  const leftIcon = {
    ...props.leftIcon,
    ...(focused ? { color: primaryColor } : {}),
  };

  let rightIcon = {
    ...props.rightIcon,
    ...(focused ? { color: primaryColor } : {}),
  };

  if (props.password) {
    let passwordToggler = {
      type: "ionicon",
      name: showPasswordText ? "ios-eye" : "ios-eye-off",
      onPress: () => togglePasswordText(!showPasswordText),
      containerStyle: { marginRight: 10 },
      underlayColor: "transparent",
    };

    rightIcon = {
      ...rightIcon,
      ...passwordToggler,
    };
  }

  return (
    <RNEInput
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      inputContainerStyle={inputContainerStyle}
      labelStyle={labelStyle}
    />
  );
};

Input.defaultProps = {
  onFocus: () => null,
  onBlur: () => null,
  leftIcon: {},
  rightIcon: {},
  labelStyle: {},
  password: false,
};

export default Input;
