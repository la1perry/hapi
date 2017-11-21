// const Hapi=require('hapi');
// const server=new Hapi.Server();
// server.connection({port:8000});
// server.register(require('vision'), (err)=>{
//     if(err){console.log('could not load vision')}
// });

// 'use strict';
const Hapi=require('hapi');
// var Vision=require('vision');
const Path =require('path');
// const Inert=require('inert');
const db=require('./try').db;


const server= new Hapi.Server();

server.connection({
    host:'localhost',
    port:8000
})
server.route(require('./routes'))

server.start((err)=>{
    if(err) {throw err};
    console.log('running at', server.info.uri);
})






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

