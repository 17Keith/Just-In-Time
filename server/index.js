const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserModel = require("./models/Users")
const cors = require('cors')

app.use(express.json());

mongoose.connect("mongodb+srv://kayomega7:Keith2023@cluster0.jyk0xdv.mongodb.net/just-in-time?retryWrites=true&w=majority");

app.get('/getUsers', async (req, res) => {
  try {
    const users = await UserModel.find().exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  try {
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});