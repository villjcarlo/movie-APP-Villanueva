import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useState } from 'react';

export default function DeleteMovie({ movieId, fetchData }) {
    const id = movieId;
    const [movies, setMovies] = useState([]);  // Ensure movies is an array

    const handleDelete = (movieId) => {
    // Instantly remove the movie from UI
    setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));

    fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log("Delete response:", data);
        fetchData(); // Fetch updated list from API
    })
    .catch(error => console.error("Error deleting movie:", error));
};


    return (
        <Button variant="danger" onClick={handleDelete}>
            Delete
        </Button>
    );
}
