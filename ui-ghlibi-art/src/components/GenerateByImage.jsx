import React, { useState } from 'react';

const GenerateByImage = ({ onGenerate }) => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    if (!imageFile) {
      setError('Selecione uma imagem primeiro.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      await new Promise((res) => setTimeout(res, 2000));
      setGeneratedImage('https://i.pinimg.com/564x/9b/b4/92/9bb492eddd066e5e79e9f6ae2a280ed9.jpg');
      onGenerate && onGenerate();
    } catch (err) {
      setError('Erro ao gerar imagem.', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 mb-4"
      >
        {previewImage ? (
          <img src={previewImage} alt="Preview" className="h-full object-contain" />
        ) : (
          <p>Arraste uma imagem aqui ou selecione abaixo</p>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleSelect} className="mb-4" />

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

export default GenerateByImage;
