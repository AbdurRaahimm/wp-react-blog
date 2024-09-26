import React from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePosts } from '../context/posts';

export default function EditPost() {
    const navigate = useNavigate();
    const {dispatch, updatePost} = usePosts();
    const post = useLocation().state;
    // console.log(post);
    const handleUpdatePost = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const content = formData.get('content');
        try {
            await updatePost(dispatch, {id: post.id, title, content, status: 'publish'});
            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    return (
        <>
            <Navbar />

            <div className="p-5">
                <form onSubmit={handleUpdatePost} className='shadow-lg p-4 rounded-md space-y-3'>
                    <h1 className='text-3xl font-bold capitalize'>Edit Post</h1>
                    <input type="text" placeholder='Title' defaultValue={post.title.rendered} name='title' className='border border-gray-300 rounded-md p-2 w-full' />
                    <textarea placeholder='Content' defaultValue={post.content.rendered} name='content' className='border border-gray-300 rounded-md p-2 w-full h-48'></textarea>
                    <button className='border border-pink-600 rounded-full px-3 py-[3px] font-semibold'>Update Post</button>
                </form>
            </div>

        </>
    )
}
