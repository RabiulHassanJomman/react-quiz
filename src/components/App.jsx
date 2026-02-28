import "../components/styles/app.css";
import Layout from "./Layout";
import Result from "./pages/Result";

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Home />
            <Signup />
            <Login />
            <Quiz />*/}
        <Result />
      </Layout>
    </div>
  );
}

export default App;
