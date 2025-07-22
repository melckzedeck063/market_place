import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./context";
import ProtectedRoute from "./context/protect";
import ProfilePage from "./pages/ProfilePage";
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/ApolloClient";
import UsersPage from "./pages/UsersPage";
import { ToastContainer } from "react-toastify";
import OrdersPage from "./pages/OrdersPage";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <ApolloProvider client={client}>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route  path="/login" element={<LoginPage /> }  /> */}
      <Route path="/forgot" element={ <ForgotPassword /> } />
      <Route path="/dashboard" element={ <ProtectedRoute> <DashboardPage /> </ProtectedRoute> } />
      <Route path="/restaurants" element={ <ProtectedRoute> <RestaurantPage  /> </ProtectedRoute>}  />
      <Route path="/users" element={ <ProtectedRoute> <UsersPage /> </ProtectedRoute>}  />
      <Route path="/orders" element={ <ProtectedRoute> <OrdersPage  /> </ProtectedRoute>}  />
      <Route path="/profile" element={ <ProtectedRoute> <ProfilePage />  </ProtectedRoute> } />
    </Routes>
      </ApolloProvider>
    </AuthProvider>
    </BrowserRouter>

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </>
  );
}

export default App;
