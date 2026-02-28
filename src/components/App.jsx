import '../components/styles/app.css';
import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quiz from './pages/Quiz';

function App() {
  return (
    <div className="App">
      <Layout>
        <Home />
        <Signup />
        <Login />
        <Quiz />
      </Layout>
    </div>
  );
}

export default App;
