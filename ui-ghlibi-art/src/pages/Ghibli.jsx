import React, { useEffect, useState } from "react";
import axios from "axios";

const Ghibli = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); // filme aberto no modal

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes da Ghibli:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando filmes...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Filmes do Studio Ghibli
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((film) => (
          <div
            key={film.id}
            onClick={() => setSelectedMovie(film)}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={film.image}
              alt={film.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{film.title}</h2>
              <p className="text-gray-700 text-sm mb-2">
                {film.description.slice(0, 100)}...
              </p>
              <p className="text-gray-500 text-xs">
                Diretor: {film.director} | Ano: {film.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-white rounded-lg max-w-6xl w-full max-h-full overflow-auto flex"
            onClick={(e) => e.stopPropagation()} // evitar fechar ao clicar dentro do modal
          >
            {/* Banner lado esquerdo */}
            <div className="w-1/2">
              <img
                src={selectedMovie.movie_banner}
                alt={selectedMovie.title}
                className="object-cover h-full w-full rounded-l-lg"
              />
            </div>

            {/* Conteúdo lado direito */}
            <div className="w-1/2 p-6 flex flex-col overflow-y-auto">
              <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
              <h3 className="text-xl italic mb-2">
                {selectedMovie.original_title} (
                {selectedMovie.original_title_romanised})
              </h3>
              <p className="text-gray-700 mb-4">{selectedMovie.description}</p>
              <p>
                <strong>Diretor:</strong> {selectedMovie.director}
              </p>
              <p>
                <strong>Produtor:</strong> {selectedMovie.producer}
              </p>
              <p>
                <strong>Ano:</strong> {selectedMovie.release_date}
              </p>
              <p>
                <strong>Duração:</strong> {selectedMovie.running_time} minutos
              </p>
              <p>
                <strong>Score Rotten Tomatoes:</strong> {selectedMovie.rt_score}
              </p>

              <button
                className="mt-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-500 self-start cursor-pointer"
                onClick={() => setSelectedMovie(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ghibli;
