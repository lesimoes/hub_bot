
### Init with example

1- Install mongodb</br>
2- Execute: `npm i`</br>

### How to run

1- Start mongodb server </br>
2- Run `npm run watch`


### Routes

*** Generate a token ***
</br>
url: `http://localhost:3000/adm/auth`</br>
body: `{
	"alias":"pluri",
	"password":"tendi123"
}`

*** List all Intents ***
</br>
url: `http://localhost:3000/api/pluri/intent/list`

Need a Bearer Authorization.

*** Create new Intent ***
</br>
url: `http://localhost:3000/api/pluri/intent/new_intent`
body:`{
    "active": true,
    "sentences": ["Paraaa com isso", "Eu pego café pra vc"],
    "responses": ["Tendiiiiiiiiiiii"],
    "title": "Fourth"
  }`




:tada:
