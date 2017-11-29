
const Joi=require('joi');
const db=require('monk')('mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin')
const books=db.get('books');
const querystring=require('querystring')

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
{method:"GET",
path:"/",
handler:(request,reply)=>{
return reply("A Simple Book Lending API, /books")
}

},

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
            type:Joi.alternatives().try(Joi.string(),Joi.number())
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
    await books.remove({_id:request.params.id})
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


// works for genre  and author, still working on keyword

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
   books.createIndex('title').then((err,result)=>{
     let query=request.payload.keyword
   books.find({$text:{$search:'request.payload.keyword'}},(err,result)=>{
          return reply(result)
      })
   }).catch((err)=>{
       throw err
   })
       
    }
}
    


// books.createIndex({title:'text'})
// await books.find({$text:{$search:request.payload.keyword}}, (err,result)=>{
//     return reply(result)
// })
// 
    // let query=request.payload.keyword;

    // books.find({$where:"title.indexOf('query')>=0"}, (err,result)=>{
    //     return reply(result)
    // }
    
    // )

// await books.find({$text:{$search:'request.payload.keyword'}}, (err,result)=>{
//     return reply(result)
// })

    //     let query={
    //         title:{$regex:request.payload.keyword}
    //     }
    //     await books.find({query}, function(err,result){
    //         return reply(result)
    //     })
        
    // }


// trying to get querystring working, but when I use in httpie it throws error saying my params aren't allowed

    // async function queryCheck1(request,reply){
    //     let qs=querystring.parse(req.url.split('?')[1])
    //     let value=Object.values(qs)[0]
    //     let key=Object.keys(qs)[0]
        
    //     if(key.indexOf('author')>0){
    //         let auth=await books.find({"key":"value"})
    //             return reply(auth)
            
    //     }
    //     if(key.indexOf('gen')>0){
    //         let genre=await books.find({"key":"value"})
    //             return reply(genre)
            
    //     }
    //     if(key.indexOf('keyword')>0){
    //         let word=await books.find({title:/term/})
    //             return reply(word)
            
    //     }
    // }

// async function queryCheck(request,reply){
//     let keyword=request.params.keyword
   
// let genre=await books.find({genre:"/keyword/"}) 
// return reply(genre)

// let auth= await books.find({author:"/keyword/"})
// return reply(auth)

// let title=await books.find({title:"/keyword/"})  
// return reply(title)

// }





// handler: async(request,reply)=>{
//     books.createIndex({title:"text", author:"text", genre:"text"})
//     let keyword=request.params.keyword           
//          let searchres=   books.find({$text:{$search:request.params.keyword}})
//             return reply(searchres)
         // .then((docs)=>{
            //     return reply(docs)
                
            // }).catch((e)=>{
            //     throw err
            // })
// }


//    if(request.payload.keyword){
//        let searchTerm=request.payload.keyword
//       let searchRes= await books.find({"title":/searchTerm/},(err,result)=>{
//            res+=result;
//            return reply(searchRes)
//        })
   
//    }

    // return new Promise((resolve, reject)=>{
    // if(err)throw err;
    // resolve()
    // })

//      .exec(function(err,result){
//          if(err)throw err
// return reply(result)
//         })
//         .catch((e)=>{
//             return(e)
//         })
 
        
    // let SearchRes=await books.find({$text:{$search: keyword}}).then((docs)=>{
    //       return(docs)
    //   })
    //   .catch((err)=>{
    //       throw err
    //   })
     
   

 


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
