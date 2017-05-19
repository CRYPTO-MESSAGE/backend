# Backend CryptoMessage

The backend is made with love by using sails js.

Sail js is a Node Framework RESTFul API Oriented. 

```
               .-..-.

   Sails              <|    .-..-.
   v0.12.13            |\
                      /|.\
                     / || \
                   ,'  |'  \
                .-'.-==|/_--'
                `--'-------' 
   __---___--___---___--___---___--___
 ____---___--___---___--___---___--___-__

```

#### Version 

| Version   | Feature    |
|:---------:| ----------:|
| v1.3.1    | README     |
| v1.3.0    | Discussion |
| v1.2.0    | Contact    |
| v1.0.1    | Contact    |
| v1.0.0    | Message    |

#### Installation

Tools needed:

- node;
- npm;
- a database serveur.

Clone this project with git or clone the zip project version. 

then

```
npm install
```

#### Database

We use the database engine MySQL (RDBMS). Nothing to create. Just add credentials on the database config file `/config/connections.js` and start application, the Waterline ORM made all.

#### Start

```
node_modules/sails/bin/sails.js lift
```

#### Features

1. Login;
2. Token expiration;
3. Add message;
4. Add contact;
5. Discussion.


#### URL

| URL             | Verb       |  What                    |
|:---------------:| ----------:| ------------------------:|
| /users          | POST       | Signup                   |
| /auth           | POST       | Signin                   |  
| /contact        | POST       | Add contact              |          
| /contact        | GET        | Show all contacts        |          
| /message        | POST       | Add message.             |
| /message        | GET        | Shows all messages.      |
| /message/:id    | GET        | Shows message with id    |
| /discussion     | GET        | Shows all discusion.     |
| /discussion/:id | GET        | Shows discussion with id |

#### Todo

1. Logout.

#### Team members

Daniel Gonçalves;
Benjamain Clay;
Florian Cellier.
