const express = require('express');
const Router = express.Router();
const CommentController = require('./../Controller/CommentController');

function RouterComment() {
    const controller = new CommentController();

    Router.post('/comment', controller.ApiComment.bind(controller));
    Router.post('/comment/reply', controller.ApiReply.bind(controller));

    // get comment
    // Router.get('/get-comment/:PostID', controller.GetComment.bind(controller));
    Router.get('/get-comment/:PostID', controller.GetComments.bind(controller));

    return Router;
}

module.exports = RouterComment;
