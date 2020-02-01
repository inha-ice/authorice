const { Router } = require('express');
const Level = require('../constants/Level');
const users = require('../controllers/users');
const { verifyAuth, verifyAuthLevel } = require('../middlewares/auth');
const { handleAsync } = require('../utils/routes');

const verifyManager = verifyAuthLevel(Level.ADMIN | Level.OWNER);

const router = Router();

router.post('/', handleAsync(users.createUser));
router.get('/', verifyAuth, verifyManager, handleAsync(users.getUsers));
router.get('/:id', verifyAuth, verifyManager, handleAsync(users.getUser));
router.delete('/:id', verifyAuth, verifyManager, handleAsync(users.deleteUser));
router.get('/:id/logs', verifyAuth, verifyManager, handleAsync(users.getUserLogs));
router.get('/:id/privacy', verifyAuth, verifyManager, handleAsync(users.getUserPrivacy));

module.exports = router;
