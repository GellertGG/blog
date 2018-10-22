const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const content = require('./utils/content');
const mimes = require('./utils/mime');
const app = new Koa();
const static = "./public";
const bodyParser = require('koa-bodyparser');
const route = require('./router/route');
const session = require('koa-session');
const jwt = require('koa-jwt');
const config = require('./config/default');

// app.use(jwt({ secret: config.secret }));

app.keys = ['some secret hurr'];   /*cookie的签名*/

app.use(session(config.SESSION_CONFIG, app));
// 使用ctx.body解析中间件
app.use(bodyParser());


app.use(views(path.join(__dirname, './views'), {extensions: 'html'}));


app.use(route);



// 解析资源类型
function parseMime( url ) {
    let extName = path.extname( url );
    extName = extName ?  extName.slice(1) : 'unknown';
    return  mimes[ extName ]
}

app.use( async (ctx)=>{
   let fullPath = path.join(__dirname, static);
   let _content = await content( ctx, fullPath );

    // 解析请求内容的类型
    let _mime = parseMime( ctx.url );
    if(_mime){
        ctx.type = _mime;
    }
    if(_mime && _mime.indexOf("image/")>=0){
        ctx.res.writeHead(200);
        ctx.res.write(_content, 'binary');
        ctx.res.end()
    }else {
        // 其他则输出文本
        ctx.body = _content
    }


});
app.listen(3000);
