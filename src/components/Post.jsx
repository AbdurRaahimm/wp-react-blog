import React from 'react'
import { Link } from 'react-router-dom'

export default function Post({ post }) {
    return (
       <article className='shadow-md p-3'>
            <h3 className='text-3xl font-bold capitalize'>{post.title.rendered.substring(0, 20)}</h3>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
            {/* see details */}
            <Link to={`/post/${post.id}`} state={post} className='text-blue-500 float-end'>See details</Link>
       </article>
    )
}
