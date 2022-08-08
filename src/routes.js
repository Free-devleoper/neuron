import Billing from "layouts/billing";
import { BsCreditCardFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import { IoBuild } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import Profile from "layouts/profile";
import RTL from "layouts/rtl";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Tables from "layouts/tables";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <IoStatsChart size="15px" color="inherit" />,
  //   component: Tables,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <BsCreditCardFill size="15px" color="inherit" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <IoBuild size="15px" color="inherit" />,
  //   component: RTL,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <BsFillPersonFill size="15px" color="inherit" />,
  //   component: Profile,
  //   noCollapse: true,
  // },
];

export default routes;
