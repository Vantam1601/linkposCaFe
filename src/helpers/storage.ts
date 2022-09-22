// import AsyncStorageFactory from "@react-native-community/async-storage";
// import LegacyStorage from "@react-native-community/async-storage-backend-legacy";

// const legacyStorage = new LegacyStorage();

// export type StorageModel = {
//   language: string;
//   NAVIGATION_STATE: string;
//   checkPermission: string;
//   w_t: string;
//   last_login: string;
//   token_device:string;
//   initialParams:any;
//   launcher:any;
//   callback:any;
// };

// export const storage = AsyncStorageFactory.create<StorageModel>(legacyStorage, {
//   errorHandler: true,
//   logger: false,
// });

// type SaveTokenInput = {
//   w_t: string;
//   last_login: string;
// };
// export const saveToken = async (data: SaveTokenInput) => {
//   return Promise.all([
//     storage.set("w_t", data.w_t),
//     storage.set("last_login", data.last_login),
//   ]);
// };

// export const removeToken = async () => {
//   return storage.removeMultiple(["w_t", "last_login"]);
// };

// export const my_storage = {
//      fetch: async(name:string)=>{
//         let chat_current = await storage.get(name);
//         try{
//           chat_current = JSON.parse(chat_current);
//           return chat_current;
//        }catch(e){}
//        return null;
//      },
//      save : async (name:string,data:any)=>{
//           let chat_current:any = mine.fetch(name);
//           if(!chat_current){
//              chat_current ={};
//           }
//           if(typeof data=="function"){
//             data = data();
//             chat_current[data.id] = data.data;
//           }else{
//             chat_current[data.id] = data;
//           }
//           // console.log(chat_current);
//         return storage.set(name,JSON.stringify(chat_current));
//      },
//      delete : async (name:string,data:any)=>{
//           let chat_current:any = mine.fetch(name);
//           if(!chat_current){
//              chat_current ={};
//           }
//           if(typeof data=="function"){
//             chat_current = data(chat_current);
//           }else{
//             delete chat_current[data];
//           }
//           // console.log(chat_current);
//         return storage.set(name,JSON.stringify(chat_current));
//      }
//   };
