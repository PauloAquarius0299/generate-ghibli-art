import React, { useState } from 'react';

const styles = [
  'Studio Ghibli',
  'Realista',
  'Pixel Art',
  'Anime',
  'Cyberpunk',
  'Pintura a óleo',
  'Surrealismo',
];

const DropdownStyleGhibli = ({ selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (style) => {
    onSelect(style);
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left text-gray-700 shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {selected || 'Escolha um estilo'}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => handleSelect(style)}
              className="w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700"
            >
              {style}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownStyleGhibli