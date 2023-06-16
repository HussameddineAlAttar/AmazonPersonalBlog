import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './BlogPostForm.css';

import { PostDTO } from './api/models/PostDTO';

type Props = {
  onPost: () => void;
};

function BlogPostForm(props: Props) {
  const [post, setPost] = useState<PostDTO>({
    id: '',
    text: '',
    author: '',
    title: '',
    readmoreUrl: '',
    pictureUrl: '',
  });

  const resetForm = () => {
    setPost({
      id: '',
      text: '',
      author: '',
      title: '',
      readmoreUrl: '',
      pictureUrl: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Make a POST request here with the post data
    fetch('http://localhost:3001/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
        console.log('Post submitted successfully:', data);
        props.onPost(); // Trigger fetching posts
        resetForm(); // Reset the form fields
      })
      .catch(error => {
        console.error('Error submitting post:', error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <Form className="mb-3 form-wrapper" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          required
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Enter the post title"
          size="lg"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formText">
        <Form.Label>Text:</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          name="text"
          value={post.text}
          onChange={handleInputChange}
          placeholder="Enter the post content"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAuthor">
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={post.author}
          onChange={handleInputChange}
          placeholder="Enter the author name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image URL (optional):</Form.Label>
        <Form.Control
          type="text"
          name="pictureUrl"
          value={post.pictureUrl}
          onChange={handleInputChange}
          placeholder="Enter the URL for the blog image"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formReadMore">
        <Form.Label>Read more URL (optional):</Form.Label>
        <Form.Control
          type="text"
          name="readmoreUrl"
          value={post.readmoreUrl}
          onChange={handleInputChange}
          placeholder="Enter the URL for the full article"
        />
      </Form.Group>
      <Button className="d-grid" variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
}

export default BlogPostForm;
