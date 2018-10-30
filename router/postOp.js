const mysql = require("../lib/mysql");

let getPost = (ctx, postId)=>{
    return mysql.getPost(postId).then(function (result) {
        ctx.response.body = result[0];
    })
};

let publishPost = (title, content, username, comments) => {
    return mysql.publishPost(title, content, username, comments).then(function (result) {
        console.log(result);
    })
};

let queryAllPosts = (ctx) => {
    return mysql.queryAllPosts().then(function (result) {
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
