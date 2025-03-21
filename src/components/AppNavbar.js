import { Navbar, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user, unsetUser } = useContext(UserContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Movie Catalog</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
        {user.id ? (
          <>
            {user.isAdmin && <Nav.Link as={Link} to="/movies">Admin Dashboard</Nav.Link>}
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}