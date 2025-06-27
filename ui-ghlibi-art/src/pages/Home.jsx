import React from 'react';
import hero from '../assets/hero.jpg';
import card1 from '../assets/card1.jpg'
import card2 from '../assets/card2.png'
import card3 from '../assets/card3.jpg'
import section3 from '../assets/section3.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <img
          src={hero}
          alt="Studio Ghibli Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-6">
          <h1 className="text-blue-800 text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight">
            Crie sua arte<br />
            como a mágica
            do Estúdio Ghibli
          </h1>
          <p className="text-blue-600 bg-blue-100 text-lg md:text-xl max-w-2xl drop-shadow p-2 rounded">
            Junte-se a milhares de artistas e fãs do Studio Ghibli que estão criando obras incríveis inspiradas em Miyazaki com nosso gerador de arte Ghibli AI.
          </p>
          <Link to="/criar">
            <button className="bg-blue-600 py-3 px-8 rounded-lg text-white text-lg font-medium hover:bg-blue-500 transition cursor-pointer ">
              Criar
            </button>
          </Link>
        </div>
      </div>

      {/* Why Generate Section */}
      <section className="bg-white py-12 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10">
          Por que criar arte com estilo Ghibli?
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-blue-50 rounded-xl shadow-md p-6 text-center">
            <img
              src={card1}
              alt="Card 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Estética Encantadora</h3>
            <p className="text-gray-600 mb-4">
              As artes em estilo Ghibli capturam uma beleza nostálgica, mágica e emocional que encanta qualquer um.
            </p>
            <Link to="/criar">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition cursor-pointer">
                Experimentar
              </button>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-50 rounded-xl shadow-md p-6 text-center">
            <img
              src={card2}
              alt="Card 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Criatividade Sem Limites</h3>
            <p className="text-gray-600 mb-4">
              Dê vida a ideias surreais e personagens únicos com nosso gerador de arte alimentado por IA.
            </p>
            <Link to="/criar">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition cursor-pointer">
                Criar Agora
              </button>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-50 rounded-xl shadow-md p-6 text-center">
            <img
              src={card3}
              alt="Card 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Inspirado por Miyazaki</h3>
            <p className="text-gray-600 mb-4">
              Honre o legado de Hayao Miyazaki criando artes que refletem os mundos mágicos que ele nos deu.
            </p>
            <Link to="/criar">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition cursor-pointer">
                Começar
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="bg-blue-50 py-16 px-4 md:px-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Imagem explicativa */}
    <img
      src={section3}
      alt="Como usar a plataforma"
      className="w-full h-auto rounded-xl shadow-lg"
    />

    {/* Texto explicativo */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
        Como usar a plataforma?
      </h2>
      <ul className="space-y-4 text-gray-700 text-lg leading-relaxed list-disc list-inside">
        <li>
          <strong>Escolha um método:</strong> Você pode descrever a imagem com palavras ou enviar uma imagem como base.
        </li>
        <li>
          <strong>Geração com IA:</strong> Nossa IA transforma suas ideias em uma obra no estilo Ghibli com alta qualidade.
        </li>
        <li>
          <strong>Visualize e baixe:</strong> Veja o resultado e salve para compartilhar ou inspirar novos projetos.
        </li>
        <li>
          <strong>É rápido e gratuito!</strong> Basta clicar em “Criar” e começar agora mesmo.
        </li>
      </ul>

      <Link to="/criar">
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition">
          Começar Agora
        </button>
      </Link>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;
