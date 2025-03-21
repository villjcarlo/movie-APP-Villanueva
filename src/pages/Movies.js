import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import MoviesList from '../components/MoviesList';
import UserContext from '../context/UserContext';

export default function Movies() {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);  // Ensure movies is an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
        fetch("https://movieapp-api-lms1.onrender.com/movies/getMovies", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data.movies)
            if (Array.isArray(data.movies)) {
                setMovies([...data.movies]); // Ensure a fresh state update
            } else {
                setMovies([]);
            }
        })
        .catch(err => console.error("Error fetching movies:", err));
    };



    useEffect(() => {
        fetchData();
    }, []);

    // if (loading) return <p>Loading movies...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return user.isAdmin ? (
        <AdminView moviesData={movies} fetchData={fetchData} />
    ) : (
        <MoviesList moviesData={movies}/>
    );
}
