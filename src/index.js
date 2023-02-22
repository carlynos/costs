import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Company from './pages/Company';
import Contact from './pages/Contact';
import NewProject from './pages/NewProject';
import { Projects } from './pages/Projects';
import Project from './pages/Project';


const router = createBrowserRouter([
  {path: "/", 
  element: <App />,
  children: [
    {path: "/", element: <Home />},
    {path: "/contact", element: <Contact />},
    {path: "/company", element: <Company />},
    {path: "/project/:id", element: <Project />},
    {path: "/projects", element: <Projects />},
    {path: "/newproject", element: <NewProject />},
  ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

