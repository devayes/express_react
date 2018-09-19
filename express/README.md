# Example Express API

An example Express (v4.16.3) API.

### Prerequisites

NodeJS, NPM/Yarn, MySQL, Postman

### Installing

- Import DB into MySQL
- Copy .env.example to .env
- Update MySQL connection details in .env
- Run ```$ npm install```
- Run ```$ node app.js```

Visit: http://localhost:3001/

### Endpoints

##### List Items
GET /content  
Query Parameters: page (ie: ?page=1)  
Returns: [{'title': 'Example title', ...}, {...}, {...}, {...}]

##### Display Item
GET /content/display/:id  
Returns: {'title': 'Example title', ...}

##### Add Item
POST /content/create  
Variables: title (required), description  
Returns: {'created': 1}

##### Update Item
PUT /content/update/:id  
Variables: title (required), description  
Returns: {'updated': 1}

#### Delete Item
DELETE /content/delete/:id  
Returns: {'deleted': 1}
