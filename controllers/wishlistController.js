const db = require("../db");

exports.addWishlist = (req, res) => {

    const {
        user_id,
        product_id
    } = req.body;

    const sql = `
        INSERT INTO wishlist
        (user_id, product_id)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [user_id, product_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message:
                    "Wishlist berhasil ditambahkan"
            });

        }
    );

};

exports.getWishlist = (req, res) => {

    const { userId } = req.params;

    db.query(
        "SELECT * FROM wishlist WHERE user_id=?",
        [userId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};