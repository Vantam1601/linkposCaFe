import React, { memo, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, SafeAreaView, StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Marker from "src/old/screens/map/compoment/marker";

import HeaderBack from "src/components/HeaderBack";
import { COLOR } from "src/theme/color";
import { useLocation } from "src/hooks/useConfigJson";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarkerAlt } from "nvquang-font-icon/pro-solid-svg-icons";
import { AppText } from "src/components/Apptext";
import { useNavigation } from "@react-navigation/native";
import * as Myconfig from "src/helpers/config";
import FastImagePlaceholder from "src/components/FastImage";




const MAPBOX_TOKEN = "pk.eyJ1IjoiYWhsdSIsImEiOiJja3B0ODM0aXEwMHUzMnZyM21tdnNzc2FvIn0.6dAfESP_bzUMu9t9j2dNSQ"
MapboxGL.setAccessToken(MAPBOX_TOKEN);
MapboxGL.setTelemetryEnabled(false);
 
const MapWifiScreen = memo((navigationRoute: any) => {
    const { route } = navigationRoute;
    const navigation = useNavigation()
    const params = route?.params;
    const location = useLocation();
    const { lat, lng, title } = params

    const [position, setPosition] = useState<any>(null);
    const [listMap, setListMap] = useState<any>([]);

    const CENTER_COORD = [105.518311, 9.832801];


    const showWrongLatLng = () => {
        Alert.alert("Thông báo", "Toạ độ không chính xác?", [
            { text: "Confirm", onPress: () => navigation.goBack() },
        ]);
    };
    useEffect(() => {
         //get my gps
        Myconfig.GPS().then((pos:any)=>{
            setPosition([pos.lat*1, pos.lng*1]);
        });

        if(params.fetch){
            params.fetch((res:any)=>{

                setListMap(res);
            });
        }

        // if (!lat || !lng) {
        //     showWrongLatLng()
        //     return
        // }

        // try {
        //     if (!parseFloat(lat) || !parseFloat(lng)) {
        //         showWrongLatLng()
        //     } else {
        //         const lngC = parseFloat(lng)
        //         const latC = parseFloat(lat)
        //         setPosition([lngC, latC])
        //     }

        // } catch (error) {
        //     showWrongLatLng()
        // }
    }, []);

    const abc= (item:any)=>{
        return <View style={{position: "absolute",top:-100,left:-80,zIndex:10}}>
       
        <TouchableOpacity onPress={()=>{
                alert(1);  
           }} ><FastImagePlaceholder  style={{width:150,height:95}} source={item.image} />
           <Text>abc</Text></TouchableOpacity>
        </View>;
        
    }
    const showmarkers = ()=>{
       
        return listMap.map((item:any,i:any)=>{
            var id = ""+Date.now();
            return <Marker
              coordinate={[item.lng,item.lat]}
              id={item.title}
              color="red"
              label={item.title}
              zIndex={3}
              icon={(<View><FontAwesomeIcon
                    color={item.color?item.color:COLOR.borderRed}
                    icon={faMapMarkerAlt}
                    size={30}
                /><Text>{item.title}</Text></View>)}
               
              render_item={()=>{
                  return abc(item);
              }}
            />
        });
    };
    const marker = (item:any)=>{
        let id = item.title;

        return <Marker
              coordinate={item.position}
              id={item.title}
              color={item.color}
              label={item.title}
        
              icon={(<View><FontAwesomeIcon
                    color={item.color?item.color:COLOR.borderRed}
                    icon={faMapMarkerAlt}
                    size={30}
                /><Text>{item.title}</Text></View>)} />

    };
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <HeaderBack title={title} />
            <SafeAreaView style={{ backgroundColor: COLOR.contentColor, flex: 1 }}>
                <MapboxGL.MapView style={styles.map}>
                    {position ? <MapboxGL.Camera zoomLevel={10} centerCoordinate={position ?? CENTER_COORD} /> : null}
                    {position ? marker({title:title,position:position ?? CENTER_COORD,color:COLOR.borderRed}) : null}

                    {showmarkers()}
                </MapboxGL.MapView>
            </SafeAreaView>
        </View>
    );
});
export default MapWifiScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.main_color,
    },
    map: {
        flex: 1,
        overflow: 'hidden'
    },
    dot: {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        borderRadius: 25,
    },
});
// export default class MapBoxScreen extends Component {
//   render() {
//     return (
//       <View style={styles.page}>
//         <View style={styles.container}>
//           <MapboxGL.MapView style={styles.map} />
//         </View>
//       </View>
//     );
//   }
// }
