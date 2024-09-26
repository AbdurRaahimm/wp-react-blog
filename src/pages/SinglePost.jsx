import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { usePosts } from '../context/posts';
import { toast } from 'react-toastify';

export default function SinglePost() {
    const navigate = useNavigate();
    const {dispatch, deletePost} = usePosts();
    const post = useLocation().state;

    const handleDeletePost = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            deletePost( dispatch, post.id);
            toast.success('Post deleted successfully');
            navigate('/');
        }
    };
    return (
        <>
            <Navbar />
            <div className="p-5">
                <article className='shadow-lg p-4 rounded-md space-y-3'>
                    <h1 className='text-3xl font-bold capitalize'>{post.title.rendered}</h1>
                    <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
                </article>
            </div>
            {/* edit and delete button */}
            <div className="flex justify-center gap-3">
                <Link to={`/edit/${post.id}`} state={post} className='border border-pink-600 rounded-full px-3 py-[3px] font-semibold'>Edit</Link>
                <button onClick={handleDeletePost} className='border border-pink-600 rounded-full px-3 py-[3px] font-semibold'>Delete</button>
            </div>
        </>
    )
}
