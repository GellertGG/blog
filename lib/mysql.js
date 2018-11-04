var mysql = require('mysql');
var config = require('../config/default');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

};


let users =
    `create table if not exists user(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL unique,
     password VARCHAR(100) NOT NULL,
     salt VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`;

let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     title TEXT(0) NOT NULL,
     content TEXT(0) NOT NULL,
     username VARCHAR(100) NOT NULL,
     comments VARCHAR(200) NOT NULL DEFAULT '0',
     PRIMARY KEY ( id )
    );`;

let comment =
    `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     content TEXT(0) NOT NULL,
     postid VARCHAR(40) NOT NULL,
     PRIMARY KEY ( id )
    );`;

let createTable = function (sql) {
    return query(sql, [])
};

// 建表
createTable(users);
createTable(posts);
createTable(comment);


//注册
let register = (username, password, salt) => {
    let registerStr = `insert into user (username, password, salt) values ("${username}","${password}", "${salt}")`;
    return query(registerStr);
};

//登录
let login = (username) => {
    let loginStr = `select password from user where username="${username}"`;
    return query(loginStr)
};

//查盐
let querySalt = (username) => {
    let querySaltStr = `select salt from user where username="${username}"`;
    return query(querySaltStr);
};

//查询文章
let getPost = (postId) => {
    let publishStr = `select * from posts where id= '${postId}'`;
    return query(publishStr);
};

//发表文章
let publishPost = (title, content, username, comments) => {
    let publishStr = `insert into posts (title, content, username, comments) values ('${title}','${content}','${username}','${comments}')`;
    return query(publishStr);
};

//查询所有文章
let queryAllPosts = (keyword, pageInfo) => {
    let condition = "";
    if (keyword != undefined && keyword != "") {
        condition += ` where content LIKE '%${keyword}%' or title LIKE '%${keyword}%'`;
    }
    if(pageInfo!=""&&pageInfo!=undefined){
        let start = (pageInfo-1)*5;
        condition += ` LIMIT ${start}, 5`;
    }
    let queryAllPostsStr = `select * from posts` + condition;
    return query(queryAllPostsStr);
};

//更新修改文章
let updatePost = (postId, content) => {
    let updatePostStr = `update posts set content = "${content}" where id = ${postId}`;
    return query(updatePostStr);
};

//删除文章
let deletePost = (postId) => {
    let deletePostStr = `delete from posts where id = ${postId}`;
    return query(deletePostStr);
};
//添加评论
let addComment = (name, content, postId) => {
    let addCommentStr = `insert into comment (name, content, postid) values ("${name}","${content}",${postId})`;
    return query(addCommentStr);
};

//查询所有评论
let queryAllComments = (postId) => {
    let queryAllCommentsStr = `select * from comment where postid = ${postId}`;
    return query(queryAllCommentsStr);
};

//删除评论
let deleteComment = (postId, commentId) => {
    let deleteCommentStr = `delete from comment where id = ${commentId}`;
    return query(deleteCommentStr);
};

//删除所有评论
let deleteAllComments = (postId) => {
    let deleteAllCommentsStr = `delete from comment where postid = ${postId}`;
    return query(deleteAllCommentsStr);
};


module.exports = {
    register,
    login,
    querySalt,
    getPost,
    publishPost,
    queryAllPosts,
    updatePost,
    deletePost,
    addComment,
    queryAllComments,
    deleteComment,
    deleteAllComments
};
