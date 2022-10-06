import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View,Text} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderBack from "src/components/HeaderBack";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";
import { CoreStackParamList } from "../router/core.navigator";
import { coreRoutes } from "../router/CoreRouter";
import { authRoutes } from "../../auth/router/AuthRouter";
import { COLOR } from "../../../theme/color";
import { AppText } from "src/components/Apptext";
import Icon from "react-native-vector-icons/Ionicons";
import { push } from "src/navigator/RootNavigation";
import { LOGOUT } from "../../auth/store/constants";
import Button from "src/components/Button";
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

interface Props
  extends StackScreenProps<CoreStackParamList, coreRoutes.Profile> {}
interface RenderButtonProps {
  name: string;
  screen?: string;
  onPress?: () => void;
}
const RenderButton = (props: RenderButtonProps) => {
  const onPress = () => {
    if (props.screen) {
      push(props.screen);
    }else if(props.onPress){
      props.onPress();
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLOR.white,
        flexDirection: "row",
        minHeight: 70,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <AppText fontWeight="bold">{props.name}</AppText>
      </View>
      <Icon name="chevron-forward" />
    </TouchableOpacity>
  );
};

const Profile = (props: Props) => {
  const dispatch = useDispatch();
  const user = useSelector<RootStateReducer>((state) => state.auth.user);
  
  const loading = useRef<RefObject>(null);
  const url = user&&user.barcode?"https://linkpos.giaiphap.xyz/account.php?ref=i"+user.barcode:"";
  
  const submit=()=>{
      Clipboard.setString(url);
    Toast.show({
      type: "success",
      text2: "Đã coppy thành công" + " 👋",
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderBack title={"Thông tin tài khoản"} />
      <View style={{
        backgroundColor: COLOR.white,
        
        minHeight: 70,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}>
          <View><Text>{"Chia sẻ với bạn bè"}</Text></View>
          <View style={{borderRadius:8,borderWidth:1,borderColor:"#cecece",paddingVertical:8,paddingHorizontal:16}}><Text>{url}</Text></View>
           <Button
             buttonStyle={styles.buttonLogin}
       
              textStyle={styles.txtLogin}
              onPress={submit}
              text={"Sao chép"}
              loadingColor={COLOR.white} 
            />
      </View>
      <RenderButton name={"Thông tin"} screen={coreRoutes.InfoProfile} />
      <RenderButton name={"Đổi mật khẩu"}  screen={"UpdatePassword"} />
      <RenderButton name={"Đăng xuất"} onPress={()=>{
        dispatch({
          type: LOGOUT,
        });
      }}  />
      <LoadingOverlay ref={loading} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  txtLogin: { fontWeight: "bold", fontSize: 14, color: COLOR.white },
  buttonLogin: {
    marginTop: 20,
    width:'90%'
  },
  txtLabel: {
    fontSize: 13,
    textAlignVertical: "center",
    marginBottom: 6,
    fontWeight: "600",
  }
});
