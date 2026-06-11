const axios = require("axios");

const AI_API = process.env.AI_API;

// ======================================
// REKOMENDASI BERDASARKAN KONSEP
// ======================================
exports.getConcept = async (req, res) => {

    try {

        const keyword =
            req.query.keyword || "minimalis";

        const response = await axios.get(
            `${AI_API}/api/explore/concept`,
            {
                params: {
                    keyword,
                    top_n: 8
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ======================================
// REKOMENDASI BERDASARKAN STYLE
// ======================================
exports.getStyle = async (req, res) => {

    try {

        const { style } = req.params;

        const response = await axios.get(
            `${AI_API}/api/explore/style/${style}`,
            {
                params: {
                    top_n: 8
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ======================================
// PRODUK MIRIP
// ======================================
exports.getSimilar = async (req, res) => {

    try {

        const { productId } = req.params;

        const response = await axios.get(
            `${AI_API}/api/recommend/similar/${productId}`,
            {
                params: {
                    top_n: 8
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};