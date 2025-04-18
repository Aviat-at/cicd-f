/** 
  All of the routes for the Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

// Additional imports
import React from 'react';
import AuthRoute from 'components/AuthRoute';
import Departments from "layouts/departments";
import Machines from "layouts/machines";
import { PowerSettingsNew } from "@mui/icons-material";
import Logout from "layouts/authentication/log-out";
import Jobs from "layouts/jobs";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <AuthRoute component={Dashboard} />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    route: "/departments",
    icon: <Office size="12px" />,
    component: <AuthRoute component={Departments} />,
    noCollapse: true,
  }, {
    type: "collapse",
    name: "Machines",
    key: "machines",
    route: "/machines",
    icon: <CreditCard size="12px" />,
    component: <AuthRoute component={Machines} />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Jobs",
    key: "jobs",
    route: "/jobs",
    icon: <CreditCard size="12px" />,
    component: <AuthRoute component={Jobs} />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <Document size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Log Out",
    key: "log-out",
    route: "/authentication/log-out",
    icon: <PowerSettingsNew size="12px" />,
    component: <Logout />,
    noCollapse: true,
  },
];

export default routes;
