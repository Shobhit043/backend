const mongoose = require('mongoose');
const express = require('express');

const port = 8000;
const dbName = 'db';
const urlDB = `mongodb://localhost:27017/${dbName}`;
const app = express();

// connecting to DB and collection(creating one if not present)
mongoose
    .connect(urlDB)
    .then(() => {
        console.log(`connected to ${dbName}`)
    })
    .catch((error) => {
        throw error
    });

const schema = new mongoose.Schema({
    name: String,
    email: String,
});

const users = mongoose.model('users', schema);

// middleware
app.use(express.json());


// routes
app.get('/users',async (req, res) => {
    users.find().then(
        (users) => {
            users.forEach(user => console.log(user.name, user.email));
            res.status(200).json(users)
        }
    )
    .catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

app.route('/users/:id')
.get(async (req, res) => {
    const userId = req.params.id;
    console.log(`user id = ${userId}`);
    try{
        const user = await users.findById(userId);
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    } 
})
.post((req, res) => {
    newUser = req.body;
    console.log(newUser);
    newUser.save()
        .then(() => {
        console.log("user saved");
        const newUser = new users(req.body);
        res.status(201).json({
            "message":"ok"
        });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error) 
        });
})
.patch(async (req, res) => {
    const updateDoc = {
        $set:req.body
    };
    const filter = { _id: req.params.id };
    try{
        const result = await users.updateOne(filter, updateDoc);
        res.status(200).json({'message':"ok"});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error) 
    }
})
.put(async (req, res) => {
    const updateDoc = {
        $set:req.body
    };
    const filter = { _id: req.params.id };
    try{
        const result = await users.updateOne(filter, updateDoc);
        res.status(200).json({'message':"ok"});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error) 
    }
})
.delete(async (req, res) => {
    const filter = { _id: req.params.id };
    try{
        const result = await users.deleteOne(filter);
        res.status(200).json({'message':"ok"});
    }
    catch(error){
        console.log(error);
        res.status(500).json(error) 
    }
});

app.listen(port,() => {
    console.log(`server started at http://localhost:${port}`)
});

