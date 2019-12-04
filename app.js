const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');
const router = require('koa-router')();
const history = require('koa2-history-api-fallback');


const index = require('./routes/index');
const users = require('./routes/users');


// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());

app.use( async (ctx, next) =>{
  ctx.set("Access-Control-Allow-Origin","http://localhost:8080");
  // ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // ctx.set("Access-Control-Allow-Credentials", true);
  await next();
});

// app.use(cors({
//   origin : function (ctx) {
//     return "http://localhost:8000";
//   }
//
// }));





app.use(index.routes(),index.allowedMethods());
app.use(users.routes(),users.allowedMethods());

// 前端(vue)路由
// 所有 navigate 请求重定向到 '/index.html'，配合底下的 koaStatic，实际位置位于 vue-dist/index.html
app.use(history({
  htmlAcceptHeaders: ['text/html'],
  index: '/index.html'
}));

app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/vue-dist'));

//添加ejs模板并修改模板后缀为html
app.use(views(__dirname + '/views', {
  map : {html:'ejs'}
}));



// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
