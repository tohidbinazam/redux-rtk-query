import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDeletePostMutation, useGetPostsQuery } from './postSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

const Posts = () => {
  // isFetching
  const { data, isLoading, isSuccess, isError } = useGetPostsQuery();

  const [deletePost, { isSuccess: isDeleteSuccess }] = useDeletePostMutation();

  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setShow(false);

  const handleEdit = (id) => {
    setShow(true);
    setId(id);
  };

  useEffect(() => {
    // Delete post
    if (isDeleteSuccess) {
      toast('Post deleted successfully', { type: 'success' });
    }

    // Show post error
    if (isError) {
      toast('Something went wrong', { type: 'error' });
    }
  }, [isDeleteSuccess, isError]);

  // Show post
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='my-5'>
      <Container>
        <CreatePost />
        <EditPost show={show} handleClose={handleClose} id={id} />
        <Row>
          {isSuccess &&
            data.map((post, index) => (
              <Col md={3} key={index}>
                <Card>
                  <Card.Header>
                    <h5>{post.title}</h5>
                  </Card.Header>
                  <Card.Body>
                    <img
                      className='img-thumbnail rounded mb-2'
                      src={post.photo}
                      alt=''
                    />
                    <p>{post.body}</p>
                  </Card.Body>
                  <Card.Footer>
                    <Link className='btn btn-primary' to={`/${post.id}`}>
                      Read more
                    </Link>
                    <Link
                      className='btn btn-warning mx-3'
                      onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </Link>
                    <Link
                      className='btn btn-danger'
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
