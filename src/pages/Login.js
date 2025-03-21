import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const retrieveUserDetails = (token) => {
        fetch(`https://movieapp-api-lms1.onrender.com/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
        });
    };

    function authenticate(e) {
        e.preventDefault();
        
        fetch(`https://movieapp-api-lms1.onrender.com/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Login API Response:", data); // Debugging log

            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to The Movie Hub!",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            }
        })
        .catch(error => console.error("Login Error:", error));

        setEmail('');
        setPassword('');
    }


    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return user.id !== null ? (
        <Navigate to="/movies" />
    ) : (
        <Container fluid>
            <div className='row mt-5 pt-5'>
                <div className='col-md-4 mx-auto'>
                    <Form onSubmit={authenticate} className="w-100">
                        <h1 className="text-center">Login</h1>
                        <Form.Group className="mt-4">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" required value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-2 mb-4">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" required value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Container className="text-center">
                            <Button type="submit" className="btn-primary py-2 px-4" disabled={!isActive}>Log In</Button>
                        </Container>
                    </Form>
                </div>
            </div>
        </Container>
    );
}