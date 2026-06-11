const express = require("express");

const router = express.Router();

const {
    addCart,
    getCart
} = require("../controllers/cartController");

router.post("/", addCart);

router.get("/:userId", getCart);

module.exports = router;