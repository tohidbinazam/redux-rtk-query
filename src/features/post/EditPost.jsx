import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useEditPostMutation, useGetSinglePostQuery } from './postSlice';
import { toast } from 'react-toastify';

const EditPost = ({ show, handleClose, id }) => {
  const { data, isSuccess: getSuccess } = useGetSinglePostQuery(id);
  const [editPost, { isSuccess }] = useEditPostMutation();

  const [input, setInput] = useState({
    title: '',
    body: '',
    photo: '',
    id: '',
  });

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    editPost(input);
    setInput({
      title: '',
      body: '',
      photo: '',
    });
  };

  useEffect(() => {
    if (getSuccess) {
      setInput({ ...data });
    }
    if (isSuccess) {
      toast('Post Update successfully', { type: 'success' });
    }
  }, [data, getSuccess, isSuccess]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
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
                Edit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditPost;
