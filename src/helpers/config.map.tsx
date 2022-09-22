import axios from 'axios';
 
 import {PermissionsAndroid,
Linking,useWindowDimensions,Alert,Platform,ToastAndroid,
} from 'react-native';
import {GPS} from './config';
 
function calcCrow(lat1, lon1, lat2, lon2) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
   lat1 = toRad(lat1);
   lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}
export const sortGPS = async (list:any)=>{
   let pos  = await GPS();

  if(pos?.lat){


      list = list.map((v:any, i:any) => {
          v.km = calcCrow(v.lat*1,v.lng*1,pos.lat*1,pos.lng*1).toFixed(1);
          

          if(isNaN(v.km)){
              v.km =0;
          } 

          return v;
      }).sort(function(a, b) {
           
        return parseFloat(a.km) - parseFloat(b.km?b.km:100000);
      });
  }
    
 
 return list;
    
}