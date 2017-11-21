// const Mongoose=require('mongoose');
// Mongoose.connect("mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin");
// const db=Mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback(){
//     console.log('connected');
// })

// exports.db=db;
const MongoClient=require('mongodb').MongoClient;
const uri="mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin"

// MongoClient.connect(uri,function(err,db){
//     db.collection('books').dropDatabase();});
//     if(err){throw err}
// db.collection('books').insertOne({
//     isbn:"tf-458583",
//     title:"wuthering heights",
//         author:"emily bronte",
//         genre:"fiction", 
//         published:"1992",
//         publisher:"Peguin Publishing",
//         copies:2,
//         available:0
// })
// db.collection('books').deleteOne({_id:"5a0e533c5941827f897ddf82"})
// console.log('done');
// });







// const firebase=require('firebase');

// firebase.initializeApp({
//     apiKey: "AIzaSyDQlgQ51SRGdlAuL_SKZlKUsmsB__I6hrE",
//       authDomain: "fir-test-a2a78.firebaseapp.com",
//       databaseURL: "https://fir-test-a2a78.firebaseio.com",
//       projectId: "fir-test-a2a78",
//       storageBucket: "fir-test-a2a78.appspot.com",
//       messagingSenderId: "46278298725"
//   });

//   let db=firebase.database().ref('Books');
  
  
  
//   const thisone={
    
//    title:"call of the wild",
//     author:"jack london",
//     genre:"fiction",
//     published:"1972",
//     publisher:"Macmillan Printing",
//     copies:5,
//     available:2
//   }
  
//   function addNew(id, newBook){
//     db.child(id).set(newBook);
//   }
  
  
// addNew(1,thisone);
  
  
//   db.once('value')
//   .then(function(snapshot){
//     console.log(snapshot.val());
//   })