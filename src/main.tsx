import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter} from "react-router";
import { RouterProvider } from 'react-router';

import FormBuilderPage from './pages/FormBuilderPage';
import FormOutputPage from './pages/FormOutputPage';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <FormBuilderPage />
      },
      {
        path: "format-selection",
        element: <FormBuilderPage />
      },
      {
        path: "output",
        element: <FormOutputPage />
      }
    ]
  }
])

// Primary application entry point that mounts the React app to the root DOM node
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
