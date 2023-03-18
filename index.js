var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var userIndex = require("./api/user/index");

// 미들웨어 추가
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// "/users"로 들어오는 모든 요청은 user가 담당한다
app.use("/user", userIndex);  // user는 폴더인데...module인 router를 사용해야 되는거 아닌가????

module.exports = app;
