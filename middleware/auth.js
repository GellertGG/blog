module.exports = function permission(ctx) {
        let user = ctx.session.username;
        if(user && user !== ""){
            return true;
        }else {
             ctx.redirect('/login');
             return false;
        }
    };
