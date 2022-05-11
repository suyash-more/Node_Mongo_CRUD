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

app.put("/:id", async (req, res) => {
  try {

      const { name, age, marks } = req.body

      let student = await StudentModel.findByIdAndUpdate(req.params.id, { name, age, marks }, { new: true })

      if (!student) {
          return res.status(400).json({ msg: "student does not exists" })
      }

      return res.json({"upadated student" : student})

  } catch (error) {
      console.log(error)
      return res.status(400).send("Error Occured")
  }
})




app.delete("/:id", async (req, res) => {
  try {
      let student = await StudentModel.findByIdAndDelete(req.params.id)

      if (!student) {
          return res.status(400).json({ msg: "student does not exists" })
      }

      return res.json({"deleted student" : student})

  } catch (error) {
      console.log(error)
      return res.status(400).send("Error Occured")
  }
})


module.exports = app;