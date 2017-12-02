Team Members:
-Leah Perry + Kamaldeep Kaur Sekhon

To Run:
- I use vscode and from integrated terminal run node app.js
- once console says 'running at...' type control+z, then type bg and enter
- Now the api can be tested with HTTPIE
- too see all contents in browser go to localhost:8000/books

In the terminal

To perform a POST:

http POST http://localhost:8000/books title="Hamlet" author="Shakespeare" isbn="93fk" publisher="Penguin Books" published="1989" genre="fiction" copies:='{"total":2, "available":2}'



To perform a GET:
- use the title of the book

http GET http://localhost:8000/books/"Hamlet"




To push ONE field:
-ie. I want to add borrowers, or I forgot to enter a field

http POST http://localhost:8000/books/"Hamlet" borrowers:='{"name1":"Carl Logan"}'

or

http POST http://localhost:8000/books/"the old man and the sea" publisher="Oxford Publishing"




To update ONE field:
-ie. I want to update the copies field

http PATCH http://localhost:8000/books/"Hamlet" copies:='{"total":2, "available":1}'

or 

http PATCH http://localhost:8000/books/"Hamlet" genre="mystery"



To DELETE a book:
- use the _id

http DELETE http://localhost:8000/books/"5a1e53139cb9329fb9f21ca6"



To update whole doc:
-**overwrites all existing fields with whatever is in payload**
-i.e. when it makes more sense than doing a bunch of patches or pushes

http PUT http://localhost:8000/books/"Monkey Beach" title="Monkey Beach" author="Eden Robinson" publisher="Whitechapel Books" published="2005" genre="mystery" copies:='{"total":3,"available":2}' borrowers:='{"name1":"Carter Jennings"}'



To SEARCH by genre, keyword, or author:

http SEARCH http://localhost:8000/books genre="mystery"

or

http SEARCH http://localhost:8000/books author="Shakespeare"

or 

http SEARCH http://localhost:8000/books keyword="sea"


