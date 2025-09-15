import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-300 text-center">{message}</p>
    </div>
  );
};

export default Loader;
