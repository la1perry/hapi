
const Joi=require('joi');
const db=require('monk')('mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin')
const books=db.get('books');

const bookSchema=Joi.object({
    isbn:Joi.string(),    
    title:Joi.string(),
    author:Joi.string(),
    datePublished: Joi.number(),
    publisher:Joi.string(),
    genre:Joi.string()
 
})
// const titleSchema=Joi.object({
//     title:Joi.string().required()
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

// find title
    {
        method:'GET',
        path:'/books/{title}',
            config:{
                validate:{
                    query:{
                        type:Joi.string()
                    }
                }
        },
        handler:async (request, reply)=>{
            let book= await books.find({title:request.params.title})
            return reply(book);
        }
    },
// create
    { 
        method:'POST',
        path:'/books',
        config:{
            validate:{
                payload:bookSchema
            }
                    },
        handler:async(request, reply)=>{
            const newBook=request.payload;
            await books.insert(newBook, (err,result)=>{
if(err)throw err;
return reply(newBook).code(201);
            })
        }
    },

// update**overwrites
    
    {
        method:'PUT',
        path:'/books/{title}',
        config:{

            handler: async(request,reply)=>{
                await books.findOneAndUpdate({title:request.params.title}, {$set:
                    {
        isbn:request.payload.isbn,
        title:request.payload.title,
        author:request.payload.author,
        published:request.payload.published,
        publisher:request.payload.publisher,
        genre:request.payload.genre
                    }
                    }, function(err,result){
                        return reply().code(204);
                    })
                },

    validate:{
        payload:bookSchema,
        query:{
            type:Joi.string()
        } }
    
            }

        },

// delete

        {
            method:'DELETE',
            path:'/books/{id}',
            config:{
                validate:{
                    query:{
                       type:Joi.number()
                    }
                }
        },
            handler:async (request,reply)=>{
    let remove=await books.remove({_id:request.params.id})
       return reply().code(204);     
    }
    
        },

        // changeonefield
    //     {
    // method:'PATCH',
    // path:'/books/{title}',
    // handler: patchCheck
    //     },

{
    method:"SEARCH",
    path:'/books',
    config:{
        validate:{
            query:{
               type:Joi.string()
            }
        }
},
    handler:queryCheck
}
]





async function queryCheck(request,reply){
    if(request.payload.author){
        let auth=await books.find({author:request.payload.author})
        if(Object.keys(auth).length !==0){
            return reply(auth)
        }
    }
    if(request.payload.genre){
        let gen=await books.find({genre:request.payload.genre})
        if(Object.keys(gen).length !==0){
            return reply(gen)
        }
    }
    if(request.payload.keyword){
        books.createIndex({"title":"text", "author":"text", "genre":"text"})
        let keyword=request.payload.keyword
    await books.find({$text:{$search: keyword}}).then((docs)=>{
          return(docs)
      })
            // if(Object.keys(keyword).length!==0){
            //     return reply(result)
            // }
        
     
    }
    }




    // in progress


// async function patchCheck(request, reply){
//     if(request.payload.author){
//  await books.findOneAndUpdate({author:request.params.author},
//     {$set:{"author.$":'request.payload.author'}},
//     {"new":true,"upsert":false,passRawResult:false, "overwrite":false, setDefaultsOnInsert:true})
//     .exec(function(err,result){
//         return reply(result);
//      })
//     }
//     if(request.payload.title){
//         await books.findOneAndUpdate({title:request.params.title},
//             {$set:{"title.$":'request.payload.author'}},
//             {"new":true,"upsert":false,passRawResult:false, "overwrite":false, setDefaultsOnInsert:true})
//             .exec(function(err,result){
//                 return reply(result);
//              })
//     }
//     if(request.payload.isbn){
//         await books.findOneAndUpdate({isbn:request.params.isbn},
//             {$set:{"isbn.$":'request.payload.author'}},
//             {"new":true,"upsert":false,passRawResult:false, "overwrite":false, setDefaultsOnInsert:true})
//             .exec(function(err,result){
//                 return reply(result);
//              })

//     }
//     if(request.payload.published){
//         await books.findOneAndUpdate({published:request.params.published},
//             {$set:{"published.$":'request.payload.author'}},
//             {"new":true,"upsert":false,passRawResult:false, "overwrite":false, setDefaultsOnInsert:true})
//             .exec(function(err,result){
//                 return reply(result);
//              })
//     }
//     if(request.payload.publisher){
//         await books.findOneAndUpdate({publisher:request.params.publisher},
//             {$set:{"publisher.$":'request.payload.author'}},
//             {"new":true,"upsert":false,passRawResult:false, "overwrite":false, setDefaultsOnInsert:true})
//             .exec(function(err,result){
//                 return reply(result);
//              })
//     }
// }

        