import "../components/styles/app.css";

import FetchPost from "./FetchPost";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} /><Route
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
                path="/quiz"
                element={
                  <PrivateRoute>
                    <Quiz />
                  </PrivateRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
          </Layout>
        </AuthProvider>
      </Router> */}

      {/* <InfiniteScroll/> */}
      <FetchPost />
    </div>
  );
}

export default App;
