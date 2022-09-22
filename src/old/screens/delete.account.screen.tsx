import React, { memo,useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View,Dimensions  } from 'react-native';
import { AppText } from 'src/components/Apptext';
import Button from 'src/components/Button';
import FastImagePlaceholder from 'src/components/FastImage';
import HeaderBack from 'src/components/HeaderBack';
import { useTranslate } from 'src/hooks/useTranslate';
import { COLOR } from 'src/theme/color';

const { width } = Dimensions.get("window");

const DeleteAccountScreen = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useTranslate();
  const onConfirm = () => { }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
        <HeaderBack
          title={"label:delete_account"}
        />
        <ScrollView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
          <View style={styles.viewImage}>
            <FastImagePlaceholder
              needProgress
              source={'https://image.freepik.com/free-vector/permanently-deleting-documents-from-laptop-trash-data-burning-flat-illustration_124715-431.jpg'}
              resizeMode="stretch"
              style={styles.image}
            />
            <AppText
              fontSize={14}
              style={styles.txtConfirm}
            >
              {intl.formatMessage({
                id: 'translation:confirm_delete_account',
              })}
            </AppText>
            <Button
              buttonStyle={styles.buttonLogin}
              loading={loading}
              onPress={onConfirm}
              text={intl.formatMessage({
                id: "label:delete_account",
              })}
              textStyle={styles.txtVerify}
            />
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
  }
});

export default DeleteAccountScreen;
