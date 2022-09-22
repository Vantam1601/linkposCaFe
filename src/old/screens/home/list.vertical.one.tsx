import { useNavigation } from "@react-navigation/native";
import React from "react";
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
import {
    checkUrlSvg,
    sortListItemByDate,
    TypeItem,
} from "src/helpers/constants";
import { COLOR } from "src/theme/color";
import { AppRoutes } from "src/navigator/app-routes";
const widthS = Dimensions.get("window").width;
const widthContent = widthS - 20;
type Props = {
    data: any;
    typeItem: TypeItem;
    viewMore: boolean;
    title: string;
};
const ListVerticalOne = React.memo<Props>(
    ({ data, typeItem, viewMore = false, title }) => {
        const intl = useTranslate();
        const navigation = useNavigation();
        const onNavigater = (item: any) => {
            navigation.navigate(AppRoutes.DETAIL_HOME, { value: item })
        }
        const renderItem = ({ item, index }: any) => {
            return <CellItem item={item} index={index} onPress={onNavigater}/>;
            // return <BoxItem item={item} index={index} onPress={onNavigater} />;
        };
        return (
            <View style={[styles.container]}>
                <View style={styles.viewTitle}>
                    <View style={styles.viewLeftLable}></View>
                    <AppText style={styles.title}>{title}</AppText>
                </View>
                <FlatList
                    data={sortListItemByDate(data)}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={true}
                />
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
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
    },
    container: {
        width: widthContent,
        margin: 10,
        borderRadius: 6,
    },
    item: {
        width: widthContent / 4,
        height: widthContent / 4,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default ListVerticalOne;
