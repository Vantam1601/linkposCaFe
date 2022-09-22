import { faArrowLeft } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,Modal,
  Platform,ScrollView,KeyboardAvoidingView,SafeAreaView
} from "react-native";
// import { BrandText } from "src/components/Text/BrandText";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import { AppText } from "../Apptext";
import {
  faBars,
  faBell,
  faQrcode,
  faRing,
  faSearch,
} from "nvquang-font-icon/pro-solid-svg-icons";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import { AppRoutes } from "src/navigator/app-routes";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import * as MyConfig from 'src/helpers/config';
import HeaderBack from 'src/components/HeaderBack';

/*
const [CountrySelectShow, SetCountrySelectShow] = useState<boolean>(true);
const showCountry = {
  show : ()=>{
    SetCountrySelectShow(true);
  },
  hide : ()=>{
    SetCountrySelectShow(false);
  }
};

<CountrySelect show={CountrySelectShow} goBack={()=>{
         showCountry.hide();
      }} />
*/

const CountryModal = React.memo<any>(
  (props: any) => {
    const intl = useTranslate();
    const user = useCurrentUser();
    const [data, setData] = useState<any>([]);
 
    const navigation = useNavigation();
     useEffect(() => {
        fetch('https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/countries.json') //eslint-disable-line
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
     },[]);

    return (
      <Modal
      animationType={'slide'}
      visible={props.show}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.container}>
       <SafeAreaView />
        <HeaderBack
          goBackFuntion={props?.goBack}
          title={"label:register"}
        />
        <ScrollView  style={{ backgroundColor: COLOR.contentColor, flex: 1 }}  keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
          }}>
          <KeyboardAvoidingView behavior="padding" style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '10%',
          }} > 

        <View style={{ flexDirection: "row" }}>
            <AppText>dwer</AppText>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
         </View>
      </Modal> 
    );
  }
);
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLOR.main_color
  },
});
export default CountryModal;
