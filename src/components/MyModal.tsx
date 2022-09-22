import React, { memo,useEffect,useState} from 'react';
import { Button,Text,SafeAreaView, StyleSheet, View, ViewStyle, Image,TouchableOpacity,Linking,Dimensions,Platform,FlatList } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from 'src/hooks/useTranslate';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faEye,faBrowser,faStar } from "nvquang-font-icon/pro-solid-svg-icons";
import * as Config from 'src/helpers/config';
import FastImagePlaceholder from "src/components/FastImage"; 
import { COLOR } from "src/theme/color";
import BoxItem from "src/components/Item/Box";
import CellItem from "src/components/Item/Cell";
import { AppRoutes } from "src/navigator/app-routes";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

 const { width, height } = Dimensions.get("window");
const MyModal = memo((props: any) => {
  const { show,callback,render} = props;

  const navigation = useNavigation();
  const intl = useTranslate();
  const [isModalVisible, setModalVisible] = useState(show);

  const toggleModal = () => {
    if(isModalVisible){
       if(callback){
         callback();
       }
    }
    setModalVisible(!isModalVisible);
  }; 

 
  return  <Modal isVisible={isModalVisible}>

        <View style={{ flex: 1 }}>
          <Button title="Show modal" onPress={toggleModal} />
          {render?render():null}
        </View>
      </Modal>

});

const styles = StyleSheet.create({
  vCard: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
    marginVertical: 10,
    marginBottom: 0,
    borderRadius: 6,
  },
  vImage: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgItem: {
    marginTop: 100,
    width: 300,
    height: 200
  },
});

export default MyModal;
