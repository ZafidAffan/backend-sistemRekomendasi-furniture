const db = require("../db");

exports.addCart = (req, res) => {

    const {
        user_id,
        product_id,
        qty
    } = req.body;

    const sql = `
        INSERT INTO cart
        (user_id, product_id, qty)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, product_id, qty],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message:
                    "Produk masuk keranjang"
            });

        }
    );

};

exports.getCart = (req, res) => {

    const { userId } = req.params;

    db.query(
        "SELECT * FROM cart WHERE user_id=?",
        [userId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};