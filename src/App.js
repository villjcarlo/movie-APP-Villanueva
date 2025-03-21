import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './components/MovieDetails';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
//import Error from './pages/Error';

// User Context for Authentication
import { createContext } from 'react';
export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('https://movieapp-api-lms1.onrender.com/users/details', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => res.json())
      .then(data => {
        console.log("data from app.js", data);
        if (data.user && data.user._id) {
          setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
        }
      });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            {/*<Route path="*" element={<Error />} />*/}
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
