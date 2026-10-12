import React from 'react';
import '../assets/header.css';
import { useNavigate, Link } from 'react-router-dom';

function Header() {

const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Signout successful');
        
        navigate('/login');
      } else {
        console.error('Signout failed');
      }
    } catch (error) {
      console.error('Error during signout:', error);
    }
  };

  return (
    <header className="site-header">
      <nav>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/files">Files</Link></li>
          <li><Link to="/login" onClick={handleSignOut}>
            Signout
          </Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;