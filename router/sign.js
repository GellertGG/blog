const mysql = require("../lib/mysql");
const encryptPW = require("../lib/encryptPW");
let salt = "";
let signin = async (ctx, username, password) => {
    await mysql.querySalt(username).then(function (result) {
        salt = result[0].salt;
        return mysql.login(username);
    }).then(function (result) {
        if (result[0].password === encryptPW(password + salt)) {
            //登录成功
            ctx.session.username = username;
            ctx.body = 'login success!';

        } else {
            //登录失败
            ctx.body = "login failed";
        }
    });

};
let signout = async () => {
    return ctx.session.username = "";
};

module.exports = {
    signin,
    signout
};
