const { put } = require(".");

var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "leo" },
  { id: 3, name: "kenny" },
  { id: 4, name: "jay" },
  { id: 5, name: "taylor" },
];


const getUsers = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10); // limit이 숫자형태여도 쿼리 파리미터로 넘어온 값들은 문자열로 들어옴
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const userList = users.filter((user) => user.id === id);
  if (userList.length > 0) {
    return res.json(userList[0]);
  }
  res.status(404).end();
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users = users.filter((user) => user.id !== id); // param.id와 같지 않은 요소들로 기존의 리스트를 업데이트 == 삭제하는 것과 같은 효과
  res.status(204).end();
};

const createUser = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  const isDuplicated = users.filter((user) => user.name === name).length;
  if (isDuplicated) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = { id, name }; // === {'id': id, 'name': name}
  users.push(user);
  res.status(201).json(user);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  if (id > users.length) {
    return res.status(404).end();
  }

  const isDuplicated = users.filter((user) => user.name === name).length;
  if (isDuplicated > 0) {
    return res.status(409).end();
  }

  const user = users.filter((user) => user.id === id)[0];
  user.name = name;

  res.status(201).json(user);
};

module.exports = { getUsers, getUser, deleteUser, createUser, updateUser };
