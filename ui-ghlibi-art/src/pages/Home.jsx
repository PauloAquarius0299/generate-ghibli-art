import React from 'react';
import hero from '../assets/hero.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Imagem de fundo */}
      <img
        src={hero}
        alt="Studio Ghibli Background"
        className="w-full h-full object-cover"
      />

      {/* Overlay azul suave */}
      <div className="absolute inset-0  bg-opacity-50" />

      {/* Conteúdo sobreposto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-6">
        <h1 className="text-blue-800 text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight">
          Crie sua arte<br />
          como a mágica
          do Estúdio Ghibli
        </h1>
        <p className="text-blue-600 bg-blue-200 text-lg md:text-xl max-w-2xl drop-shadow">
          Junte-se a milhares de artistas e fãs do Studio Ghibli que estão criando obras incríveis inspiradas em Miyazaki com nosso gerador de arte Ghibli AI.
        </p>
        <Link to="/criar">
          <button className='bg-blue-600 py-3 px-8 rounded-lg text-white text-lg font-medium hover:bg-blue-500 transition cursor-pointer'>
            Criar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
