import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(`getMovie data`, data)
                setMovie(data)});

        fetch(`https://movieapp-api-lms1.onrender.com/movies/getComments/${id}`,{
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }

        })
        .then(res => res.json())
        .then(data => {
            console.log("getComments data", data.comments);  
            setComments(Array.isArray(data.comments) ? data.comments : []);  
        });
    }, [id]);

    const handleAddComment = () => {
        if (!comment.trim()) return; // Prevent empty comments

        fetch(`https://movieapp-api-lms1.onrender.com/movies/addComment/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ comment })
        })
        .then(res => res.json())
        .then((data) => {
            console.log("New comment added:", data);

            // ✅ Add the new comment to the list instantly
            setComments(prevComments => [
                ...prevComments,
                { comment, dateAdded: new Date().toISOString() } // Ensuring date format
            ]);

            setComment('');
        })
        .catch(err => console.error("Failed to add comment:", err));
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p>{movie.description}</p>
            
            <h3>Comments</h3>
            <ul>
                {comments.map((c, index) => (
                    <li key={index}>{c.comment}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Add a comment" 
            />
            <button id='addComment' onClick={handleAddComment}>Submit</button>
        </div>
    );
}
