
// const firebase=require('firebase');

// firebase.initializeApp({
//     apiKey: "AIzaSyDQlgQ51SRGdlAuL_SKZlKUsmsB__I6hrE",
//       authDomain: "fir-test-a2a78.firebaseapp.com",
//       databaseURL: "https://fir-test-a2a78.firebaseio.com",
//       projectId: "fir-test-a2a78",
//       storageBucket: "fir-test-a2a78.appspot.com",
//       messagingSenderId: "46278298725"
//   });

//   let books=firebase.database().ref('Books');

//   books.once('value')
//   .then(function(snapshot){
//     console.log(snapshot.val());
//   })
// function show(){
//       books.once('value')
//   .then(function(snapshot){
//     console.log(snapshot.val());
//   })
// }


// const Mongoos=require('mongoose');
// Mongoos.connect("mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin");
// const db=Mongoose.connection;

// const db=require('./try').db;

const db=require('monk')('mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin')
const books=db.get('books');

module.exports=[
    // list all
    {
        method:'GET',
        path:'/books',
        handler: async(request, reply)=>{
            let allBooks=await books.find()
return reply (allBooks);
        }
    },
// find id
    {
        method:'GET',
        path:'/books/{title}',
        handler:async (request, reply)=>{
            let book= await books.find({title:request.params.title})
            return reply(book);
        }

    },
// create
    { 
        method:'POST',
        path:'/books/',
        handler:async(request, reply)=>{
            let newBook= await books.insert({
                isbn:request.payload.isbn,
                title:request.payload.book,
                author:request.payload.author})
                return reply(books).code(201);
        }
    },
// update
    {
method:'PUT',
path:'/books/{title}',
handler: async (request,reply)=>{
let book= await books.findOneAndUpdate({title:request.payload.title},
    {isbn:request.payload.isbn,title:request.payload.title,author:request.payload.author}
     .then((updatedDoc)=>{
return reply(books).code(201);
     })
)}
    },
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:(request,reply)=>{

        }
    }

]