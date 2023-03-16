// 라우팅 설정
const express = require("express");
const router = express.Router();
const {getUsers} = require("./user.service");
const {getUser} = require("./user.service");
const {deleteUser} = require("./user.service");
const {createUser} = require("./user.service");
const {updateUser} = require("./user.service");

// "/"이 경로와 getUsers모듈을 바인딩함
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/", createUser);
router.put("/:id", updateUser);

module.exports = router;
