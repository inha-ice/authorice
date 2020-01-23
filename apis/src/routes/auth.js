const { Router } = require('express');
const users = require('../controllers/users');
const { verifyAuth } = require('../middlewares/auth');
const { handleAsync } = require('../utils/routes');

const router = Router();

router.post('/', handleAsync(users.login));
router.get('/me', verifyAuth, handleAsync(users.getMe));
router.patch('/me', verifyAuth, handleAsync(users.updateMe));
router.delete('/me', verifyAuth, handleAsync(users.deleteMe));
router.get('/me/logs', verifyAuth, handleAsync(users.getMyLogs));
router.get('/me/privacy', verifyAuth, handleAsync(users.getMyPrivacy));
router.patch('/me/privacy', verifyAuth, handleAsync(users.updateMyPrivacy));

module.exports = router;
