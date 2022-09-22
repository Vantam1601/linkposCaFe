import React, { memo,useEffect,useState} from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle, Image,TouchableOpacity,Linking,Dimensions,Platform,FlatList } from 'react-native';
import { COLOR } from 'src/theme/color';
import {picker} from "src/helpers/config";
import Button from 'src/components/Button'; 
import { useTranslate } from 'src/hooks/useTranslate';
import { AppText } from 'src/components/Apptext';

 const { width, height } = Dimensions.get("window");
const UploadMutil = memo((props: any) => {
  const intl = useTranslate();
  
  const {gallery,title,callback,options} = props;
  const [data, setData] = useState<any>(gallery?gallery:[]);
  const deleteGallery =(item:any)=>{
    let items =[...data];
    // console.log(item,items);

    items.map((res:any,i:number)=>{
      if(res.uri == item.uri){
        items.splice(i,1);
      }
    });
    

    send_callback(items);

    setData(items);

  }; 
  const send_callback = (a)=>{

      if(callback){
        callback(a);
      }
  }
  const chooseFile = (type: string="") => {
    let a= {maxFiles:4};
     if(options){
       for(let i in options){
         a[i] = options[i];
       }
    } 
    picker.multiple(a).then((images:any)=>{

      

      send_callback(images);
      setData(images);
    });

    // picker.single().then((res) => {
    //    switch (type) {
    //       case 'nimage1':
    //         setNimage1(res)
    //         break;
    //       case 'nimage2':
    //         setNimage2(res)
    //         break;
    //       case 'nimage3':
    //         setNimage3(res)
    //         break;
    //       case 'nimage4':
    //         setNimage4(res)
    //         break;
    //       default:
    //         return;
    //     }
    // });
  }
 
  return   <View style={[styles.vCard]}>
            <FlatList
                data={data}
                keyExtractor={ (item, index) => index.toString() }
                contentContainerStyle={{paddingHorizontal: 15,}}
                numColumns={2}
                renderItem={({item}) => (
                        <View style={[styles.vImageChild, {margin: 4 }]}>
                        <TouchableOpacity style={{zIndex:2,position:'absolute',right:0,top:-5}} onPress={() => deleteGallery(item)}>
                          <AppText color={COLOR.main_color} fontSize={20}>X</AppText>
                        </TouchableOpacity>
                          <Image
                            style={styles.imgItemChild}
                            resizeMode="stretch"
                            source={{
                              uri: item.uri
                            }}
                          />
                          <AppText
                            style={{ marginTop: 5, textAlign: 'left' }}
                            fontWeight='600'
                            fontSize={14}>
                            {intl.formatMessage({
                              id: 'history:image',
                            })}
                          </AppText>
                        </View>
                    )
                }
            />
            <View style={[styles.vCard, { alignItems: 'center', justifyContent: 'center' }]}>
              <Button  buttonStyle={[styles.buttonLogin,{backgroundColor:COLOR.bgBlue}]}
                onPress={chooseFile}
                text={intl.formatMessage({
                  id: title?title:"label:upload_images",
                })}
                loadingColor={COLOR.white}
                textStyle={styles.txtLogin}
              />
            </View>

          </View>

});

const styles = StyleSheet.create({
  vCard: {
    ...Platform.select({
      ios: {
        shadowColor: COLOR.shadow,
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
    marginVertical: 12,
    marginBottom: 0,
    borderRadius: 6,
  },
  vImageChild: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 6,
    borderColor: COLOR.borderWhiteGray,
    justifyContent: 'center',
    alignItems:'center'
  },
  imgItem: {
    width: 320,
    height: 150
  },
  imgItemChild: {
    width: 135,
    height: 70
  },
  buttonLogin: {
    width: width - 60,
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLOR.white
  },
});

export default UploadMutil;
