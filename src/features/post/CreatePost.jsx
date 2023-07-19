import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useCreatePostMutation } from './postSlice';

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();

  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    title: '',
    body: '',
    photo: '',
  });

  const handleClose = () => setShow(false);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    createPost(input);
    handleClose();
    setInput({
      title: '',
      body: '',
      photo: '',
    });
  };

  return (
    <div>
      <Button className='mb-3' onClick={() => setShow(true)}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForm}>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={input.title}
                onChange={handleInput}
                placeholder='Enter title'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as='textarea'
                name='body'
                value={input.body}
                onChange={handleInput}
                rows={3}
                placeholder='Enter post content'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type='url'
                name='photo'
                value={input.photo}
                onChange={handleInput}
                placeholder='Give photo link'
              />
            </Form.Group>
            <div className='d-flex aline-item-center justify-content-end'>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button className='ms-2' onClick={handleClose} type='submit'>
                Post
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreatePost;
