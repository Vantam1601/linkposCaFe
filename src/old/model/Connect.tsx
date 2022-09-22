import Realm from "realm";

export const database= (func:any)=>{ 
   //https://ichi.pro/vi/bat-dau-voi-realm-for-react-native-212611396888408
}
// Declare Schema
class BookSchema extends Realm.Object {}
BookSchema.schema = {
    name: 'Book',
    properties: {
        title: 'string',
        pages:  'int',
        edition: 'int?'
    }
};

// Create realm
let realm = new Realm({schema: [BookSchema], schemaVersion: 1});

// Export the realm
export default realm;

let getAllBooks = () => {
    return realm.objects('Book');
}

export {
  getAllBooks
}