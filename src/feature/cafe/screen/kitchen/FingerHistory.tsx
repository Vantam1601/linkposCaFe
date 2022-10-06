import { View, Text, TouchableOpacity, Image,ScrollView} from "react-native";
import React, { useEffect, useRef,useState} from "react";
import { COLOR } from "src/theme/color";
import HeaderBack from "src/components/HeaderBack";
import { AppText } from "src/components/Apptext";
import { images } from "src/assets/images";
import { cafeRoutes } from "src/feature/cafe/router/CafeRouter";
import { push } from "src/navigator/RootNavigation";
 import {site_url,postAsync} from "src/helpers/config";
import LoadingOverlay, {
  RefObject,
} from "src/feature/core/component/loadingPage/LoadingPage";

 
const FingerHistory = (props) => {

  const [data, setData] = useState(null);
  const loading = useRef<RefObject>(null);


  const init=async()=>{
      loading.current?.toggleState(true);

 
    let token = "552d64908b8114a60330c564210f019631666639663339393563353764356632373635643263333936626433633130393962313137383362323732623165376139313236353139326332623766383836852e5a9672fcc0d31b7c183b46467f791191c1e3ab74cd104fa14da5e043075f84f37af58c3397f1055948df02a7da179c0a8d52456294791ec836b3b736d7a5e56fb25cb6b50c035a18a896e043d8370db96e439c48fd2f9f9c0f58ca70c90885c5de52b4960157d835e08ad4c29ba5d05716459274f450ac1402e080dc5d9498696b50f0d8d421bc2e30f4eccad69a90b05f238a34ffc9efee696f2714cc74ee3163c9abf9b7594b4aa4dcce229d960fbd745d5039259b90b3deae571327f7f8c1de363066b8f2b5461b53c0083c57fb83aa7b0d669b758207616bd9a65399bc2367efe6688712d7d29870030820949f3eb9425411f162b240b991d82c9e68859aaae4ea819ff7600a5b3d0c385bfac60dafdf41f75196abb67eae145aec4f7fd4882698dc994b900fc57af8d1f371b81f18f8e559f78c7b1477a127c47024774d40cebd6de6684ffe323e4197a24944be6994a68f963a38792a71292c6d1203cdc8de3a852dc6e6447e473c9bb32b1d413f3af5537e10ce577abe28ef021f8623168b1d2718738e12f22603a7b7476066f2781e6b90abb8166dba2f029181a7e2a432e44bf4b8af8c5588d5760c3f86b13c7fa204fc9798994734a0c5876443be5c8cc9dc30e918f5bd31e4017252930b2d5a4bc7bde340d82d6ad62955753f6bb5358e55478337287fb3b9047c380bd479cd56d163715102190e927e1df0dd23bc7c5115f59b39fa53c71177350b9c7a8bfd611c303816dada26530e092b40575e151f0f1a38477bfda9f2a1f3ac19210532eb69a7f27e6b3932f2852e78632ccc91e085e4d1f3e946888b14d18761fbac8432b8d510d01120b2a428e940b43f0a48ed50e2ae0661f0babdb1fc732b3cdc6e4de8ff97378a972ab10bda174fd482899bb730bf02cb92cd5d9fd09224271fdd22fc84e24f0f11542a817e2d7aac584b5488bd8bbb9cf97d662b320f10b05c5bbb020a6497c20cb29a78487c6785f213795f58398f6bb95cf8ffddfe49bbef9ba4927bf9a50204cb2c774a3bf3091a58a310176a3b731dd4251111dd5af8b6d449ab72889d477d44296d8a47642b303840bc795975417b566bff815256b8d0a6fb3ec5dfcb6e0d1a11611f21e968db91d5e19c7aa0d65e4c9cbc5b019cfb865acd33d033d0085a075e81db858cffd917cd36445f8f9316932318ff8ddde67cf172a8f3308c1a7c9dca01573908187302383cd9da9b69236f9e2b069e568e273677192a6b60122d44ca541544c6089f6e16c2eb3b5ca01405ebfb0d4918634b3c54e2d04c9783eb38cce8038b99e9489c44d8b095200bda812add026c6631acc0e99a2ac1ada210debd975f58dc7e132c09f530064f05a4905f011f4e9bb94643ca73b0e55e670394f545eae6f831b436d6537be0beb64a8f4373917a817a30d7ec38d9b99bcb0af6378b4a8194414b7f4e665147c0763bf8d128fabe8e2ef1e4bb735ed4435b88aebdbb8ef0215025a5e01fedff5241b8923481e0374c0b206dbad0abd09acab57fbcbd8b9d52ab7a13b5ea1aa829abffc492b925b2aec74ef69ef705186b853ead6f2f6f7b6eb557d009dadb8ee72412296032eee126f74056a72c81da41095ad955b4";
 
      var headers = {headers:{}};
      headers.headers["auth-token"] = token;
      let res1 = await postAsync("https://access.linkpos.top/action.php?a=finger&confirm=qrcode",{},headers);
     console.log(res1.data);

      if(res1.data.token){
        
      
        setData(res1.data.token); 
      }
  
     loading.current?.toggleState(false)
  };
  useEffect(() => {
     init();

  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg }}>
      <HeaderBack title={`Lịch sử chấm công`} />
      <ScrollView style={{ flex: 1 }}>
        
      </ScrollView>
       <LoadingOverlay ref={loading} />
    </View>
  );
};

export default FingerHistory;
