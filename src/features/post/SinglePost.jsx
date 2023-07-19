import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useGetSinglePostQuery } from './postSlice';
import { toast } from 'react-toastify';

const SinglePost = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSinglePostQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return toast('Something went wrong', { type: 'error' });
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h3>{data.title}</h3>
              </Card.Header>
              <Card.Body>
                <img
                  className='img-thumbnail rounded mb-2 w-25'
                  src={data.photo}
                  alt=''
                />
                <p>{data.body}</p>
              </Card.Body>
              <Card.Footer>
                <Link to='/' className='btn btn-warning'>
                  Back to home
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SinglePost;
