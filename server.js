const express = require("express");
const mongoose = require("mongoose");
const User = require("./User");

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// 1. CREATE API
app.post("/addUser", async (req, res) => {

    const user = new User(req.body);

    await user.save();

    res.send("User Added");
});


// 2. READ API
app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);
});


// 3. UPDATE API
app.put("/updateUser/:id", async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, req.body);

    res.send("User Updated");
});


// 4. DELETE API
app.delete("/deleteUser/:id", async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.send("User Deleted");
});


// Server
app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});