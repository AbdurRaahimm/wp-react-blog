import React, { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import { getCookie } from "../libs/cookie";

const PostsContext = createContext();

const token = getCookie('token');

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_POSTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_POSTS_SUCCESS':
            return { ...state, loading: false, posts: action.payload };
        case 'FETCH_POSTS_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_POST_SUCCESS':
            return { ...state, posts: [action.payload, ...state.posts] }; // Add the new post to the beginning
        case 'DELETE_POST_SUCCESS':
            return { ...state, posts: state.posts.filter(post => post.id !== action.payload) }; // Filter out deleted post
        case 'UPDATE_POST_SUCCESS':
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.id ? action.payload : post
                )
            };
        default:
            return state;
    }
};

// Fetch posts
const fetchPosts = async (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });
    try {
        const response = await fetch('/api/wp-json/wp/v2/posts', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_POSTS_ERROR', payload: error.message });
    }
};

// Create post
const createPost = async (dispatch, post) => {
    try {
        const response = await fetch('/api/wp-json/wp/v2/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(post)
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_POST_SUCCESS', payload: data });
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

// Delete post
const deletePost = async (dispatch, id) => {
    try {
        await fetch(`/api/wp-json/wp/v2/posts/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'DELETE_POST_SUCCESS', payload: id });
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

// Update post
const updatePost = async (dispatch, post) => {
    try {
        const response = await fetch(`/api/wp-json/wp/v2/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(post)
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_POST_SUCCESS', payload: data });
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

export const PostsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PostsContext.Provider value={{ state, dispatch, fetchPosts, createPost, deletePost, updatePost }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    return useContext(PostsContext);
};
