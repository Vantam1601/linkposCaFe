import {show_money_none } from 'src/helpers/config'; 
export const MyText = {
	 show_status : (status)=>{
    switch (status) {
      case "complete":
        return "Hoàn thành";
      break;
      
      case "pending":
        return "Đang xử lý";
      break;
    }

    return status;
  },
   show_date : (date)=>{
     
    return date?date.split(" ")[0]:"";
  },
   show_money_text : (data)=>{
     if(data.type=="+" || data.type=="N")return `+${show_money_none(data.money)}`;
     if(data.type=="-" || data.type=="R")return `-${show_money_none(data.money)}`;
    return show_money_none(data.money);
  },
   slugify:function(text) {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
    const to = "aaaaaeeeeeiiiiooooouuuunc------"

    const newText = text.split('').map(
      (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

    return newText
      .toString()                     // Cast to string
      .toLowerCase()                  // Convert the string to lowercase letters
      .trim()                         // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-y-')           // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
  }
};