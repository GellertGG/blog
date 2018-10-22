const config = {
    port :3000,
    database: {
        DATABASE: 'koa',
        USERNAME: 'root',
        PASSWORD: 'chen!321',
        PORT: '3306',
        HOST: 'localhost'
    },
    secret: "i am a secret",
    SESSION_CONFIG : {
        key: 'koa:sess', /** 默认 */
        maxAge: 86400000,  /*  cookie的过期时间        【需要修改】  */
        overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
        httpOnly: true, /**  true表示只有服务器端可以获取cookie */
        signed: true, /** 默认 签名 */
        rolling: false, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
        renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
    }
};
module.exports = config;
