const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let courses = [
  { id: 1, name: "C1" },
  { id: 2, name: "C2" },
  { id: 3, name: "C3" },
  { id: 1, name: "C1" },
  { id: 2, name: "C2" },
  { id: 3, name: "C3" },
  { id: 1, name: "C1" },
  { id: 2, name: "C2" },
  { id: 3, name: "C3" },
];

app.get("/", function(req, res) {
  res.send("home");
});

app.get("/api/courses", function(req, res) {
  res.send(courses);
});

app.get("/api/courses/:id", function(req, res) {
  var requestedCourse = courses.find(c => {
    return c.id == req.params.id;
  });
  res.send(requestedCourse);
});

app.post("/api/courses", function(req, res) {
  var result = validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  var sendCourse = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(sendCourse);

  res.send(sendCourse);
});

// const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("listening");
});

function validate(req_body) {
  const schema = {
    name: Joi.string()
      .min(2)
      .required()
  };

  return Joi.validate(req_body, schema);
}

// , { id: 4 }, { id: 5 }
