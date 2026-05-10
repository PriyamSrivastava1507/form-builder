import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './index.css';

import { createBrowserRouter} from "react-router";
import { RouterProvider } from 'react-router';

import RootLayout from './layouts/RootLayout';
import SuspenseWrapper from './components/SuspenseWrapper';

const FormRootPage = lazy(() => import('./pages/FormRootPage'));
const FormBuilderPage = lazy(() => import('./pages/FormBuilderPage'));
const FormOutputPage = lazy(() => import('./pages/FormOutputPage'));
const FormPreviewPage = lazy(() => import('./pages/FormPreviewPage'));
const FormSeeAllTemplates = lazy(() => import('./pages/FormSeeAllTemplates'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper><FormRootPage /></SuspenseWrapper>
      },
      {
        path: "see-all-templates",
        element: <SuspenseWrapper><FormSeeAllTemplates /></SuspenseWrapper>
      },
      {
        path: "format-selection",
        element: <SuspenseWrapper><FormBuilderPage /></SuspenseWrapper>
      },
      {
        path: "builder",
        element: <SuspenseWrapper><FormBuilderPage /></SuspenseWrapper>
      },
      {
        path: "preview",
        element: <SuspenseWrapper><FormPreviewPage /></SuspenseWrapper>
      },
      {
        path: "output",
        element: <SuspenseWrapper><FormOutputPage /></SuspenseWrapper>
      }
    ]
  }
])

// Primary application entry point that mounts the React app to the root DOM node
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <Toaster 
      position="bottom-right" 
      toastOptions={{
        classNames: {
          toast: 'bg-background text-foreground border border-border shadow-card',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
          cancelButton: 'bg-muted text-muted-foreground hover:bg-muted/80',
          success: 'text-success border-success/20 bg-success/10',
          error: 'text-destructive border-destructive/20 bg-destructive/10',
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
)
