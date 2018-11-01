const KoaRouter = require("koa-router");
const router = new KoaRouter();
const sign = require("./sign");
const register = require('./register');
const postOp = require("./postOp");
const commentOp = require("./commentOp");

router.get('/', async (ctx) => {
    await ctx.redirect('/homepage');
});

router.get('/homepage', async (ctx) => {
    await ctx.render("homepage.html");
});

router.get('/manager', async (ctx) => {
    if (ctx.session.username) {
        await ctx.render("manager.html");
    } else {
        await ctx.redirect('/login');
    }
});


router.get('/login', async (ctx) => {
    await ctx.render("login.html");
});
router.post('/loginBlog', async (ctx) => {
    let postData = ctx.request.body;
    await sign.signin(ctx, postData.username, postData.password);

});

router.post('/logout', async (ctx) => {
    await sign.signout();

});

router.post('/register', async (ctx) => {
    let postData = ctx.request.body;
    await register.register(postData.username, postData.password);
});

//文章操作子路由
let postRouter = new KoaRouter();
//具体文章页面

postRouter.get('/getPost/:postId', async (ctx)=>{
    let postId = ctx.params.postId;
    await ctx.render("post.html", {id: postId});
});

postRouter.post('/getPost', async (ctx)=>{
    let postData = ctx.request.body;
    await postOp.getPost(ctx, postData.id);
});
postRouter.post("/publishPost", async (ctx) => {
    let postData = ctx.request.body;
    await postOp.publishPost(postData.title, postData.content, ctx.session.username, 0);
});


postRouter.post("/queryAllPosts", async (ctx) => {
    await postOp.queryAllPosts(ctx);
});

postRouter.post("/updatePost", async (ctx) => {
    let postData = ctx.request.body;
    await postOp.updatePost(postData.postId, postData.content);
});

postRouter.post("/deletePost", async (ctx) => {
    let postData = ctx.request.body;
    await postOp.deletePost(postData.postId);
});


//评论操作子路由
let commentRouter = new KoaRouter();

commentRouter.post("/addComment", async (ctx) => {
    let postData = ctx.request.body;
    await commentOp.addComment(postData.name, postData.content, postData.postId);
});

commentRouter.post("/queryAllComments", async (ctx) => {
    let postData = ctx.request.body;
    await commentOp.queryAllComments(postData.postId);
});

commentRouter.post("/deleteComment", async (ctx) => {
    let postData = ctx.request.body;
    await commentOp.deleteComment(postData.postId, postData.commentId);
});

commentRouter.post("/deleteAllComments", async (ctx) => {
    let postData = ctx.request.body;
    await commentOp.deleteAllComments(postData.postId);
});


router.use("/postOp", postRouter.routes());
router.use("/commentOp", commentRouter.routes());

module.exports = router.routes();
