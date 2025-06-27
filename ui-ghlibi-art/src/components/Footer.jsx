import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Art Generate Ghibli. Todos os direitos reservados.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-blue-400 text-sm">Política de Privacidade</a>
          <a href="#" className="hover:text-blue-400 text-sm">Termos de Uso</a>
          <a href="#" className="hover:text-blue-400 text-sm">Contato</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
