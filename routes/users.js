const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.post('/me', updateUserInfo);

module.exports = router;
