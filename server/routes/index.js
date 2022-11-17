const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter.js');
const userRouter = require('./userRouter.js');
const brandRouter = require('./brandRouter.js');
const typeRouter = require('./typeRouter.js');

router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);

module.export = router;