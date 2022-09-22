import {getDBConnection} from './db';
import {squel} from './squel';



export const demo = {
    query : (sql:string,arr:any=[])=>{
	    return new Promise((resolve, reject)=>{
	    	demo.db.transaction(function (txn:any) {
		      txn.executeSql(sql,arr,
		        function (tx:any, res:any) {
		          // console.log('item:', res.rows.length);
		          resolve(res.rows);
		        }
		      );
		    });
	    });
    },

    query_first : (sql:string,arr:any=[])=>{
	    return new Promise((resolve, reject)=>{
	    	demo.db.transaction(function (txn:any) {
		      txn.executeSql(sql,arr,
		        function (tx:any, res:any) { 
		          resolve(res.rows.length?res.rows[0]:null);
		        }
		      );
		    });
	    });
    },
    insert : (data:any)=>{
    	let value:any = [];
    	for(var i in data){
    		let item = data[i];
    		value.push(typeof item=="object"?JSON.stringify(item):item);
    	}
	    return new Promise((resolve, reject)=>{
	    	demo.db.transaction(function (txn:any) {
		      txn.executeSql("INSERT INTO demo ("+Object.keys(data).join(",")+") VALUES ("+("?".repeat(value.length))+")'",value,
		        function (tx:any, res:any) { 
		          resolve(res.rowsAffected > 0);
		        }
		      );
		    });
	    });
    },
    update : (data:any,where:any=null)=>{
    	let value:any = [];
    	let key:any = [];
    	for(var i in data){
    		let item = data[i];
    		key.push(i+"=?");
    		value.push(typeof item=="object"?JSON.stringify(item):item);
    	}

    	 
    	if(where){
    		if(typeof where!="object"){
    			where = {};
    			where["id"] = where;
    		}
    		let value1:any = [];
	    	let key1:any = [];
	    	for(var i in where){
	    		let item = where[i];
	    		key1.push(i+"=?");
	    		value.push(typeof item=="object"?JSON.stringify(item):item);
	    	}
    		where = " where "+key1.join(",");
    	}else{
    		where="";
    	}

	    return new Promise((resolve, reject)=>{
	    	demo.db.transaction(function (txn:any) {
		      txn.executeSql("UPDATE demo set "+key.join(",")+where,value,
		        function (tx:any, res:any) { 
		          resolve(res.rowsAffected > 0);
		        }
		      );
		    });
	    });
    },
	init : async () => {
		demo.db =await getDBConnection();
		const query = `CREATE TABLE IF NOT EXISTS demo(
		        id INTEGER PRIMARY KEY AUTOINCREMENT,
		        value TEXT NOT NULL
		    );`;
		demo.db.transaction(function (txn:any) {
	      txn.executeSql(query,[],
	        function (tx:any, res:any) { 
	           console.log("SQL=> ",res);
	        }
	      );
	    });
		return this;
	}

};