import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { DialogProvider } from '@shared/dialog';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationProvider } from '@shared/toast';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NotificationProvider>
    </DialogProvider>
  </React.StrictMode>
);
