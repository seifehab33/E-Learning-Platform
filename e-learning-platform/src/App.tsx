// src/App.tsx
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { lazy, Suspense, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import Home from "./Pages/Home/Home";
import { NavbarWithMegaMenu } from "./components/Navbar/Navbar";
import SpinnerFallback from "./components/SpinnerFallback/SpinnerFallback";
import SignUp from "./Pages/SignUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FooterWithSocialLinks from "./components/Footer/Footer";
import CourseDetails from "./Pages/Home/CourseDetails/CourseDetails";

const InstructorLayout = lazy(
  () => import("./Pages/Instructor/InstructorMain/InstructorLayout")
);
const CourseLayout = lazy(() => import("./Pages/Courses/CourseLayout"));
const Blogs = lazy(() => import("./Pages/Blogs/Blogs"));
const SignIn = lazy(() => import("./Pages/SignIn/SignIn"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
function MainLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <NavbarWithMegaMenu />}
      <div className="flex-grow">
        <Suspense fallback={<SpinnerFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instructor" element={<InstructorLayout />} />
            <Route path="/courses" element={<CourseLayout />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart/:id" element={<Cart />} />
              <Route
                path="/course-details/:courseId"
                element={<CourseDetails />}
              />
            </Route>{" "}
          </Routes>
        </Suspense>
      </div>
      {!isAuthPage && <FooterWithSocialLinks />}
    </div>
  );
}

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainLayout />
        </Router>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
