import {postAsync} from './config';
import { useCurrentUser } from "src/hooks/useCurrentUser";

const urls = ["https://cnd.ahlupos.com/"];

export const fetch = async(name:string="")=>{
  const user = useCurrentUser();
  if(user){
  	const url:any = urls[Math.floor(Math.random()*urls.length)];
    return postAsync(url+name,{});
  }
  return null;
};