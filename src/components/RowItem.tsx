import React, { memo } from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { AppText } from 'src/components/Apptext';
import { useTranslate } from 'src/hooks/useTranslate';

interface RowItemProps {
  txtLeft?: string;
  txtRight?: string;
  stylesTxtLeft?: TextStyle,
  stylesTxtRight?: TextStyle,
  styleProps?: ViewStyle,
  isMoment?: boolean
}
const RowItem = memo((props: RowItemProps) => {
  const intl = useTranslate();
  const { txtLeft, txtRight, stylesTxtLeft, stylesTxtRight, styleProps, isMoment } = props;
  return (
    <View style={[styles.container, styleProps]}>
      {txtLeft && <AppText style={stylesTxtLeft}>
        {intl.formatMessage({
          id: txtLeft,
        })}
      </AppText>}
      {txtRight && <AppText style={stylesTxtRight} numberOfLines={3}>
        {
          isMoment ? txtRight
            :
            intl.formatMessage({
              id: txtRight,
            })}
      </AppText>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default RowItem;
