const mysql = require("../lib/mysql");

let addComment = (name, content, postId) => {
    mysql.addComment(name, content, postId).then(function (result) {
        console.log(result);
    })
};

let queryAllComments = (postId) => {
    mysql.queryAllComments(postId).then(function (result) {
        console.log(result);
    })
};

let deleteComment = (postId, commentId) => {
    mysql.deleteComment(postId, commentId).then(function (result) {
        console.log(result);
    })
};

let deleteAllComments = (postId) => {
    mysql.deleteAllComments(postId).then(function (result) {
        console.log(result);
    })
};

module.exports = {
    addComment,
    queryAllComments,
    deleteComment,
    deleteAllComments
};
