import React from 'react';
import { PostDTO } from './api/models/PostDTO';
import BlogPost from './BlogPost';
import './BlogPosts.css'; // Import the CSS file for styling

type Props = {
  blogPosts: PostDTO[];
};

function BlogPosts(props: Props) {
  const { blogPosts } = props;

  const articles = blogPosts.map((post) => <BlogPost post={post} />);

  return <div className="blog-container">{articles}</div>;
}

export default BlogPosts;
