import { faArrowLeft,faChevronLeft, faShareAlt } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";


type Props = {
  left?: any;
  center?: any;
  right?: any;
};
const ItemRow = React.memo<Props>(
  ({ left, center,right}) => {
    
    
    return (
  
        <View style={{ flexDirection: "row"}}>
          <View  style={{ flex: 1, }} >
            {left?left:null}
          </View>
          <View style={{ flex: 3, justifyContent: "center", alignItems: "center", }} >
             {center?center:null}
          </View>
          <View style={{flex:1,alignItems: "center",justifyContent: 'center'}}>
             {right?right:null}
          </View>
          
        </View>  
    );
  }
);
const styles = StyleSheet.create({
  
});
export default ItemRow;
