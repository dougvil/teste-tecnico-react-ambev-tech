import { Pages } from '@/pages';
import { RouterProvider as BrowserRouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Pages.App.Layout />,
    children: [
      {
        path: 'tasks',
        element: <Pages.Tasks.Layout />,
        children: [
          {
            path: '',
            element: <Pages.Tasks.List />,
            children: [
              {
                path: 'new',
                element: <Pages.Tasks.New />,
              },
              {
                path: ':taskId',
                element: <Pages.Tasks.Edit />,
              },
            ],
          },
        ],
      },
      {
        path: '/',
        element: (
          <Navigate
            to='/tasks'
            replace
          />
        ),
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <BrowserRouterProvider router={router} />;
};
