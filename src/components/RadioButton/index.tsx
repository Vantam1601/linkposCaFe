import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";


interface RadioProps {
  icon?: string;
  title?: string;
  stylesProps?: any,
  onPress?: any,
  gender?: string,
  type?: any,
  titleRight?: string
}
const RadioButton = memo((props: RadioProps) => {
  const intl = useTranslate();
  const { title, stylesProps, onPress, type, titleRight } = props;
  return (
    <View style={styles.container}>
      <AppText style={styles.txtLabel}>
        {intl.formatMessage({
          id: title,
        })}
      </AppText>
      <TouchableOpacity style={[styles.viewButton, { borderColor: stylesProps }]} onPress={() => onPress(type)}>
        <View style={[styles.viewColorSelect, { backgroundColor: stylesProps != 'gray' ? stylesProps : COLOR.white }]} />
      </TouchableOpacity>
      {
        titleRight ?
          <AppText style={styles.txtLabelRight}>
            {intl.formatMessage({
              id: titleRight,
            })}
          </AppText>
          : null
      }
    </View>
  )
});

const styles = StyleSheet.create({
  container: {
    // width: 70,
    marginRight: 15,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginTop: 5,
  },
  txtLabelRight: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginTop: 5,
    marginLeft: 10,
  },
  txtGender: {
    fontFamily: 'Inter-Regular'
  },
  viewButton: {
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    borderWidth: 1,
    borderColor: COLOR.light_blue,
    marginLeft: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewColorSelect: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: COLOR.light_blue,
  }
});

export default RadioButton;
