import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    return (
        <div className="card shadow-sm">
            
            <div className="card-body text-center">
                <h5 className="card-title">{movie.title}</h5>
                <p className="text-muted">{movie.genre}</p>
                <p className="card-text text-truncate" style={{ maxHeight: "60px", overflow: "hidden" }}>
                    {movie.description}
                </p>
                <button 
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => navigate(`/movie/${movie._id}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
