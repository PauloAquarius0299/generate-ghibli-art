import React, { useEffect, useState } from "react";
import axios from "axios";

const Ghibli = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films") // endpoint correto
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes da Ghibli:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando filmes...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Filmes do Studio Ghibli
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((film) => (
          <div
            key={film.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
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
    </div>
  );
};

export default Ghibli;
