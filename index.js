var express = require("express");
var app = express();
var morgan = require("morgan");
var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "leo" },
  { id: 3, name: "kenny" },
  { id: 4, name: "lii" },
  { id: 5, name: "taylor" },
];

app.use(morgan("dev"));

app.get("/user/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const userList = users.filter((user) => user.id === id);
  if (userList.length > 0) {
    return res.json(userList[0]);
  }
  res.status(404).end();
});

app.get("/users", function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10); // limit이 숫자형태여도 쿼리 파리미터로 넘어온 값들은 문자열로 들어옴
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users = users.filter((user) => user.id !== id); // param.id와 같지 않은 요소들로 기존의 리스트를 업데이트 == 삭제하는 것과 같은 효과
  res.status(204).end();
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000");
});

module.exports = app;
