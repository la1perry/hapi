
const Joi=require('joi');
const db=require('monk')('mongodb://la1perry:wmdd4935@books-shard-00-00-bqgpw.mongodb.net:27017,books-shard-00-01-bqgpw.mongodb.net:27017,books-shard-00-02-bqgpw.mongodb.net:27017/test?ssl=true&replicaSet=books-shard-0&authSource=admin')
const books=db.get('books');

const borrowSchema=Joi.object({
name1:Joi.string(),
name2:Joi.string(),
name3:Joi.string(),
name4:Joi.string(),
name5:Joi.string()
})

const copySchema= Joi.object({
    total:Joi.number(),
    available:Joi.number(),
})

const bookSchema=Joi.object({
    // _id:Joi.string(),
    isbn:Joi.string(),    
    title:Joi.string(),
    author:Joi.string(),
    published: Joi.number(),
    publisher:Joi.string(),
    genre:Joi.string(),
    copies:copySchema,
    borrowers:borrowSchema
})




module.exports=[

{
method:"GET",
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
                let data=[];

                await books.findOneAndUpdate({title:request.params.title}, {$set:
                    {
        // _id:request.payload.id,
        isbn:request.payload.isbn,
        title:request.payload.title,
        author:request.payload.author,
        published:request.payload.published,
        publisher:request.payload.publisher,
        genre:request.payload.genre,
        copies:request.payload.copies,
        borrowers:request.payload.borrowers
                    } },
                     function(err,result){
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
                       type:Joi.string()
                    }
                }
        },
            handler:async (request,reply)=>{
    await books.remove({_id:request.params.id})
       return reply().code(204);     
    }
    
        },

        // changeONEfield
        {
    method:'PATCH',
    path:'/books/{title}',
    config:{
        validate:{
            query:{
               type:Joi.string()
            }
        }
},
handler: patchCheck
    
    },



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

    },

    // push ONE new field

    {
        method:"POST",
        path:'/books/{title}',
        config:{
            validate:{
                query:{
                   type:Joi.string()
                }
            }
    },
        handler:pushCheck

    }

]


// search by genre/author/keyword
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
 await books.find().then((docs)=>{
for(let i=0;i<docs.length; i++){
   let terms=docs[i].title;
   let keyword=request.payload.keyword;
   if(terms.indexOf(keyword)>=0){
return reply(docs[i])
   }
}
}).catch((err)=>{
    if(err) throw err
})

    }
    // end keyword
}
// end queryCheck
    



// update ONE existing field

async function patchCheck(request,reply){

    // if(request.payload.id){
    //     await books.findOneAndUpdate({title:request.params.title},{$set:{"_id":request.payload.id}},(err,result)=>{
    //         return reply(result)
    //     })}
if(request.payload.title){
    await books.findOneAndUpdate({title:request.params.title},{$set:{title:request.payload.title}},(err,result)=>{
        return reply(result)
    })  }
if(request.payload.genre){
        await books.findOneAndUpdate({title:request.params.title},{$set:{genre:request.payload.genre}},(err,result)=>{
            return reply(result)
        })} 
if(request.payload.author){
     await books.findOneAndUpdate({title:request.params.title},{$set:{author:request.payload.author}},(err,result)=>{
                return reply(result)
            })  }
if(request.payload.isbn){
    await books.findOneAndUpdate({title:request.params.title},{$set:{isbn:request.payload.isbn}},(err,result)=>{
     return reply(result)
         }) }
 if(request.payload.publisher){
     await books.findOneAndUpdate({title:request.params.title},{$set:{publisher:request.payload.publisher}},(err,result)=>{
         return reply(result)
                 }) }     
if(request.payload.published){
    await books.findOneAndUpdate({title:request.params.title},{$set:{published:request.payload.published}},(err,result)=>{
    return reply(result)
     }) }
if(request.payload.copies){
 await books.findOneAndUpdate({title:request.params.title},{$set:{copies:request.payload.copies}},(err,result)=>{
 return reply(result)
  }) }

 if(request.payload.borrowers){
    await books.findOneAndUpdate({title:request.params.title},{$set:{borrowers:request.payload.borrowers}},(err,result)=>{
        return reply(result)
     }) }

}


// push one field (ie if you forgot one and don't want to rewrite everything)

async function pushCheck(request,reply){
if(request.payload.title){
    await books.findOneAndUpdate({title:request.params.title},{$addToSet:{title:request.payload.title}},(err,result)=>{
        return reply(result)
    })  }
if(request.payload.genre){
        await books.findOneAndUpdate({title:request.params.title},{$addToSet:{genre:request.payload.genre}},(err,result)=>{
            return reply(result)
        })} 
if(request.payload.author){
     await books.findOneAndUpdate({title:request.params.title},{$addToSet:{author:request.payload.author}},(err,result)=>{
                return reply(result)
            })  }
if(request.payload.isbn){
    await books.findOneAndUpdate({title:request.params.title},{$addToSet:{isbn:request.payload.isbn}},(err,result)=>{
     return reply(result)
         }) }
 if(request.payload.publisher){
     await books.findOneAndUpdate({title:request.params.title},{$addToSet:{publisher:request.payload.publisher}},(err,result)=>{
         return reply(result)
                 }) }     
if(request.payload.published){
    await books.findOneAndUpdate({title:request.params.title},{$addToSet:{published:request.payload.published}},(err,result)=>{
    return reply(result)
     }) }
if(request.payload.copies){
 await books.findOneAndUpdate({title:request.params.title},{$addToSet:{copies:request.payload.copies}},(err,result)=>{
 return reply(result)
  }) }

 if(request.payload.borrowers){
    await books.findOneAndUpdate({title:request.params.title},{$push:{borrowers:request.payload.borrowers}},(err,result)=>{
        return reply(result)
     }) }

}
