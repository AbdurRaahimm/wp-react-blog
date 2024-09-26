import React, { useState, useEffect } from 'react';
import { usePosts } from '../context/posts';


const PostsList = () => {
    const { state, dispatch, fetchPosts, createPost, deletePost, updatePost } = usePosts();
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        fetchPosts(dispatch); // Fetch posts on component mount
    }, [dispatch]);

    // Handle creating a new post
    const handleCreatePost = (e) => {
        e.preventDefault();
        createPost(dispatch, {
            title: newPost.title,
            content: newPost.content
        });
        setNewPost({ title: '', content: '' });
    };

    // Handle deleting a post
    const handleDeletePost = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            deletePost(dispatch, id);
        }
    };

    // Handle updating a post
    const handleUpdatePost = (e) => {
        e.preventDefault();
        updatePost(dispatch, {
            id: editingPost.id,
            title: editingPost.title,
            content: editingPost.content
        });
        setEditingPost(null);
    };

    if (state.loading) return <div>Loading posts...</div>;
    if (state.error) return <div>Error loading posts: {state.error}</div>;

    return (
        <div>
            <h2>Posts List</h2>

            {/* Create Post Form */}
            <form onSubmit={handleCreatePost}>
                <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Post Title"
                    required
                />
                <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Post Content"
                    required
                />
                <button type="submit">Create Post</button>
            </form>

            {/* Edit Post Form */}
            {editingPost && (
                <form onSubmit={handleUpdatePost}>
                    <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        required
                    />
                    <textarea
                        value={editingPost.content}
                        onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                        required
                    />
                    <button type="submit">Update Post</button>
                    <button onClick={() => setEditingPost(null)}>Cancel</button>
                </form>
            )}

            {/* Posts Display */}
            {state.posts.length === 0 ? (
                <div>No posts available</div>
            ) : (
                <ul>
                    {state.posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title.rendered}</h3>
                            {/* <p>{post.content.rendered}</p> */}
                            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                            <button onClick={() => setEditingPost(post)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostsList;
