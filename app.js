
const Hapi=require('hapi');


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






