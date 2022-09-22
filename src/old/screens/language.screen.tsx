import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import i18next from 'i18next';
import { faCheckSquare, faSquare } from 'nvquang-font-icon/pro-solid-svg-icons';
import React, { memo, useState } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from 'src/components/Apptext';
import HeaderBack from 'src/components/HeaderBack';
import { storage } from 'src/helpers/storage';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';

const { width } = Dimensions.get("window");


interface RadioProps {
  icon?: any;
  title?: string;
  stylesProps?: any,
  onPress?: any,
  gender?: string,
  titleRight?: string,
  color?: string,
  lang: string
}
export const CheckBox = memo((props: RadioProps) => {
  const { } = props
  const intl = useTranslate();
  const { title, stylesProps, onPress, lang, titleRight, icon, color } = props;
  return (
    <View style={{ width: 100, flexDirection: 'row', alignItems: 'flex-end'}}>
      <TouchableOpacity onPress={() => onPress(lang)} style={{ width: 20, height: 20, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderColor: COLOR.main_color, marginRight: 10, borderRadius: 2 }}>
        <FontAwesomeIcon
          color={color}
          icon={icon}
          size={21}
        />
      </TouchableOpacity>
      <AppText style={styles.txtLabel}>
        {intl.formatMessage({
          id: title,
        })}
      </AppText>
    </View>
  )
})
const LanguageScreen = memo(() => {
  const [language, setLanguage] = useState<string>( i18next.language);
  const intl = useTranslate();

  const onSelectLanguage = (type: any) => {
    setLanguage(type);
    i18next.changeLanguage(type)
    storage.set("language", type)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"label:languaGender"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <View style={styles.vTextTitle}>
            <AppText
              fontSize={14}>
              {intl.formatMessage({
                id: 'label:select_language',
              })}
            </AppText>
          </View>
          <View style={[styles.vCard, { justifyContent: 'space-between', paddingHorizontal: 40 }]}>
            <CheckBox icon={language === 'en' ? faCheckSquare : faSquare} title={"label:eng_lish"} lang="en" onPress={()=> onSelectLanguage('en')} color={language === 'en' ? COLOR.main_color : 'white'} />
            <CheckBox icon={language === 'vi' ? faCheckSquare : faSquare} title={"label:viet_nam"} lang="vi" onPress={()=> onSelectLanguage('vi')} color={language === 'vi' ? COLOR.main_color : 'white'} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.main_color,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1
  },
  viewImage: {
    marginTop: 30,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  txtConfirm: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonLogin: {
    width: width - 30,
    marginTop: 10,
  },
  txtVerify: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
  vCard: {
    flexDirection: 'row',
    marginHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
        shadowOffset: {
          height: 1,
          width: 0,
        },
        shadowRadius: 2,
        shadowOpacity: 0.22,
      },
      android: {
        elevation: 10,
      },
    }),
    paddingVertical: 12,
    backgroundColor: COLOR.bgWhite,
    marginVertical: 12,
    marginBottom: 0,
    borderRadius: 6,
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
  },
  txtLabelRight: {
    fontSize: 13,
    textAlignVertical: "center",
    fontWeight: "600",
    marginTop: 5,
    marginLeft: 10,
  },
  vTextTitle: {
    marginLeft: 15,
    borderLeftWidth: 5,
    borderLeftColor: COLOR.bgDark_blue,
    paddingHorizontal: 7,
    marginTop: 10,
  },
});

export default LanguageScreen;
