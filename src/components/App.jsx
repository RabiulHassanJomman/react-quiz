import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../components/styles/app.css";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/quiz/:id"
                element={
                  <PrivateRoute>
                    <Quiz />
                  </PrivateRoute>
                }
              />
              <Route
                path="/result/:id"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
