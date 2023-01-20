const jwt = require("jsonwebtoken");

const SECRET = "HiThere!";

const payload = {
  date: Date.now(),
  name: "Shirohige",
};

const token = jwt.sign(payload, SECRET);


const result = jwt.verify(token, SECRET)

console.log(token.length)