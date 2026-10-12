import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Homepage from './pages/home';
import Login from './pages/login';
import './App.css';

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;