const express = require("express");

const router = express.Router();

const {
    addWishlist,
    getWishlist
} = require("../controllers/wishlistController");

router.get("/:userId", getWishlist);

router.post("/", addWishlist);

module.exports = router;