import MovieCard from "./MovieCard";

export default function MoviesList({ moviesData }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {moviesData.length > 0 ? (
                moviesData.map((movie) => <MovieCard key={movie._id} movie={movie} />)
            ) : (
                <p>No movies available.</p>
            )}
        </div>
    );
}
