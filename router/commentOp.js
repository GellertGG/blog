const mysql = require("../lib/mysql");

let addComment = (name, content, postId) => {
    return mysql.addComment(name, content, postId).then(function (result) {
        console.log(result);
    })
};

let queryAllComments = (postId) => {
    return mysql.queryAllComments(postId).then(function (result) {
        console.log(result);
    })
};

let deleteComment = (postId, commentId) => {
    return mysql.deleteComment(postId, commentId).then(function (result) {
        console.log(result);
    })
};

let deleteAllComments = (postId) => {
    return mysql.deleteAllComments(postId).then(function (result) {
        console.log(result);
    })
};

module.exports = {
    addComment,
    queryAllComments,
    deleteComment,
    deleteAllComments
};
