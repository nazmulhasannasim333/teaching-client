import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/DashBoard";
import Main from "../Layout/Main";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Classes from "../pages/Classes/Classes";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManageClasses from "../pages/Dashboard/AdminDashboard/Manageclasses/ManageClasses";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import MyEnrolledClass from "../pages/Dashboard/StudentDashboard/MyEnrolledClass/MyEnrolledClass";
import MySelectedClass from "../pages/Dashboard/StudentDashboard/MySelectedClass/MySelectedClass";
import Payment from "../pages/Dashboard/StudentDashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
     // Admin Dashboard Routes
      {
        path: "manageusers",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "manageclasses",
        element: <AdminRoute><ManageClasses /></AdminRoute>,
      },
    //   IInstructor Dashboard routes
      {
        path: "myclasses",
        element: <InstructorRoute><MyClasses /></InstructorRoute>,
      },
      {
        path: "addclasses",
        element: <InstructorRoute><AddClass /></InstructorRoute>,
      },
    //   Student Dashboard Routes
      {
        path: "myselectedclass",
        element: <MySelectedClass />,
      },
      {
        path: "myenrolledclass",
        element: <MyEnrolledClass />,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
        fetch(`http://localhost:5000/select/${params.id}`),
      },
    ],
  },
]);

export default router;
