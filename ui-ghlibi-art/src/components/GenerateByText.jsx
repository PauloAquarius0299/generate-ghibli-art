import React, { useState } from 'react';

const GenerateByText = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Digite uma descrição válida.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      await new Promise((res) => setTimeout(res, 2000));
      setGeneratedImage('https://i.pinimg.com/564x/5f/49/43/5f4943d18293a1d93e4f73e6078453fb.jpg');
      onGenerate && onGenerate();
    } catch (err) {
      setError('Erro ao gerar imagem.', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a cena Ghibli que deseja criar..."
        rows={4}
        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? 'Gerando...' : 'Criar Imagem'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="w-full h-80 mt-6 flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50">
        {generatedImage ? (
          <img src={generatedImage} alt="Gerada" className="h-full object-cover rounded-lg" />
        ) : (
          <p className="text-gray-400 text-center px-4">Sua imagem aparecerá aqui após a geração.</p>
        )}
      </div>
    </div>
  );
};

export default GenerateByText;
