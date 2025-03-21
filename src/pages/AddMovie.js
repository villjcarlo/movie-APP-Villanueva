import { Notyf } from 'notyf';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

const AddMovie = () => {
    const notyf = new Notyf();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");

    function createMovie(e) {
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log("Token:", token);

        fetch("https://movieapp-api-lms1.onrender.com/movies/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                director: director,
                year: year,
                description: description,
                genre: genre
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Response from server:", data);

            if (data.success) {
                setTitle("");
                setDirector("");
                setYear("");
                setDescription("");
                setGenre("");

                notyf.success("Movie added successfully! It will appear in the catalog.");
                navigate("/movies");
            } else {
                notyf.error(data.message || "Error: Something went wrong.");
            }
        })
        .catch(error => {
            console.error("Error adding movie:", error);
            notyf.error("Failed to add movie. Please try again.");
        });
    }

    return (
        (user?.isAdmin === true)
            ?
            <Container className="mt-5">
                <h1 className="text-center">Add New Movie</h1>
                <Form onSubmit={createMovie}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie title"
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Director:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter director's name"
                            required
                            value={director}
                            onChange={e => setDirector(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter release year"
                            required
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter movie description"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter genre"
                            required
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-3">Add Movie</Button>
                </Form>
            </Container>
            :
            <Navigate to="/movies" />
    );
}

export default AddMovie;
