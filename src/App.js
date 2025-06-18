import { BrowserRouter, Route, Routes } from "react-router";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardPage from "./pages/DashboardPage";
import SharesPage from "./pages/SharesPage";
import ContributionPage from "./pages/ContributionPage";
import { AuthProvider } from "./context";
import ProtectedRoute from "./context/protect";
import ProfilePage from "./pages/ProfilePage";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/ApolloClient";
import UsersPage from "./pages/UsersPage";

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
      <Route path="/shares" element={ <ProtectedRoute> <SharesPage  /> </ProtectedRoute>}  />
      <Route path="/users" element={ <ProtectedRoute> <UsersPage /> </ProtectedRoute>}  />
      <Route path="/contributions" element={ <ProtectedRoute> <ContributionPage  /> </ProtectedRoute>}  />
      <Route path="/profile" element={ <ProtectedRoute> <ProfilePage />  </ProtectedRoute> } />
    </Routes>
      </ApolloProvider>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
