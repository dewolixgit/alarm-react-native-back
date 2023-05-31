const { Router } = require('express');

const router = Router();

// /api/echo
router.get(
    '/echo',
    (req, res) => {
        try {
            res.json(req.query);
        } catch (e) {
            res.status(500).json({message: 'Something has gone wrong'});
        }
    });

module.exports = router;
