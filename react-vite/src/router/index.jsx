import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import RestaurantsPage from '../components/RestaurantsPage/RestaurantsPage';
import Layout from './Layout';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage/RestaurantDetailsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "restaurants",
        element: <RestaurantsPage />
      },
      {
        path: "restaurants/:id",
        element: <RestaurantDetailsPage/>
      }
    ],
  },
]);
