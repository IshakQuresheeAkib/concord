/* eslint-disable react-refresh/only-export-components */

import {createBrowserRouter} from "react-router-dom";
import { lazy } from 'react';
import Main from "../Layout/Main";
import PrivateRoutes from "./PrivateRoutes/PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

const ErrorElement = lazy(() => import("../Pages/ErrorElement/ErrorElement"));
const Faq = lazy(() => import("../Pages/Shared/Faq/Faq"));
const ContactUs = lazy(() => import("../Pages/Shared/ContactUs/ContactUs"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Signup = lazy(() => import("../Pages/Signup/Signup"));
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard/Dashboard"));
const EditBiodata = lazy(() => import("../Pages/Dashboard/EditBiodata/EditBiodata"));
const ViewBiodata = lazy(() => import("../Pages/Dashboard/ViewBiodata/ViewBiodata"));
const ContactRequest = lazy(() => import("../Pages/Dashboard/ContactRequest/ContactRequest"));
const Favourite = lazy(() => import("../Pages/Dashboard/Favourite/Favourite"));
const AdminDashboard = lazy(() => import("../Pages/Dashboard/Admin/AdminDashboard/AdminDashboard"));
const ManageUsers = lazy(() => import("../Pages/Dashboard/Admin/ManageUsers/ManageUsers"));
const ApprovedPremium = lazy(() => import("../Pages/Dashboard/Admin/ApprovedPremium/ApprovedPremium"));
const ApprovedContactReq = lazy(() => import("../Pages/Dashboard/Admin/ApprovedContactReq/ApprovedContactReq"));
const BiodataDetails = lazy(() => import("../Pages/BiodataDetails/BiodataDetails"));
const Checkout = lazy(() => import("../Pages/Checkout/Checkout"));
  
export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorElement></ErrorElement>,
      children:[       
        {
          path:'/faq',
          element:<Faq></Faq>
        },
        {
          path:'/contact-us',
          element:<ContactUs></ContactUs>
        },            
        {
          path:'/biodatas'          
        },
        {
          path:'/about-us',
          element:<AboutUs></AboutUs>
        },
        {
          path:'/biodata-details/:id',
          element:<PrivateRoutes><BiodataDetails></BiodataDetails></PrivateRoutes>
        },
        {
          path:'/checkout/:id',
          element:<PrivateRoutes><Checkout></Checkout></PrivateRoutes>
        },
        
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children:[
        // users route
        {
          path:'/dashboard/edit',
          element:<UserRoute><EditBiodata></EditBiodata></UserRoute>
        },
        {
          path:'/dashboard/view-biodata/:id',
          element:<UserRoute><ViewBiodata></ViewBiodata></UserRoute>
        },
        {
          path:'/dashboard/contact-request',
          element:<UserRoute><ContactRequest></ContactRequest></UserRoute>
        },
        {
          path:'/dashboard/favourite-biodata',
          element:<UserRoute><Favourite></Favourite></UserRoute>
        },
        // admin routes
        {
          path:'/dashboard/admin/admin-dashboard',
          element:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
        },
        {
          path:'/dashboard/admin/manage-users',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'/dashboard/admin/approved-premium',
          element:<AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
        },
        {
          path:'/dashboard/admin/approved-contact-request',
          element:<AdminRoute><ApprovedContactReq></ApprovedContactReq></AdminRoute>
        },
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/signup',
      element:<Signup></Signup>
    },
  ]);