const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const app = new Koa();
const static = require('koa-static')
//设置静态资源的路径
const staticPath = './public';
const bodyParser = require('koa-bodyparser');
const route = require('./router/route');
const session = require('koa-session');
// const jwt = require('koa-jwt');
const config = require('./config/default');

// app.use(jwt({ secret: config.secret }));

app.keys = ['some secret hurr'];   /*cookie的签名*/

app.use(session(config.SESSION_CONFIG, app));
// 使用ctx.body解析中间件
app.use(bodyParser());


app.use(views(path.join(__dirname, './views'), {extensions: 'html', map: {html: 'nunjucks' }}));


app.use(route);

app.use(static(
    path.join( __dirname,  staticPath)
));


app.listen(3000);
