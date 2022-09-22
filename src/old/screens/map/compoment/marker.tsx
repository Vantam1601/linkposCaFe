import { faArrowLeft, faShareAlt } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";  
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Text
} from "react-native";
// import { BrandText } from "src/components/Text/BrandText";
import { normalize } from "src/helpers/normalize";
import { useTranslate } from "src/hooks/useTranslate";
import { COLOR } from "src/theme/color";
import MapboxGL from '@react-native-mapbox-gl/maps';
import { AppText } from "src/components/Apptext";

type Props = {
  coordinate?: any;
  id?: any;
  color?: any;
  label?: String;
  render_item?: any;
  icon?:any,
  onPress?:any
};
const Marker = React.memo<Props>(
  ({ coordinate, id, color, label,render_item,icon,onPress}) => {
    const intl = useTranslate();
    const navigation = useNavigation();


    const [selected,SetSelected] =  React.useState<any>(false);
    icon = icon?icon:<View>
            <Text >{label}</Text>
          </View>;
    React.useEffect(() => {
         
        
    }, []);
    
    return (
      <MapboxGL.MarkerView coordinate={coordinate} id={id}>
      {selected?  (render_item?render_item():(<View style={styles.main}>
                    <AppText color={COLOR.blue} fontSize={16}>{label}</AppText>
                </View>))
          :null}
      <TouchableOpacity onPress={()=>{
        SetSelected(!selected);
        if(onPress)onPress();
      }} >
          
          {icon}
        </TouchableOpacity>

        
      </MapboxGL.MarkerView>
    );
  }
);
const styles = StyleSheet.create({
   main:{ 
     width:200,
     backgroundColor: COLOR.gray, padding: 4, borderRadius: 8, marginBottom: 4,
     position:'absolute',
     top:-30,
     left:-90
   }
});
export default Marker;
