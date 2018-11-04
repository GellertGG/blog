const mysql = require("../lib/mysql");
const htmlparser = require('htmlparser2');


let getPost = (ctx, postId) => {
    return mysql.getPost(postId).then(function (result) {
        ctx.response.body = result[0];
    })
};

let publishPost = (title, content, username, comments) => {
    return mysql.publishPost(title, content, username, comments).then(function (result) {
        console.log(result);
    })
};

let queryAllPosts = (ctx, keyword, pageInfo) => {
    return mysql.queryAllPosts(keyword, pageInfo).then(function (result) {
        for (let item of result) {
            let resultText = "";
            var parser = new htmlparser.Parser({
                onopentag:function(tagname){
                    if (tagname.startsWith('h')) {
                        resultText += " ";
                    }
                },
                ontext: function (text) {
                    resultText += text;
                    if (resultText.length > 150) {
                        parser.parseComplete();
                    }
                },
                onclosetag: function (tagname) {
                    if (tagname === "br" || tagname.startsWith('h')) {
                        resultText += " ";
                    }
                }
            }, {decodeEntities: true});
            parser.write(item.content);
            parser.end();
            item["resultText"] = resultText + "...";
        }
        ctx.response.body = result;
        console.log(result);
    })
};

let updatePost = (postId, content) => {
    return mysql.updatePost(postId, content).then(function (result) {
        console.log(result);
    })
};

let deletePost = (postId) => {
    return mysql.deletePost(postId).then(function (result) {
        console.log(result);
    })
};



module.exports = {
    getPost,
    publishPost,
    queryAllPosts,
    updatePost,
    deletePost
};
