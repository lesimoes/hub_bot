
### Init with example

1- Install mongodb</br>
2- Execute: `npm i`</br>

### How to run

1- Start mongodb server </br>
2- Run `npm run watch`


### Routes


HOST: https://multbot.herokuapp.com

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
url: `http://localhost:3000/api/pluri/intent/create`
body:`{
    "active": true,
    "sentences": ["Paraaa com isso", "Eu pego café pra vc"],
    "responses": ["Tendiiiiiiiiiiii"],
    "title": "Fourth"
  }`



*** Create new chat_id ***
</br>
method `GET`
url: `http://localhost:3000/api/pluri/chat/create`


*** Create new message on chat_id ***
</br>
method `POST`
url: `http://localhost:3000/api/pluri/chat/sendMsg/{chatId}`
body:`{
	"message": "my message",
	"role": "client"
}`

*** get Queue status online/offline ***
</br>
method `GET`
url: `http://localhost:3000/api/pluri/chat/getQueue/{queue}`

:tada:
