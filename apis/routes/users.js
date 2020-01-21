const { Router } = require('express');
const Level = require('../constants/Level');
const users = require('../controllers/users');
const { verifyAuth, verifyAuthLevel } = require('../middlewares/auth');
const { handleAsync } = require('../utils/routes');

const verifyManager = verifyAuthLevel(Level.ADMIN | Level.OWNER);

const router = Router();

router.post('/', handleAsync(users.createUser));
router.get('/:id', verifyAuth, verifyManager, handleAsync(users.getUser));

module.exports = router;
