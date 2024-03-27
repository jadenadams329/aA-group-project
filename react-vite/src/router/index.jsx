import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import RestaurantsPage from '../components/RestaurantsPage/RestaurantsPage';
import Layout from './Layout';
import RestaurantDetailsPage from '../components/RestaurantDetailsPage/RestaurantDetailsPage';
import CheckoutPage from '../components/Checkout/CheckoutPage';
import RestaurantForm from '../components/RestaurantForm/RestaurantForm';
import CreateItemForm from '../components/MenuItemForm/CreateItemForm';
import EditItemForm from '../components/MenuItemForm/EditItemForm';
import Confirmation from '../components/Checkout/Confirmation';
import UpdateRestaurantForm from '../components/RestaurantForm/UpdateRestaurantForm';
import LandingPage from '../components/LandingPage/LandingPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "items/:id/edit",
        element: <EditItemForm />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "menus/:id/items/new",
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
        path: "restaurants/:id/edit",
        element: <UpdateRestaurantForm />
      },
      {
        path: "restaurants/new",
        element: <RestaurantForm />
      },
      {
        path: 'checkout',
        element: < CheckoutPage />
      },
      {
        path: 'confirmed',
        element:<Confirmation/>
      }
    ],
  },
]);
