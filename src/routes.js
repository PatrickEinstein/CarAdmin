import React from "react";
import { Redirect } from "react-router-dom";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdLock,
  MdPeople,
  MdLibraryBooks
} from "react-icons/md";

import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import Users from "views/admin/users";
import UserDetails from "views/admin/userDetails";
import Products from "views/admin/products";
import ProductDetails from "views/admin/productDetails";
import AddProduct from "views/admin/addProduct";

import SignInCentered from "views/auth/signIn";
import RegisterCentered from "views/auth/register";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;

  if (isLoggedIn) {
    return <Component {...rest} />;
  } else {
    return <Redirect to="/auth/sign-in" />;
  }
};


const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: () => <ProtectedRoute component={MainDashboard} />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: () => <ProtectedRoute component={Profile} />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: () => <ProtectedRoute component={Users} />,
  },
  {
    name: "User Details",
    layout: "/admin",
    path: "/user/:id",
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: () => <ProtectedRoute component={UserDetails} />,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "/products",
    icon: (
      <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />
    ),
    component: () => <ProtectedRoute component={Products} />,
  },
  {
    name: "Product Details",
    layout: "/admin",
    path: "/product/:id",
    icon: (
      <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />
    ),
    component: () => <ProtectedRoute component={ProductDetails} />,
  },
  {
    name: "Add Products",
    layout: "/admin",
    path: "/add-product",
    icon: (
      <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />
    ),
    component: () => <ProtectedRoute component={AddProduct} />,
  },
  {
    name: "Add Products",
    layout: "/admin",
    path: "/edit-product/:id",
    icon: (
      <Icon as={MdLibraryBooks} width="20px" height="20px" color="inherit" />
    ),
    component: () => <ProtectedRoute component={AddProduct} />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Register",
    layout: "/auth",
    path: "/register",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: RegisterCentered,
  },
];

export default routes;
