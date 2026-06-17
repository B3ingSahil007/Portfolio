const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ADMIN_ID = 'admin123';
const ADMIN_PASSWORD = 'SahilRizzu218925';

router.post('/login', (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign(
            { id: ADMIN_ID },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: ADMIN_ID, role: 'admin' }
        });
    } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
});

module.exports = router;
