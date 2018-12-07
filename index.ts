const express = require('express');
const dotenv = require('dotenv');
import * as bodyParser from 'body-parser';

const routes = require('./routes').default;

console.log('PORT:');
console.log(process.env.PORT);
const app = express()
    .set('port', 5000)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(routes);


app.listen(app.get('port'), () => {
   console.log(`App is listening at http://localhost:${app.get('port')}`); 
});
// import Axios, * as axios from 'axios';

// console.log('This is a test');

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjM5NjE5ZGZlLTI0NTQtYTYwNS0yYjMyLWU4MGY3ZDg5M2M1NSIsImFwcHMiOlt7Im5hbWUiOiJXb3JrbGlmZSBNb2JpbGUifV0sImlhdCI6MTU0MTA5NjIyOCwiZXhwIjoxNTQxMDk5ODI4fQ.ifALlzwVrgD63qJUbwuXOsHf5YmuERdSESDo8lk9bDw';


// Get Request
// axios.default.get('http://jsonplaceholder.typicode.com/users/1')
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// POST Request
// axios.default.post(
//     'http://localhost:3000/auth/v1/token/validate',
//     { authorization: `bearer ${token}`},
//     { timeout: 1000, 
//       headers: { 'Content-type': 'application/json'}
//     }
// ).then((response) => {
//     console.log(`Is it OK? ${response.data.isOk}`);
//     console.log(response.data);
//     console.log(response.data.decoded);
// }).catch((error) => {
//     console.log(error);
// })
