import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout';
import { Home } from './pages/home';
import { Projects } from './pages/projects';
import { ProjectDetail } from './pages/project-detail';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Profile } from './pages/profile';
import { Admin } from './pages/admin';
import { NotFound } from './pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'projects', Component: Projects },
      { path: 'projects/:id', Component: ProjectDetail },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'profile', Component: Profile },
      { path: 'admin', Component: Admin },
      { path: '*', Component: NotFound },
    ],
  },
]);
