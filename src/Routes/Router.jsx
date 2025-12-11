import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Components/About/About";
import Tuitions from "../Pages/Tuitions/Tuitions";
import Tutors from "../Pages/Tutors/Tutors";

import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import TutorRoute from "./TutorRoute";

// Student Pages
import PostNewTuition from "../Pages/Dashboard/Post New Tuition/PostNewTuition";
import MyTuitions from "../Pages/Dashboard/My Tuitions/MyTuitions";
import AppliedTutors from "../Pages/Dashboard/Applied Tutors/AppliedTutors";
import PaymentHistory from "../Pages/Dashboard/Payment History/PaymentHistory";
import ProfileSettings from "../Pages/Dashboard/Profile Settings/ProfileSettings";

// Tutor Pages
import MyApplications from "../Pages/Dashboard/My Applications/MyApplications";
import OngoingTuitions from "../Pages/Dashboard/Ongoing Tuitions/OngoingTuitions";
import RevenueHistory from "../Pages/Dashboard/Revenue History/RevenueHistory";

// Admin Pages
import ManageUsers from "../Pages/Dashboard/Manage Users/ManageUsers";
import ManageTuitions from "../Pages/Dashboard/Manage Tuitions/ManageTuitions";
import ReportsAnalytics from "../Pages/Dashboard/Reports Analytics/ReportsAnalytics";
import TuitionDetails from "../Pages/Tuition Details/TuitionDetails";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancel";
import DashboardHome from "../Pages/Dashboard/Dashboard Homes/DashboardHome";
import Error from "../Components/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "about",
        Component: About
      },
      {
        path: "tuitions",
        Component: Tuitions
      },
      {
        path: "tutors",
        Component: Tutors
      },
      {
        path: "tuition-details/:id",
        element: <PrivateRoute>
          <TuitionDetails />
        </PrivateRoute>
      }
    ]
  },

  // Auth Routes
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      }
    ]
  },

  // Dashboard Routes (Protected)
  {
    path: "dashboard",
    element:
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      // Student
      {
        path: "post-new-tuition",
        Component: PostNewTuition
      },
      {
        path: "my-tuitions",
        Component: MyTuitions
      },
      {
        path: "applied-tutors",
        Component: AppliedTutors
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
      {
        path: "profile-settings",
        Component: ProfileSettings
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel
      },

      // Tutor
      {
        path: "my-applications",
        element: <TutorRoute>
          <MyApplications />
        </TutorRoute>
      },
      {
        path: "ongoing-tuitions",
        element: <TutorRoute>
          <OngoingTuitions />
        </TutorRoute>
      },
      {
        path: "revenue-history",
        element: <TutorRoute>
          <RevenueHistory />
        </TutorRoute>
      },

      // Admin
      {
        path: "manage-users",
        element: <AdminRoute>
          <ManageUsers />
        </AdminRoute>
      },
      {
        path: "manage-tuitions",
        element: <AdminRoute>
          <ManageTuitions />
        </AdminRoute>
      },
      {
        path: "reports-analytics",
        element: <AdminRoute>
          <ReportsAnalytics />
        </AdminRoute>
      }
    ]
  }
]);
