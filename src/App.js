import { Route, Routes } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import Contact from "./components/pages/Contact";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;