const mysql = require("../lib/mysql");
const encryptPW = require("../lib/encryptPW");

let register = (username, password) => {
    let saltValue = salt();
    return mysql.register(username, encryptPW(password + saltValue), saltValue).then(function (result) {
        console.log(result);
    });
};

/*
 * 10位盐
 * 时间戳(2)+随机字母(8)
 */
const salt = () => {
    var time = Date.now() % 100,
        str = '';
    time = time === 0 ? '00' : String(time);
    for (let i = 0; i < 8; i++) {
        const base = Math.random() < 0.5 ? 65 : 97;
        str += String.fromCharCode(
            base +
            Math.floor(
                Math.random() * 26
            )
        );
    }
    return time + str;
};


module.exports = {
    register
};
