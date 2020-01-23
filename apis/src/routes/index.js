const { Router } = require('express');
const auth = require('./auth');
const users = require('./users');

const router = Router();

const pong = (_, res) => res.json({ message: 'pong' });
const notFound = (_, res) => res.status(404).json({ message: 'Not Found' });

router.all('/ping', pong);

router.use('/auth', auth);
router.use('/users', users);

router.use(notFound);

module.exports = router;
