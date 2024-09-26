import { useEffect } from "react";
import { usePosts } from "../context/posts";
import Post from "../components/Post";
// import PostsList from "../components/PostsList";
import Navbar from "../components/Navbar";
import PostCreateModal from "../components/PostCreateModal";


export default function Home() {
    const { state, dispatch, fetchPosts } = usePosts();
    const { loading, error, posts } = state;

    useEffect(() => {
        fetchPosts(dispatch); // Fetch posts on component mount
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center px-4">
                <h1 className="text-3xl font-bold my-4">Posts <span className="text-sm text-gray-500">({posts.length})</span></h1>
                <button className='border border-pink-600 rounded-full px-3 py-[3px] font-semibold' popovertarget="postModal" >Create Post</button>
                <PostCreateModal />
            </div>
           

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-3">
                {loading && <div>Loading posts...</div>}
                {error && <div>Error {error}</div>}
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </>
    )
}
