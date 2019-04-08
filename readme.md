
### Init with example

1- Install mongodb</br>
2- Execute: `npm i`</br>
3- Execute: `node index.js`</br>

### How to run

Execute: `nodemon app.js`


### Routes

*** Generate a token *** </br>
url: `http://localhost:3000/adm/auth`</br>
body: `{
	"alias":"pluri",
	"password":"tendi123"
}`

*** List all Intents *** </br>
url: `http://localhost:3000/api/pluri/intent/list`

Need a Bearer Authorization.

*** Create new Intent ***
url: `http://localhost:3000/api/pluri/intent/new_intent`
body:`{
    "active": true,
    "sentences": ["Paraaa com isso", "Eu pego café pra vc"],
    "responses": ["Tendiiiiiiiiiiii"],
    "title": "Fourth"
  }`

Need a Bearer Authorization.


:tada:
