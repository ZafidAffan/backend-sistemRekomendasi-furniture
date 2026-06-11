const express = require("express");

const router = express.Router();

const {
    getConcept,
    getStyle,
    getSimilar
} = require("../controllers/aiController");

router.get("/concept", getConcept);

router.get("/style/:style", getStyle);

router.get("/similar/:productId", getSimilar);

module.exports = router;