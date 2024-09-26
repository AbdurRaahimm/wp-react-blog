import { usePosts } from '../context/posts';

export default function PostCreateModal() {
    const { dispatch, createPost } = usePosts();
    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const content = formData.get('content');
        try {
            await createPost(dispatch, { title, content, status: 'publish' });
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    return (
        <div id="postModal" className="shadow-lg" popover="true">
            <div className="bg-white p-4 w-96">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Create Post</h1>
                    <button className='text-2xl font-semibold' popovertarget="postModal">&times;</button>
                </div>
                <form onSubmit={handleCreatePost} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold">Title</label>
                        <input type="text" id="title" name='title' className="border border-gray-300 rounded w-full py-2 px-3" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-semibold">Content</label>
                        <textarea id="content" name='content' className="border border-gray-300 rounded w-full py-2 px-3"></textarea>
                    </div>
                    <div className="mb-4">
                        <button className="bg-pink-600 text-white py-2 px-4 rounded">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
