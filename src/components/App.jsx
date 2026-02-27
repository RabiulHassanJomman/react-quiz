import '../components/styles/app.css';
import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Home /> */}
        <Signup />
      </Layout>
    </div>
  );
}

export default App;
