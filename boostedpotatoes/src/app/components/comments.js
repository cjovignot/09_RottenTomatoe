'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const CommentsDisplay = ({ id }) => {
    const [comment, setComment] = useState('');
    const [userName, setuserName] = useState(Cookies.get('username'));
    const [userId, setuserId] = useState(Cookies.get('userId'));
    const [comments, setComments] = useState([]);


    const fetchComments = async () => {
            const url = `http://localhost:3002/movie/${id}`;
            try {
                const response = await axios.get(url);
                setComments(response.data.movie.comments);
            } catch (error) {
                console.error(error);
            }
        };

    const addComment = async (content) => {
        const url = `http://localhost:3002/comment/${id}`;
        const newComment = {
            author: userName,
            user_id: userId,
            content: content
        };
        try {
            const response = await axios.post(url, newComment);
            console.log(response);
            const results = response.data;
            fetchComments();
            return results;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteComment = async (comment_id) => {
        const url = `http://localhost:3002/comment/${id}/${comment_id}`;
        try {
            const response = await axios.delete(url);
            console.log(response);
            const results = response.data;
            fetchComments();
            return results;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);


    if (!userId) {
        return (
            <>
                <div className='flex items-center justify-center m-5 '>Login to view and add comments.</div>
            </>
        );
    }

    return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold mb-5">Comments</h1>
            {comments?.map(({ author, content, user_id, _id }) => (
                <><div className="chat chat-start">
                    <div className="chat-header">
                        {author}
                    </div>
                    <div className="chat-bubble">{content}</div>
                </div> {user_id === userId && (
            <button onClick={async () => {
                        await deleteComment(_id);
                    }} 
                    className="btn btn-xs btn-error scale-75 mb-1">
                        Delete</button>
        )}</>
                
            ))}
            <div className="form-control scale-90 mt-10">
                <label className="label">
                    <span className="label-text">Give your opinion</span>
                </label>
                <input
                    type="text"
                    placeholder="What do you think about this movie ?"
                    className="input input-bordered"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='btn'
                    onClick={async () => {
                        await addComment(comment);
                        setComment('');
                    }}
                >
                    Publish
                </button>
            </div>
        </div>
    );
}

export default CommentsDisplay;
