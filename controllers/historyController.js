const db = require("../db");

exports.saveHistory = (req, res) => {

    const {
        user_id,
        product_id,
        recommendation_type
    } = req.body;

    const sql = `
    INSERT INTO recommendation_history
    (user_id, product_id, recommendation_type)
    VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, product_id, recommendation_type],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message:
                    "Riwayat tersimpan"
            });

        }
    );

};

exports.getHistory = (req, res) => {

    const { userId } = req.params;

    db.query(
        `
        SELECT *
        FROM recommendation_history
        WHERE user_id=?
        ORDER BY created_at DESC
        `,
        [userId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};