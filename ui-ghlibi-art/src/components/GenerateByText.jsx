import React, { useState } from 'react';
import { Download, RefreshCcw } from 'lucide-react';

const GenerateByText = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  //const [style, setStyle] = useState('Studio Ghibli'); 
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const isDisabled = isLoading || !prompt.trim();

  const handleGenerate = async () => {
  if (!prompt.trim()) {
    setError('Digite uma descrição válida.');
    return;
  }

  setIsLoading(true);
  setError(null);
  setGeneratedImage(null);

  try {
    const API_URL = 'http://localhost:8080/api/v1/generate-from-text';
    
    // Adicione mais dados necessários para a API
    const payload = {
      text_prompt: prompt,
      style_preset: 'anime', // Ou outro estilo compatível
      cfg_scale: 7,
      height: 512,
      width: 512,
      samples: 1,
      steps: 50
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // Adicione se necessário: 'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Erro ${response.status}: ${response.statusText}`
      );
    }

    const imageBlob = await response.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    setGeneratedImage(imageURL);
    onGenerate?.();
  } catch (err) {
    console.error('Erro detalhado:', err);
    setError(err.message || 'Erro ao gerar imagem. Tente novamente.');
  } finally {
    setIsLoading(false);
  }
};

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ghibli-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Descreva a cena Ghibli que deseja criar (ex: uma vila nas montanhas com neblina e espírito da floresta)..."
        rows={4}
        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {!generatedImage && (
        <button
          onClick={handleGenerate}
          disabled={isDisabled}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? 'Gerando...' : 'Criar Imagem'}
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="w-full h-80 mt-6 flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50">
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Imagem gerada"
            className="h-full object-cover rounded-lg"
          />
        ) : (
          <p className="text-gray-400 text-center px-4">Sua imagem aparecerá aqui após a geração.</p>
        )}
      </div>

      {/* Botões após gerar */}
      {generatedImage && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
          >
            <Download className="w-5 h-5" /> Baixar
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            <RefreshCcw className="w-5 h-5" /> Gerar Outra
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateByText;
