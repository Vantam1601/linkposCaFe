import React, { memo,useEffect,useState } from "react";
import { Dimensions, StyleSheet, View,Modal,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { renderPrice, renderTextTypeItem } from "src/helpers/constants";
import { useTranslate } from "src/hooks/useTranslate";
import { FeatureNeed } from "src/old/type/interface";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import FastImagePlaceholder from "../FastImage";
import Button from "src/components/Button";
import NetInfo from "@react-native-community/netinfo";

interface Props { 
  onRetry?: any,
  show?: boolean,
}
const NoInternetModal = memo(({show, onRetry }: Props) => {
  const intl = useTranslate();
 
  return (
   <Modal isVisible={show} transparent={true} animationInTiming={600}>
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Connection Error</Text>
          <Text style={styles.modalText}>
            Oops! Looks like your device is not connected to the Internet.
          </Text>
          <Button disabled={!show} onPress={onRetry} loadingColor={COLOR.white}
                text={intl.formatMessage({
                  id: "error:no_internet",
                })} /> 
        </View>
       </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  // ...
  modal: {
    display:'flex',
    justifyContent: 'flex-end',
    margin: 0,
    flex:1,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    height:200
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
}); 
export default NoInternetModal;
