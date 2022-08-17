# Lendsqr Assessment Project Implementation

This is my implementation of the test project providing a REST
API using NodeJS, ExpressJS and Knex.js.

## Install

    npm install

## Run the app

    npm start

# REST API

The REST API to the app is described below.

## Create a new user

### Request

`POST /api/users/register`

    curl -i -H 'Accept: application/json' -d "firstname=Foo&lastname=Bar&email=example@mail.com&phone=0700000000&password=1234567890&pin=0000" http://localhost:5000/api/users/register

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 60
    ETag: W/"3c-NKMSrs/De/yQEUuk3oLIH4fayfo"
    Date: Tue, 16 Aug 2022 14:52:00 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"User registerd successfully","status":"success"}

## Login a user

### Request

`POST /api/users/login`

    curl -i -H 'Accept: application/json' -d "email=chukwudeokechukwu@gmail.com&password=1234567890" http://localhost:5000/api/users/login

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 377
    ETag: W/"179-mKWRSw/HJxDY6s1PJ6oaK8qS/DQ"    
    Date: Tue, 16 Aug 2022 15:02:01 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"data":{"id":"4f77bf9b-a8ea-4836-ac57-75f5c165e305","firstname":"Okechukwu","lastname":"Chukwude","phone":"07064998326","email":"chukwudeokechukwu@gmail.com"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzdiZjliLWE4ZWEtNDgzNi1hYzU3LTc1ZjVjMTY1ZTMwNSIsImlhdCI6MTY2MDY2MjEyMSwiZXhwIjoxNjYwODM0OTIxfQ.GiTBUJsf6f0A8kIo-wNb_ZLN9YKwAP4nkhKfUxtBOA8","status":"success"}

## Create a new account

### Request

`POST /api/accounts/`

    curl -i -H 'Accept: application/json' -H 'x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzdiZjliLWE4ZWEtNDgzNi1hYzU3LTc1ZjVjMTY1ZTMwNSIsImlhdCI6MTY2MDY2MjEyMSwiZXhwIjoxNjYwODM0OTIxfQ.GiTBUJsf6f0A8kIo-wNb_ZLN9YKwAP4nkhKfUxtBOA8' -d "" http://localhost:5000/api/accounts/

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 66
    ETag: W/"42-wap0C82+d2Oem0EKdNYukN7tzQs"
    Date: Tue, 16 Aug 2022 15:24:22 GMT     
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"User Account created successfully","status":"success"}

## Fund an account

### Request

`POST /api/accounts/fund`

    curl -i -H 'Accept: application/json' -H 'x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzdiZjliLWE4ZWEtNDgzNi1hYzU3LTc1ZjVjMTY1ZTMwNSIsImlhdCI6MTY2MDY2MjEyMSwiZXhwIjoxNjYwODM0OTIxfQ.GiTBUJsf6f0A8kIo-wNb_ZLN9YKwAP4nkhKfUxtBOA8' -d "amount=5000&pin=0000" http://localhost:5000/api/accounts/fund

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 98
    ETag: W/"62-vrMJ0LvHyi9wHtdtsw69S33No8c"
    Date: Tue, 16 Aug 2022 15:32:27 GMT     
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Account funded successfully","data":{"amount":5000,"balance":5000},"status":"success"}

## Transfer to another account

### Request

`POST /api/accounts/transfer`

    curl -i -H 'Accept: application/json' -H 'x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzdiZjliLWE4ZWEtNDgzNi1hYzU3LTc1ZjVjMTY1ZTMwNSIsImlhdCI6MTY2MDY2MjEyMSwiZXhwIjoxNjYwODM0OTIxfQ.GiTBUJsf6f0A8kIo-wNb_ZLN9YKwAP4nkhKfUxtBOA8' -d "amount=1000&pin=0000&recipient=2919697482" http://localhost:5000/api/accounts/transfer

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 92
    ETag: W/"5c-d8WjlvZ2Ekywyx8+7tpdK9qgZzc"     
    Date: Tue, 16 Aug 2022 15:38:37 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Transfer successfully","data":{"amount":1000,"balance":4000},"status":"success"}

## Withdraw from an account

### Request

`POST /api/accounts/withdraw`

    curl -i -H 'Accept: application/json' -H 'x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzdiZjliLWE4ZWEtNDgzNi1hYzU3LTc1ZjVjMTY1ZTMwNSIsImlhdCI6MTY2MDY2MjEyMSwiZXhwIjoxNjYwODM0OTIxfQ.GiTBUJsf6f0A8kIo-wNb_ZLN9YKwAP4nkhKfUxtBOA8' -d "amount=1000&pin=0000" http://localhost:5000/api/accounts/withdraw

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 94
    ETag: W/"5e-UlvqC+F+2BGBwLbMPLj7FZ6c1Fw"     
    Date: Tue, 16 Aug 2022 15:41:25 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":"Withdrawal successfully","data":{"amount":1000,"balance":3000},"status":"success"}

## Check a user's account balance

### Request

`GET /api/accounts/balance`

    curl -i -H 'Accept: application/json' -H 'x-auth-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNzdiZjliLWE4ZWEtNDgzNi1hYzU3LTc1ZjVjMTY1ZTMwNSIsImlhdCI6MTY2MDY2MjEyMSwiZXhwIjoxNjYwODM0OTIxfQ.GiTBUJsf6f0A8kIo-wNb_ZLN9YKwAP4nkhKfUxtBOA8' http://localhost:5000/api/accounts/balance

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 44
    ETag: W/"2c-5K2MQMsARuZt26WuKuLqoRxhMhw"     
    Date: Tue, 16 Aug 2022 15:46:44 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"data":{"balance":3000},"status":"success"}