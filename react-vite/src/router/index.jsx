import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import RestaurantsPage from '../components/RestaurantsPage/RestaurantsPage';
import Layout from './Layout';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage/RestaurantDetailsPage';
import CheckoutPage from '../components/Checkout/CheckoutPage';
import CreateItemForm from '../components/MenuItemForm/CreateItemForm';
import EditItemForm from '../components/MenuItemForm/EditItemForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>
      },
      {
        path: "items/:id",
        element: <EditItemForm />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "menus/:id/items",
        element: <CreateItemForm />
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
      },
      {
        path: 'checkout',
        element: < CheckoutPage />
      }
    ],
  },
]);
