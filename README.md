## STEP 1: Create Project Folder

Create a folder named:

```text
crud-api
```

Open this folder in Visual Studio Code.

---

## STEP 2: Open Terminal in VS Code

Click:

```text
Terminal → New Terminal
```

---

## STEP 3: Initialize Node Project

Run:

```bash
npm init -y
```

This creates `package.json`.

---

## STEP 4: Install Required Packages

Run:

```bash
npm install express mongoose nodemon
```

## STEP 5: Create Files

Create these 2 files:

```text
server.js
User.js
```

Your folder should look like:

```text
crud-api
│
├── node_modules
├── package.json
├── server.js
└── User.js
```

---

## STEP 6: Write MongoDB Model

### File: `User.js`

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

module.exports = mongoose.model("User", userSchema);
```

---

## STEP 7: Write Main Server Code

### File: `server.js`

```javascript
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
```

---

## STEP 8: Install MongoDB

Install MongoDB Community Server.

After installation:

```text
Open Services
Start MongoDB service
```

OR simply open MongoDB Compass if installed.

---

## STEP 9: Run the Server

In terminal run:

```bash
npx nodemon server.js
```

If successful:

```text
MongoDB Connected
Server Running on Port 3000
```

---

## STEP 10: Test APIs in Postman

Install Postman.

---

# API 1 — CREATE User

### Method

```text
POST
```

### URL

```text
http://localhost:3000/addUser
```

### Body → raw → JSON

```json
{
    "name": "Sapna",
    "email": "sapna@gmail.com",
    "age": 21
}
```

Click Send

### Output

```text
User Added
```

---

# API 2 — READ Users

### Method

```text
GET
```

### URL

```text
http://localhost:3000/users
```

### Output

```json
[
  {
    "_id": "12345",
    "name": "Sapna",
    "email": "sapna@gmail.com",
    "age": 21
  }
]
```

---

# API 3 — UPDATE User

Copy `_id` from GET API response.

### Method

```text
PUT
```

### URL

```text
http://localhost:3000/updateUser/USER_ID
```

### Example

```text
http://localhost:3000/updateUser/6828d3f
```

### Body

```json
{
    "age": 22
}
```

### Output

```text
User Updated
```

---

# API 4 — DELETE User

### Method

```text
DELETE
```

### URL

```text
http://localhost:3000/deleteUser/USER_ID
```

### Output

```text
User Deleted
```
