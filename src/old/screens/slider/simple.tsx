import { faArrowLeft, faShareAlt } from "nvquang-font-icon/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { HomeData, Slide } from "src/old/type/interface";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { normalize } from "src/helpers/normalize";
import { COLOR } from "src/theme/color";
import FastImagePlaceholder from "src/components/FastImage";

const DEVICE_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");

type Props = { 
  slide?: any; 
  onClick?:any;
  onChange?:any;
  resizeMode?:any;
  height?:any;
};
const CarouselSimple = React.memo<Props>(({ slide,onChange,onClick,resizeMode,height}) => {
    
    const navigation = useNavigation();
     const [widthVal] = React.useState(new Animated.Value(150));
    const [heightVal] = React.useState(new Animated.Value(40));
    const [activeSlide, setActiveSlide] = useState<number>(0);
 
    const pagination = () => {
      return (
        <View style={styles.viewDot}>
          <Pagination
            dotsLength={(slide?.length as number) ?? 0}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLOR.main_color,
            }}
            inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLOR.gray,
            }}
            inactiveDotOpacity={0.6}
            inactiveDotScale={1}
          />
        </View>
      );
    }; 
    const _renderItem = (item: Slide, index: number) => {
    return (
      <TouchableOpacity
        onPress={()=>{
          if(onClick){
            onClick(activeSlide);
          }
        }}
        activeOpacity={0.6}
        style={{flex:1,justifyContent: "center", alignItems: "center",borderRadius:16 }}
      >
        <FastImagePlaceholder
          source={item.image}
          resizeMode={resizeMode?resizeMode:"contain"}
          style={styles.img}
          needProgress
        />
      </TouchableOpacity>
    );
  };
    return (
      <View style={{position:'relative',overflow:'hidden'}}>
      <Carousel
        autoplay={true}
        loop={true}
        containerCustomStyle={{height: height?height:160,width:'100%'}}
        data={slide as Slide[]}
        renderItem={({ item, index }) => _renderItem(item, index)}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH}
        onSnapToItem={(slideIndex) =>{onChange(slideIndex);setActiveSlide(slideIndex);}}
      />
      {pagination()}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  img: {
    width: DEVICE_WIDTH ,
    height: height?height:160,
    borderRadius: 12,
    overflow: "hidden",

  },
  viewSlider: {
    height:  height?height:160,
    width: "100%",
  },
  viewDot: {
    position: "absolute",
    bottom:0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
export default CarouselSimple;
