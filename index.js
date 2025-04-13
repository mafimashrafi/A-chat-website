const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path'); 
const Chat = require('./models/chat'); 

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

main()
    .then((res) =>{
        // console.log(res);
        console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

//index routes
app.get('/chats', async(req, res) => {
    let chats = await Chat.find({});
    //console.log(chats);
    res.render("index.ejs", {chats});
});

//new message routes
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
});

//create message
app.post("/chats", async (req, res) => {
    let {to, message, from} = req.body;
    let newChat = new Chat({
        from: from,
        message: message,
        to: to,
        created_at: new Date(),
    });
    newChat.save().then((res) =>{
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//update route
app.post("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let newMessage =  req.body;
    console.log(newMessage);
    let updatedChat = await Chat.findByIdAndUpdate(id, {message: newMessage.message}, 
        {new: true, runValidators: true}).then((res) => {
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
    console.log(updatedChat);
    res.redirect("/chats");
});

//delete route
app.post("/chats/:id/delete", async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

app.get('/', (req, res) => {
    res.send("Server running");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
