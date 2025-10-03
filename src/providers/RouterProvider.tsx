import { Box, CircularProgress, LinearProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { RouterProvider as BrowserRouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

// Lazy load das páginas
const AppLayout = lazy(() => import('@/pages/App/Layout').then((module) => ({ default: module.AppLayout })));
const TasksLayout = lazy(() => import('@/pages/Tasks/Layout').then((module) => ({ default: module.TasksLayout })));
const TaskList = lazy(() => import('@/pages/Tasks/List').then((module) => ({ default: module.TaskListPage })));
const TaskNew = lazy(() => import('@/pages/Tasks/New').then((module) => ({ default: module.TaskNew })));
const TaskEdit = lazy(() => import('@/pages/Tasks/Edit').then((module) => ({ default: module.TaskEdit })));

// Componente de loading
const ContentLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// Componente de loading
const PageLoader = () => (
  <Box
    sx={{
      minHeight: '100dvh',
    }}
  >
    <LinearProgress />
  </Box>
);

// Wrapper com Suspense
const SuspenseWrapper = ({ children, page }: { children: React.ReactNode; page?: boolean }) => (
  <Suspense fallback={page ? <PageLoader /> : <ContentLoader />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseWrapper page>
        <AppLayout />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: 'tasks',
        element: (
          <SuspenseWrapper page>
            <TasksLayout />
          </SuspenseWrapper>
        ),
        children: [
          {
            path: '',
            element: (
              <SuspenseWrapper>
                <TaskList />
              </SuspenseWrapper>
            ),
            children: [
              {
                path: 'new',
                element: (
                  <SuspenseWrapper>
                    <TaskNew />
                  </SuspenseWrapper>
                ),
              },
              {
                path: ':taskId',
                element: (
                  <SuspenseWrapper>
                    <TaskEdit />
                  </SuspenseWrapper>
                ),
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
