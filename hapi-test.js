// 'use strict';
// const Hapi=require("hapi");
// const server = new Hapi.Server();
// server.connection({
//     host:'localhost',
//     port:8000
// });
// server.route({
//     method:"GET",
//     path:'/hello',
//     handler: function(request, reply){
//         return reply ('hello world');
//     }
// })

// server.start((err)=>{
//     if(err) throw (err)
//     console.log ('serer runnin at', server.info.uri)
// });


// views


// server.register(require('vision'), (err)=>{
//     if(err) {throw err}

//     server.views({
//         engines:{
//             ejs:require('ejs')
//         },
//         path:Path.join(__dirname,'templates')
//     })

// server.route({
//     method:'GET',
// path:'/',
// handler: (request, reply)=>{
// return reply.view('index.html');
// }
// })


    // routes and server.start go here

// })



// server.register([
// {register:require('vision')},
// {register:require('inert')},
// ]),function(err){
//     if(err) throw err;
// }

// server.register(Vision, (err) => {
    
//         if (err) 
//             throw err;
// });
    
//         server.views({
//             engines: { html: require('handlebars') },
//             path:Path.join( __dirname, '/templates')
//         });
    
// server.views({
//     engines:{
//         html:require('handlebars')
//     },
//     path: Path.join(__dirname, 'templates')
// });

// const Mongoose=require('mongoose');
// Mongoose.connect("mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin");
// const db=Mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback(){
//     console.log('connected');
// })

// exports.db=db;


// const MongoClient=require('mongodb').MongoClient;
// const uri="mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin"

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





