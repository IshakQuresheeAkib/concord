import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";
import Faq from "../Pages/Shared/Faq/Faq";
import ContactUs from "../Pages/Shared/ContactUs/ContactUs";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes/PrivateRoute";
import EditBiodata from "../Pages/Dashboard/EditBiodata/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/ViewBiodata/ViewBiodata";
import ContactRequest from "../Pages/Dashboard/ContactRequest/ContactRequest";
import Favourite from "../Pages/Dashboard/Favourite/Favourite";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium/ApprovedPremium";
import ApprovedContactReq from "../Pages/Dashboard/Admin/ApprovedContactReq/ApprovedContactReq";
import AdminRoute from "./AdminRoute";
import BiodataDetails from "../Pages/BiodataDetails/BiodataDetails";
import Checkout from "../Pages/Checkout/Checkout";
import UserRoute from "./UserRoute";
  
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