const router = require('koa-router')();

router.prefix('/users');

router.get('/',async function (ctx, next) {
  ctx.body = 'this is a users response!';
  await next();
});

router.get('/bar',async function (ctx, next) {
  ctx.body = 'this is a users/bar response';
  await next();
});

module.exports = router;
