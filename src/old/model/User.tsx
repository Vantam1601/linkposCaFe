import {db,BaseModel} from "src/old/model/Connect";


export const User = Object.assign(Object.create(BaseModel), {
	table :"user",
	_columns:{
		user_id:"NTEGER PRIMARY KEY AUTOINCREMENT",
		user_name:"TEXT",
		user_contact:"TEXT",
		user_address:"TEXT"
	},
    primaryKey :"id_user", 
	init: async function (name:any, surname:any, skill:any) {
		// BaseModel.init.call(this, name, surname);
		// this.skill = skill;

		await this.createTable();
	},
	createTable:async function(){
		var me = this;

        this.existTable().then(function(ok:any,txn:any){

          if(!ok){
          	let list=[];
            for(let i in me._columns){
            	list.push("'"+i+"' "+me._columns[i]);
            }
            let sql=  'CREATE TABLE IF NOT EXISTS '+me.table+'('+list.join(",")+')';
           
            me.queries.push(sql);
            txn.executeSql(sql, [] );
          }
        });
	},
 //    dropTable:async function(){},
    alterTable:async function(){},
	learn: function () {
	    console.log('Learning all about ' + this.skill);
	}
	// …
}); 
 