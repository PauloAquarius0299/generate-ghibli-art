import React, { useState } from 'react';
import { Download, RefreshCcw, ImagePlus } from 'lucide-react';

const GenerateByImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Studio Ghibli');

  const isCreateDisabled = isLoading || (!prompt.trim() && !imageFile);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    if (!imageFile && !prompt.trim()) {
      setError('Adicione uma imagem ou escreva um prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const payload = { prompt, style };

    try {
      const API_URL = 'http://localhost:8080/api/v1/generate-from-text';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro: ${response.status} - ${errorText}`);
      }

      const resultBlob = await response.blob();
      setGeneratedImage(URL.createObjectURL(resultBlob));
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      setError('Falha ao gerar imagem. Verifique se o backend está rodando.');
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

  const handleCreateAnother = () => {
    setGeneratedImage(null);
    setPrompt('');
    setStyle('Studio Ghibli');
    setError(null);
  };

  return (
    <div>
      {/* Upload/Preview */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 mb-4"
      >
        {previewImage ? (
          <img src={previewImage} alt="Preview" className="h-full object-contain" />
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <ImagePlus className="w-5 h-5" />
            <p>Arraste uma imagem aqui ou selecione abaixo</p>
          </div>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleSelect} className="mb-4" />

      {/* Prompt */}
      <textarea
        placeholder="Descreva os detalhes da imagem (ex: clima, atmosfera, personagens...)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      {/* Gerar botão */}
      {!generatedImage && (
        <button
          onClick={handleGenerate}
          disabled={isCreateDisabled}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? 'Gerando...' : 'Criar Imagem'}
        </button>
      )}

      {/* Erro */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Resultado */}
      <div className="w-full h-80 mt-6 flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50">
        {generatedImage ? (
          <img src={generatedImage} alt="Gerada" className="h-full object-cover rounded-lg" />
        ) : (
          <p className="text-gray-400 text-center px-4">Sua imagem aparecerá aqui após a geração.</p>
        )}
      </div>
      {generatedImage && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition"
          >
            <Download className="w-5 h-5" /> Baixar
          </button>
          <button
            onClick={handleCreateAnother}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            <RefreshCcw className="w-5 h-5" /> Gerar Outra
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateByImage;
