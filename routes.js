const express = require("express");
const StudentModel = require("./models");
const app = express();

app.post("/add_user", async (request, response) => {
    const user = new StudentModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await StudentModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.get("/user_num", async (request, response)=>{
    const num = await StudentModel.count({})
    try {
        response.send(String(num));
      } catch (error) {
          console.log(error)
        response.status(500).send(error);
      }
})

module.exports = app;