const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const { subscribe } = require("../controllers/subscriber");

router.post("/register", register);
router.post("/login", login);
router.patch("/update/:id", updateUser);
router.post("/subscribe", subscribe);

module.exports = router;
