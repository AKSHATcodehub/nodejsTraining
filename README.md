# NodeJS2023
DOCUMENTATION:

// REQUIREMENT 1

// ENDPOINT: /register

// METHOD: POST 

// payload:
// {
//     "email":"jackma@gmail.com",
//     "password": "jack123",
//     "username":"jackie"
// }


// REQUIREMENT 2

// ENDPOINT: /login

// METHOD: POST 

// payload:
// {
//     "email":"jackma@gmail.com",
//     "password": "jack123",
// }

// RESPONSE: jwt token



//AFTER HERE ALL ROUTES are authenticated using x-access-token

// REQUIREMENT 3

// ENDPOINT: /create-chat

// METHOD: POST

// payload: 
// {
//     "participant_1":"jack@gmail.com",
//     "participant_2":"arpit@gmail.com"
// }


// REQUIREMENT 4

// ENDPOINT: /send-message

// METHOD: POST

// payload: 
// {
//     "to_email":"ayush@gmail.com",
//     "from_email":"arpit@gmail.com",
//     "message_content":"THIS IS NOT GOOOODDDDDDDDDDDDDD"
// }

// REQUIREMENT 5

// ENDPOINT: /rooms

// METHOD: DELETE

// queryparams: room_id:B52


// REQUIREMENT 6

// ENDPOINT: /chats

// METHOD: GET

// query params:{
// page: 1, size:5
// }




