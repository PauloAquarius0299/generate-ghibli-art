import React, { useState } from 'react';
import GenerateByText from '../components/GenerateByText';
import GenerateByImage from '../components/GenerateByImage';

const Criar = () => {
  const [tab, setTab] = useState('texto');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Criar Arte no Estilo Ghibli</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setTab('texto')}
            className={`py-2 px-4 rounded-lg cursor-pointer font-medium ${
              tab === 'texto' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            Por Texto
          </button>
          <button
            onClick={() => setTab('imagem')}
            className={`py-2 px-4 rounded-lg cursor-pointer font-medium ${
              tab === 'imagem' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            Por Imagem
          </button>
        </div>

        {/* Conteúdo das abas */}
        {tab === 'texto' ? <GenerateByText /> : <GenerateByImage />}
      </div>
    </div>
  );
};

export default Criar;
