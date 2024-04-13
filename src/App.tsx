import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import ROUTES from './routes';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([{ path: ROUTES.home, element: <Home /> }]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
