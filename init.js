const mongoose = require('mongoose');
const Chat = require('./models/chat'); 

main()
    .then((res) =>{
        // console.log(res);
        console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let chat1 = [
    {
        from: "John",
        to: "Doe", 
        message: "Hello",
        created_at: new Date(),
    },
    {
        from: "Doe",
        to: "John",     
        message: "Hi",
        created_at: new Date(),
    },
    {
        from: "John",
        to: "Doe", 
        message: "How are you?",
        created_at: new Date(),
    },
    {
        from: "Doe",
        to: "John",     
        message: "I am fine. How about you?",
        created_at: new Date(),
    },
];

Chat.insertMany(chat1);