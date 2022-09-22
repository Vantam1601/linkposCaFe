import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { faArrowLeft } from "nvquang-font-icon/pro-light-svg-icons";
import {
  faSearch,
  faSortAmountDown,
  faTimesCircle
} from "nvquang-font-icon/pro-solid-svg-icons";
import React, { useState } from "react";
import {
  Animated, Dimensions, Keyboard, Platform, StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import { BrandText } from "src/components/Text/BrandText";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { AppInput } from "../AppInput";

const { width, height } = Dimensions.get("window");

type Props = {
  value: string;
  rightPress: () => void;
  submitSearch: () => void;
  onChangeText: (value: string) => void;
};
const HeaderSearch = React.memo<Props>(
  ({ value = "", rightPress, onChangeText, submitSearch }) => {
    const intl = useTranslate();
    const [keyword, setKeyword] = useState<string>(value)
    const navigation = useNavigation();
    const goBack = () => {
      navigation.goBack();
    };
    return (
      // <View>
      <Animated.View
        style={[
          styles.topHeader,
          {
            height: normalize(48),
            ...Platform.select({
              ios: {
                shadowColor: COLOR.textGray,
                shadowOffset: {
                  height: normalize(2),
                  width: 0,
                },
                shadowRadius: normalize(2),
                shadowOpacity: normalize(0.5),
              },
              android: {
                elevation: normalize(0.5),
              },
            }),
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.viewBack}
            onPress={goBack}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              style={{ color: COLOR.white, marginRight: normalize(6) }}
            />
          </TouchableOpacity>

          <Animated.View style={styles.input}>
            <TouchableOpacity onPress={submitSearch}>
              <FontAwesomeIcon color={COLOR.gray} icon={faSearch} size={20} />
            </TouchableOpacity>
            <TextInput
              autoCapitalize="none"
              placeholder={intl.formatMessage({
                id: "input:search",
              })}
              autoFocus
              multiline={false}
              onChangeText={(val) => {
                setKeyword(val)
                onChangeText(val)
              }}
              value={keyword}
              returnKeyType="search"
              onSubmitEditing={() => {
                onChangeText(keyword);
                Keyboard.dismiss();
              }}
              style={styles.textInput}
              inputContainerStyle={{ width: 150, height: 30, }}
            />
            {value ? (
              <View>
                <TouchableOpacity
                  onPress={() => setKeyword("")}
                  activeOpacity={0.6}
                >
                  <FontAwesomeIcon
                    color={COLOR.gray}
                    icon={faTimesCircle}
                    size={14}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </Animated.View>

          {/*<TouchableOpacity
            activeOpacity={0.6}
            style={styles.viewRight}
            onPress={rightPress}
          >
            <FontAwesomeIcon
              icon={faSortAmountDown}
              size={20}
              style={{ color: COLOR.white, marginRight: normalize(6) }}
            />
          </TouchableOpacity> */}
        </View>
      </Animated.View>
      // </View>
    );
  }
);
const styles = StyleSheet.create({
  topHeader: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: COLOR.main_color,
    borderTopWidth: 0,
    // borderBottomRightRadius: 35
  },
  viewBack: {
    paddingTop: normalize(4),
    paddingBottom: normalize(4),
    borderRadius: normalize(14),
    alignItems: "center",
    paddingLeft: normalize(16),
    flexDirection: "row",
  },
  viewRight: {
    //  position: 'absolute',
    //  right: 10
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: COLOR.white,
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
  textInput: {
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    flex: 1,
  },
});
export default HeaderSearch;
