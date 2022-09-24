import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle, faCircle } from "nvquang-font-icon/pro-light-svg-icons";
import React, { memo, useState } from "react";

import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AppInput } from "src/components/AppInput";
import { AppText } from "src/components/Apptext";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import BottomSheet from "../BottomSheet";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

interface Props {
  icon?: string;
  title?: string | undefined;
  stylesProps?: ViewStyle;
  onChange?: any;
  bsRef?: any;
  heightProps?: any;
  data?: any;
  idProps?: number | string;
  onSearch?: any;
  enableSearch?: boolean;
  keyView?: string;
  autoBack?: boolean;
}
const DropdownButton = memo((props: Props) => {
  const {
    icon,
    title,
    stylesProps,
    onChange,
    bsRef,
    heightProps,
    data,
    idProps,
    enableSearch = false,
    keyView = "name",
    autoBack,
  } = props;
  const [isIndex, setIsIndex] = useState<number>(-1);
  const [keyword, setKeyword] = useState<any>("");

  const intl = useTranslate();

  const sheetRefPersion = React.createRef<BottomSheet>();

  const onSelect = (value: any, index: any) => {
    if (index === isIndex) {
      setIsIndex(-1);
      onChange(null);
    } else {
      setIsIndex(index);
      onChange(value);
    }
    if (autoBack) {
      sheetRefPersion?.current?.close?.();
    }
  };
  const onSearch = (text: string) => {
    setKeyword(text);

    if (props.onSearch) {
      props.onSearch(text);
    }
  };

  const renderItem = (item: any, index: any) => {
    let icon = isIndex == index ? faCheckCircle : faCircle;

    if (typeof item !== "object") {
      item = {
        id: item,
        name: item,
      };
    }

    return (
      <TouchableOpacity
        key={index}
        style={[styles.vItem]}
        onPress={() => onSelect(item, index)}
      >
        <FontAwesomeIcon
          color={COLOR.main_color}
          icon={icon}
          style={{ marginLeft: 2, marginRight: 10 }}
          size={24}
        />
        {/* <View style={[styles.vRadio, { borderColor: isIndex === index || idProps === item?.id ? COLOR.light_blue : 'gray' }]} >
          <View style={[styles.vRadioChild, { backgroundColor: isIndex === index || idProps === item?.id ? COLOR.light_blue : 'white' }]} />
        </View> */}
        <AppText
          style={[
            styles.txtItem,
            {
              fontWeight:
                isIndex === index || idProps === item?.id ? "600" : "400",
            },
          ]}
        >
          {item[keyView]}
        </AppText>
      </TouchableOpacity>
    );
  };
  const renderHeadder = () => {
    if (!enableSearch) {
      return <View />;
    }
    return (
      <View>
        <AppInput
          onChangeText={(text) => onSearch(text)}
          placeholder={intl.formatMessage({ id: "label:search" })}
          style={[styles.input]}
          inputContainerStyle={{ width: width - 20 }}
          value={keyword}
        />
      </View>
    );
  };
  return (
    <View style={[styles.vContainer, stylesProps]}>
      <TouchableOpacity
        onPress={() => sheetRefPersion?.current?.open?.()}
        style={styles.vButtonDropdown}
      >
        <AppText fontSize={13}>{title == "" ? "--Select--" : title}</AppText>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRefPersion}
        duration={300}
        height={(height * 2) / 3}
        styleProps={styles.vContainerBottom}
      >
        <View style={styles.vMain}>
          <TouchableOpacity
            onPress={() => sheetRefPersion?.current?.close?.()}
            style={styles.btnDone}
          >
            <AppText fontSize={14} fontWeight={"600"}>
              {intl.formatMessage({
                id: "label:done",
              })}
            </AppText>
          </TouchableOpacity>
          <View style={{ marginHorizontal: 30, flex: 1 }}>
            {renderHeadder()}
            <FlatList
              data={data}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={true}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  vContainer: {
    flexDirection: "row",
  },
  vButtonDropdown: {
    flex: 1,
    height: 35,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  vContainerBottom: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  vMain: {
    flex: 1,
  },
  vPicker: {
    backgroundColor: "white",
    width: "100%",
    height: 200,
  },
  btnDone: {
    margin: 10,
    alignItems: "flex-end",
    padding: 10,
  },
  vItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.borderWhiteGray,
  },
  vRadio: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vRadioChild: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
  },
  txtItem: {
    fontSize: 15,
    marginLeft: 30,
    marginVertical: 15,
  },
  input: {
    height: 40,
    paddingLeft: 0,
    paddingTop: 0,
    fontSize: 15,
    color: COLOR.black,
  },
});

export default DropdownButton;
