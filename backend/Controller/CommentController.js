const express = require('express');
const connect = require('./../Config/connectMySql');
const ApiError = require('./../Config/ApiError');
class CommentController {
    async ApiComment(req, res, next) {
        const { UserID, PostID, Content, ParentCommentID } = req.body;
        try {
            const [result] = await connect.query(
                'INSERT INTO comments (UserID, PostID, Content,ParentCommentID) VALUES (?, ?, ?,?)',
                [UserID, PostID, Content, ParentCommentID],
            );
            const [newComment] = await connect.query('SELECT * FROM comments WHERE CommentID = ?', [result.insertId]);
            res.status(200).json({
                message: 'success',
                data: newComment[0],
            });
        } catch (error) {
            next(error);
        }
    }
    // reply Comment content
    async ApiReply(req, res, next) {
        const { UserID, PostID, Content, ParentCommentID, UserIdReply, Usernamereply } = req.body;
        try {
            const sql =
                'INSERT INTO Comments (UserID, PostID, Content, ParentCommentID,UserId_Reply,Username_reply) VALUES (?, ?, ?, ?,?,?)';
            connect.query(
                sql,
                [UserID, PostID, Content, ParentCommentID, UserIdReply, Usernamereply],
                (err, result) => {
                    if (err) {
                        throw new ApiError('Error creating reply:', err);
                        res.status(500).send('Error creating reply');
                        return;
                    }
                    res.status(201).send('Reply created successfully');
                },
            );
            res.status(200).json({
                message: 'Success',
            });
        } catch (error) {
            next(error);
        }
    }

    // get Comment

    async GetComment(req, res, next) {
        const { PostID } = req.params;
        try {
            const sql =
                'SELECT comments.*, auth.id , auth.username FROM comments JOIN auth ON comments.UserID = auth.id WHERE comments.PostID = ?';

            const [result] = await connect.query(sql, [PostID]);
            res.json({
                message: 'success',
                data: result,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async GetComments(req, res, next) {
        const { PostID } = req.params;
        try {
            // Fetch parent comments (comments without ParentCommentID)
            const [comments] = await connect.query(
                'SELECT comments.*, auth.id, auth.username FROM comments JOIN auth ON comments.UserID = auth.id WHERE PostID = ? AND ParentCommentID IS NULL',
                [PostID],
            );

            // Fetch replies (comments with ParentCommentID)
            const [replies] = await connect.query(
                `SELECT comments.*, auth1.id AS reply_user_id, auth1.username AS reply_username, auth2.id AS user_id, auth2.username AS user_username 
                 FROM comments 
                 JOIN auth AS auth1 ON comments.UserId_Reply = auth1.id 
                 JOIN auth AS auth2 ON comments.UserId = auth2.id 
                 WHERE PostID = ? AND ParentCommentID IS NOT NULL`,
                [PostID],
            );

            // Helper function to recursively map replies
            const mapReplies = (comments, allReplies) => {
                return comments.map((comment) => {
                    const nestedReplies = allReplies.filter((reply) => reply.ParentCommentID === comment.CommentID);
                    return {
                        ...comment,
                        replies: mapReplies(nestedReplies, allReplies), // Recursively map replies
                    };
                });
            };

            // Map top-level comments with their replies
            const commentsWithReplies = mapReplies(comments, replies);

            res.status(200).json({
                message: 'Success',
                data: commentsWithReplies,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = CommentController;
