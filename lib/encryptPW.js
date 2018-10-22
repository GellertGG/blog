const crypto = require('crypto');

let encryptPw = (password) => {
    let hash = crypto.createHash('md5');
    hash.update(password);
    return hash.digest('hex');
};

module.exports = encryptPw;
