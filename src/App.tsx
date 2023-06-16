import React, { useEffect, useState } from 'react';
import './App.css';
import BlogPosts from './BlogPosts';
import { PostDTO } from './api/models/PostDTO';
import { PostQueryResponse } from './api/models/PostQueryResponse';
import BlogPostForm from './BlogPostForm';

function App() {
  const [blogPosts, setBlogPosts] = useState<PostDTO[]>([]);
  const [showAddPostPopup, setShowAddPostPopup] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:3001/post')
      .then(response => response.json())
      .then((data: PostQueryResponse) => setBlogPosts(data.posts))
      .catch(error => console.error('Error fetching blog posts:', error));
  };

  const handleAddPostClick = () => {
    setShowAddPostPopup(!showAddPostPopup);
  };

  const handlePostAdded = () => {
    setShowAddPostPopup(false);
    fetchPosts();
  };

  return (
    <div className="App">
      <header className="App-header">
        {"Hussam's Personal Blog"}
      </header>
      <div className="App-body">
        <div className="button-container">
          <button className="add-post-button" onClick={handleAddPostClick}>
            Add post
          </button>
        </div>
        {showAddPostPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <BlogPostForm onPost={handlePostAdded} />
            </div>
          </div>
        )}
        <BlogPosts blogPosts={blogPosts} />
      </div>
    </div>
  );
}

export default App;
