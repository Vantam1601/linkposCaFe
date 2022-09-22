import axios from 'axios';

export const random_user = () => {
 let items= [
      { _id: 21,name:"unknown",avatar:"https://dautu.xyz/wp-content/uploads/users/1/avatar"},
      { _id: 4,name:"Khanh",avatar:"https://i.pinimg.com/474x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"},
      { _id: 5,name:"Mai",avatar:"https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-c%E1%BA%B7p-%C4%91%E1%BA%B9p-ng%E1%BA%A7u-n%E1%BB%AF.jpg"},
      { _id: 6,name:"Meo",avatar:"https://thuthuatnhanh.com/wp-content/uploads/2021/02/Anh-avatar-bua-cute-dep-390x390.jpg"},
      { _id: 3,name:"hotgirl",avatar:"https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"},
      { _id: 7,name:"Tai",avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNEvWNZfK2mSthjJLXvFcTQEmadsin584WXg&usqp=CAU"},
    ];
    return items[Math.floor(Math.random()*items.length)];
};

export const users =  (num)=>{
  num = num?num:20; 
  return  new Promise(async(resolve, reject)=>{

    let res = await axios.get("https://randomuser.me/api/?&results="+num); 
    res.data.results.map(function(v,i){
        res.data.results[i] = {
           id:Date.now()+i,
           avatar : v.picture.thumbnail,
           title : v.name.first +" "+ v.name.last,
           address : v.location.street.number +" "+ v.location.street.name+", "+v.location.city+", "+v.location.state+", "+v.location.country,
           created_date : (new Date(v.dob.date)).toJSON().split("T")[0]
        };
        res.data.results[i].info = JSON.stringify(res.data.results[i]);
    });

    resolve(res.data.results);
  });
};
export const all= function(num){
  num = num?num:40; 
  return  new Promise(function(resolve, reject){

    var items = Array.apply(null, Array(num)).map((v, i) => {
      return {
        id: i,
        title : "Name "+ i,
        src: 'https://unsplash.it/400/400?image=' + (i + 1)
      };
    });
    resolve(items);
  });
};
 
export const messages_chat = [
        {
            id: "6a14f26cc7e52f82b36d61da8429125b",
            phone: '+905303001965',
            fullName: 'Room 1647708764173',
            avatar: 'https://cdn-icons-png.flaticon.com/128/2394/2394669.png',
            notification: 0,
            read: false,
            message: {
                text: `nice 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 1,
            phone: '+905303001965',
            fullName: 'Tayfun Erbilen',
            avatar: 'https://pbs.twimg.com/profile_images/1469715048436277258/141ZXcHO_400x400.jpg',
            notification: 0,
            read: true,
            message: {
                text: `haha ne güzel 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 2,
            phone: '+905303001965',
            fullName: 'Mehmet Seven',
            avatar: 'https://pbs.twimg.com/profile_images/1065385568643805186/ui541U1O_400x400.jpg',
            notification: 3,
            me: true,
            message: {
                text: 'Kral müsait misin sana bir şey soracağım',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 3,
            phone: '+905303001965',
            fullName: 'Gökhan Kandemir',
            avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFjWy_2_wMdFw/profile-displayphoto-shrink_800_800/0/1588775326389?e=1645660800&v=beta&t=oEhhOlUzN4zdHRF3oFa19aFmw6_-LXJxW1rrgg1Lx98',
            notification: 15,
            message: {
                text: 'Gardaşım bugün saat 5 te toplantı unutma canını yerim xd',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 4,
            phone: '+905303001965',
            fullName: 'Tayfun Erbilen',
            avatar: 'https://pbs.twimg.com/profile_images/1469715048436277258/141ZXcHO_400x400.jpg',
            notification: 0,
            read: true,
            message: {
                text: `haha ne güzel 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 5,
            phone: '+905303001965',
            fullName: 'Mehmet Seven',
            avatar: 'https://pbs.twimg.com/profile_images/1065385568643805186/ui541U1O_400x400.jpg',
            notification: 3,
            me: true,
            message: {
                text: 'Kral müsait misin sana bir şey soracağım',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 6,
            phone: '+905303001965',
            fullName: 'Gökhan Kandemir',
            avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFjWy_2_wMdFw/profile-displayphoto-shrink_800_800/0/1588775326389?e=1645660800&v=beta&t=oEhhOlUzN4zdHRF3oFa19aFmw6_-LXJxW1rrgg1Lx98',
            notification: 15,
            message: {
                text: 'Gardaşım bugün saat 5 te toplantı unutma canını yerim xd',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 7,
            phone: '+905303001965',
            fullName: 'Tayfun Erbilen',
            avatar: 'https://pbs.twimg.com/profile_images/1469715048436277258/141ZXcHO_400x400.jpg',
            notification: 0,
            read: true,
            message: {
                text: `haha ne güzel 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 8,
            phone: '+905303001965',
            fullName: 'Mehmet Seven',
            avatar: 'https://pbs.twimg.com/profile_images/1065385568643805186/ui541U1O_400x400.jpg',
            notification: 3,
            me: true,
            message: {
                text: 'Kral müsait misin sana bir şey soracağım',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 9,
            phone: '+905303001965',
            fullName: 'Gökhan Kandemir',
            avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFjWy_2_wMdFw/profile-displayphoto-shrink_800_800/0/1588775326389?e=1645660800&v=beta&t=oEhhOlUzN4zdHRF3oFa19aFmw6_-LXJxW1rrgg1Lx98',
            notification: 15,
            message: {
                text: 'Gardaşım bugün saat 5 te toplantı unutma canını yerim xd',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 10,
            phone: '+905303001965',
            fullName: 'Tayfun Erbilen',
            avatar: 'https://pbs.twimg.com/profile_images/1469715048436277258/141ZXcHO_400x400.jpg',
            notification: 0,
            read: true,
            message: {
                text: `haha ne güzel 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 11,
            phone: '+905303001965',
            fullName: 'Mehmet Seven',
            avatar: 'https://pbs.twimg.com/profile_images/1065385568643805186/ui541U1O_400x400.jpg',
            notification: 3,
            me: true,
            message: {
                text: 'Kral müsait misin sana bir şey soracağım',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 12,
            phone: '+905303001965',
            fullName: 'Gökhan Kandemir',
            avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFjWy_2_wMdFw/profile-displayphoto-shrink_800_800/0/1588775326389?e=1645660800&v=beta&t=oEhhOlUzN4zdHRF3oFa19aFmw6_-LXJxW1rrgg1Lx98',
            notification: 15,
            message: {
                text: 'Gardaşım bugün saat 5 te toplantı unutma canını yerim xd',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 13,
            phone: '+905303001965',
            fullName: 'Tayfun Erbilen',
            avatar: 'https://pbs.twimg.com/profile_images/1469715048436277258/141ZXcHO_400x400.jpg',
            notification: 0,
            read: true,
            message: {
                text: `haha ne güzel 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 14,
            phone: '+905303001965',
            fullName: 'Mehmet Seven',
            avatar: 'https://pbs.twimg.com/profile_images/1065385568643805186/ui541U1O_400x400.jpg',
            notification: 3,
            me: true,
            message: {
                text: 'Kral müsait misin sana bir şey soracağım',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 15,
            phone: '+905303001965',
            fullName: 'Gökhan Kandemir',
            avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFjWy_2_wMdFw/profile-displayphoto-shrink_800_800/0/1588775326389?e=1645660800&v=beta&t=oEhhOlUzN4zdHRF3oFa19aFmw6_-LXJxW1rrgg1Lx98',
            notification: 15,
            message: {
                text: 'Gardaşım bugün saat 5 te toplantı unutma canını yerim xd',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 16,
            phone: '+905303001965',
            fullName: 'Tayfun Erbilen',
            avatar: 'https://pbs.twimg.com/profile_images/1469715048436277258/141ZXcHO_400x400.jpg',
            notification: 0,
            read: true,
            message: {
                text: `haha ne güzel 😃`,
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 17,
            phone: '+905303001965',
            fullName: 'Mehmet Seven',
            avatar: 'https://pbs.twimg.com/profile_images/1065385568643805186/ui541U1O_400x400.jpg',
            notification: 3,
            me: true,
            message: {
                text: 'Kral müsait misin sana bir şey soracağım',
                date: '2021-12-24 12:14:23'
            }
        },
        {
            id: 18,
            phone: '+905303001965',
            fullName: 'Gökhan Kandemir',
            avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQFjWy_2_wMdFw/profile-displayphoto-shrink_800_800/0/1588775326389?e=1645660800&v=beta&t=oEhhOlUzN4zdHRF3oFa19aFmw6_-LXJxW1rrgg1Lx98',
            notification: 15,
            message: {
                text: 'Gardaşım bugün saat 5 te toplantı unutma canını yerim xd',
                date: '2021-12-24 12:14:23'
            }
        }
    ]