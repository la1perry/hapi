
// const db=require('./try').db;
const Joi=require('joi');

const db=require('monk')('mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin')
const books=db.get('books');

// const bookSchema=Joi.object({
//     title:Joi.string(),
//     author:Joi.string(),
//     isbn:Joi.string(),
//     datePublished: Joi.date(),
//     publisher:Joi.string(),
    
// })

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
        path:'/books',
        handler:async(request, reply)=>{
            const newBook=request.payload;
            await books.insert(newBook, (err,result)=>{
if(err)throw err;
return reply(newBook).code(201);

            })
        }
    },
// update
    {
        // overwrites!!!!!
method:'PUT',
path:'/books/{title}',
handler: async (request,reply)=>{
    // const book=request.params.title
    const bookAdd=request.payload;
    await books.update({title:request.params.title},{bookAdd}, function(err,result){
        return reply().code(204);
    })
}}
//     await books.update({title:request.params.title},{bookAdd},function(err,result){
// if(err)throw err;
// return reply(books).code(201);
//     })
// let book= await books.findOneAndUpdate({title:request.params.title},
//     {isbn:request.payload.isbn,title:request.payload.title,author:request.payload.author}
//      .then((updatedDoc)=>{
// return reply(books).code(201);
    //  })
// )}
    ,

    // updateone
    {
        method:'PATCH',
        path:'/books/{title}',
        handler: async(request,reply)=>{
            const updateBook={$set:{}};
            updateBook.$set[`${request.params.info}`]=request.params.infoValue;
            await books.update({title:request.params.title}, {updateBook}, function(err,result){
                return reply().code(204);
            });
        }
    },


// push
    // {

        
    // },

    // delete
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:async (request,reply)=>{
let remove=await books.remove({_id:request.params.id})
   return reply().code(204);     
}

    }


]