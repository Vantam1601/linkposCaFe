import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SvgUri } from "react-native-svg";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "src/components/Apptext";
import { useTranslate } from "src/hooks/useTranslate";
import { TypeItem, } from "src/helpers/constants";
import { COLOR } from "src/theme/color";
// import { dataQuestion } from "src/mocks/dataHome";

const widthS = Dimensions.get("window").width;
const widthContent = widthS - 20;

type Props = {
  data?: any;
  typeItem?: TypeItem;
  viewMore?: boolean;
  title?: string;
};
const ListQuestion = React.memo<Props>(
  ({ data, typeItem, viewMore = false, title }) => {
    const intl = useTranslate();
    const [isIndex, setIndex] = useState<number>(-1)
    const onSelect = (index: number) => {
      if (isIndex === index) {
        setIndex(-1)
      } else {
        setIndex(index)
      }
    }
    const renderItem = ({ item, index }: any) => {
      return (
        <View style={[styles.vItem, { borderColor: isIndex === index ? '' : '#dedede' }]}>
          <View style={[styles.vHeader, {
            backgroundColor: isIndex === index ? '#dedede' : COLOR.bgWhite,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: isIndex === index ? 0 : 6,
            borderBottomRightRadius: isIndex === index ? 0 : 6
          }]}>
            <View style={{ width: '90%' }}>
              <AppText style={{ marginLeft: 10, fontWeight: '500', fontSize: 14 }} numberOfLines={3}>
                {item?.title}
              </AppText>
            </View>
            <TouchableOpacity onPress={() => onSelect(index)} style={{ padding: 6 }}>
              {isIndex === index ?
                <Image
                  style={styles.imgItem}
                  resizeMode="stretch"
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/56/56889.png",
                  }}
                />
                :
                <Image
                  style={styles.imgItem}
                  resizeMode="stretch"
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1237/1237946.png",
                  }}
                />
              }
            </TouchableOpacity>
          </View>
          {isIndex === index &&
            <View style={styles.vContent}>
              <AppText fontSize={14}>
                {item?.description}
              </AppText>
            </View>
          }
        </View>
      );
    };
    return (
      <View style={[styles.container]}>
        <View style={styles.viewTitle}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <AppText style={styles.title}>
              {
                intl.formatMessage({
                  id: title,
                })
              }</AppText>
            <AppText
              fontWeight='600'
              fontSize={26}
              color={COLOR.textWhite}
            >
              {intl.formatMessage({
                id: "thường gặp",
              })}
            </AppText>
          </View>
          <Image
            style={styles.imgTitle}
            resizeMode="stretch"
            source={{
              uri: "https://img.freepik.com/free-vector/tiny-people-sitting-standing-near-giant-faq_74855-7879.jpg?size=626&ext=jpg",
            }}
          />
        </View>
        <View style={{ height: 1, borderWidth: 0.5, borderColor: COLOR.borderWhiteGray, margin: 10, }} />
        <View style={styles.vFlatlist}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={true}
          />
        </View>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  viewLeftLable: {
    backgroundColor: COLOR.main_color,
    width: 4,
    height: 16,
    marginRight: 4,
  },
  viewTitle: {
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: '#607e8b',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLOR.textWhite
  },
  container: {
    width: widthContent,
    margin: 10,
    borderRadius: 6,
    backgroundColor: COLOR.bgWhite,
    // backgroundColor: COLOR.bgWhite,
    // paddingHorizontal: 10,
  },
  vFlatlist: {
    padding: 10,
    width: widthContent,
  },
  item: {
    width: widthContent / 4,
    height: widthContent / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  vItem: {
    flex: 1,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#dedede'
  },
  vHeader: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#dedede'
  },
  imgItem: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  imgTitle: {
    width: 150,
    height: 100
  },
  vContent: {
    marginVertical: 10,
    marginHorizontal: 10,
  }
});
export default ListQuestion;
