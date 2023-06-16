import React, { useState } from 'react';
import { PostDTO } from './api/models/PostDTO';
import { Card, Modal, Button } from 'react-bootstrap';
import './BlogPosts.css';

type Props = {
  post: PostDTO;
};

function BlogPost(props: Props) {
  const { post } = props;
  const [showModal, setShowModal] = useState(false); // State for controlling the visibility of the popup

  const handleToggleModal = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      return;
    }
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <Card
        className="mb-2 blog-card"
        border="dark"
        bg="light"
        style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}
      >
        {post.pictureUrl && (
          <Card.Img variant="top" src={post.pictureUrl} alt="Blog Post" />
        )}
        <Card.Body onClick={handleToggleModal}>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{truncateText(post.text, 700)}</Card.Text>
          {post.readmoreUrl && <Card.Link href={post.readmoreUrl}>Read more</Card.Link>}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Author: {post.author}</small>
        </Card.Footer>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{post.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div className="blog-post-content">
            <div className="blog-post-text">
              <p>{post.text}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BlogPost;
