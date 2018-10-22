module.exports = function permission() {
    return async function (ctx, next) {
        let user = ctx.session.user;
        if(user && user !== ""){
            return next();
        }else {
            return ctx.redirect('/login');
        }
    }
};
