const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authJWT');
const { signup, signin, hiddencontent } = require('../controllers/auth.controller.js');

router.post('/register', signup);
router.post('/login', signin);
router.get('/hiddencontent', verifyToken, hiddencontent);

module.exports = router;
