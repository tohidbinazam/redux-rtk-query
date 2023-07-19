import { createBrowserRouter } from 'react-router-dom';
import Posts from '../features/post/Posts';
import SinglePost from '../features/post/SinglePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Posts />,
  },
  {
    path: '/:id',
    element: <SinglePost />,
  },
]);

export default router;
