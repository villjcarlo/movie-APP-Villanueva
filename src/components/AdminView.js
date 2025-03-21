import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

// Import components
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie'; 

export default function AdminView({ moviesData, fetchData }) {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '', description: '', genre: '' });

    useEffect(() => {
        //console.log("Fetched Movies:", moviesData);
        if (Array.isArray(moviesData)) {
            setMovies(moviesData);
        } else {
            console.error("moviesData is not an array:", moviesData);
        }
    }, [moviesData]);

    const handleAddMovie = () => {
        fetch("https://movieapp-api-lms1.onrender.com/movies/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newMovie)
        })
        .then(res => res.json())
        .then(() => {
            fetchData();
            setShowModal(false);
            setNewMovie({ title: '', director: '', year: '', description: '', genre: '' });
        })
        .catch(error => console.error("Error adding movie:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <Button className="mb-3" onClick={() => setShowModal(true)}>Add Movie</Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Genre</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.year}</td>
                                <td>{movie.description}</td>
                                <td>{movie.genre}</td>
                                <td className={!movie.isActive ? "text-success" : "text-danger"}>
                                    {!movie.isActive ? "Available" : "Unavailable"}
                                </td>
                                <td>
                                    <UpdateMovie movie={movie} fetchData={fetchData} />
                                </td>
                                <td className="text-center">
                                    <DeleteMovie movieId={movie._id} fetchData={fetchData} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No movies available</td>
                        </tr>
                    )}
                </tbody>
            </Table>    

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Director</Form.Label>
                            <Form.Control type="text" value={newMovie.director} onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" value={newMovie.year} onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddMovie}>Add Movie</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}