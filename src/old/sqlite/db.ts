import {openDatabase} from 'react-native-sqlite-storage';

export const getDBConnection = async (name:any=null) => {
  return openDatabase({name: name?name:'database.db', location: 'default'});
};

