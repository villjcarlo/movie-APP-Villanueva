import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UpdateMovie({ movie, fetchData }) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(movie.title);
    const [director, setDirector] = useState(movie.director);
    const [year, setYear] = useState(movie.year);
    const [description, setDescription] = useState(movie.description);
    const [genre, setGenre] = useState(movie.genre);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = () => {
        fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movie._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,
                director,
                year,
                description,
                genre
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.message === "Movie updated successfully") {
                Swal.fire("Success", "Movie updated successfully!", "success");
                fetchData();
                handleClose();
            } else {
                Swal.fire("Error", "Failed to update movie", "error");
            }
        });
    };

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={director} 
                                onChange={(e) => setDirector(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={year} 
                                onChange={(e) => setYear(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={genre} 
                                onChange={(e) => setGenre(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
