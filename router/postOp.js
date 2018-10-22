const mysql = require("../lib/mysql");

let publishPost = (title, content, uid, comments) => {
    mysql.publishPost(title, content, uid, comments).then(function (result) {
        console.log(result);
    })
};

let queryAllPosts = () => {
    mysql.queryAllPosts().then(function (result) {
        console.log(result);
    })
};

let updatePost = (postId, content) => {
    mysql.updatePost(postId, content).then(function (result) {
        console.log(result);
    })
};

let deletePost = (postId) => {
    mysql.deletePost(postId).then(function (result) {
        console.log(result);
    })
};

module.exports = {
    publishPost,
  queryAllPosts,
  updatePost,
  deletePost
};
