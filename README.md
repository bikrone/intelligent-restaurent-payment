IntelResMent
============
# Installation
## Requirement
For the database, we required MySql installed. Run ```create database respayment character set utf8 collate utf8_general_ci;``` to create the suitable database.
You need sass installed in your computer. Run ```sass -v``` to check. If you don't have it, run ```sudo gem install sass``` (remove ```sudo``` if you run in Windows).
## Setup
Clone this repo ```git clone git@github.com:bikrone/IntelResMent.git```. Run ```npm install``` to install packages and ```sails lift``` to run the server.
# API Documentation
## Basic CRUD functions
```javascript
// Get the whole list of a model like food, table, bill, etc.
GET /food/

// Get specific model with id
GET /food/:id

// Specifically, in getting bills
GET /bill/
will only get top 200 bills recently (because there may be a lot of bills)

// Insert instances to database
POST /food/
with POST data like
{
"name": "abc",
"description": "xyz",
"number": 123,
"datetime":"mm-dd-yyyy HH:MM:ss"
}

// Update instances from database
PUT /food/:id
with PUT data like
{
"name": "abc",
"description": "xyz",
"number": 123,
"datetime":"mm-dd-yyyy HH:MM:ss"
}

// Delete instances from database
DELETE /food/:id

```

## Specific functions
#####Food controller
```javascript
// Get all the food from a specific category
GET /food/getFoodFromCategory/:category
example: GET /food/getFoodFromCategory/Main Dishes

// Set category for food with specific id
POST /food/:id/setCategory/:category
example: POST /food/1/setCategory/Drinks // set food id 1 to category Drinks
```

##### Bill controller
```javascript
// Add food to bill
POST /bill/addFood
with data like
{
	"billId": x,
	"foodId": y,
	"number": z // number of food, defaults to 1
}

// Remove food from bill
POST /bill/removeFood
with data like
{
	"billId": x,
	"foodId": y,
	"number": z // number of food, defaults to 1
}

// Reset bill, clear all food in bill
POST /bill/destroyFood
with data like
{
	"billId": x
}

// Get all foods from bill
GET /bill/getFood/:billId
example: GET /bill/getFood/1 //get all food from bill 1
```

##### Table controller
```javascript
// Assign table with a bill
POST /table/:id/assignWithBill/:billId (no data)
example: POST /table/1/assignWithBill/2 // assign bill 2 to table 1

// Checkout table with specific id (only admins do this)
POST /table/:id/completePayment (no data)
example: POST/table/1/completePayment // checkout table 1
sample response:
{
	"success": true,
	"billResult": "HOA DON BAN 1\\n--- Gà chiên nước mắm2: So luong: 1 Gia: 5000VND\\n--- Gà chiên nước mắm2: So luong: 1 Gia: 50000VND\\nTong cong: 50000VND\\n"
}

// Get table status (filled in with a bill or empty) since a specific update time (table status just changed in time > that specific time)
POST /table/getUpdateSinceTime
with data like 
{
	datetime: '12/11/2014 11:11:11'
}
if no data is posted, it return status of all tables
```
##### Deal controller
```javascript
// Assign a specific food affected by a specific deal
POST /deal/:id/addFood/:foodId
example: POST /deal/1/addFood/2 // now food 2 is affected by deal 1

```

##### User controller
```javascript
// Assign a specific food affected by a specific deal
POST /deal/:id/addFood/:foodId
example: POST /deal/1/addFood/2 // now food 2 is affected by deal 1

```