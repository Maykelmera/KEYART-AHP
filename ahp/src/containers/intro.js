import React, { useState } from 'react';
import Modal from './Modal';

export default function Intro({ closeIntro, obtainData }) {
  const [popup, setPopup] = useState(false);

  function onExit(exit) {
    setPopup(exit);
  }

  function deleteDatabase() {
    setPopup(true);
    if (localStorage.getItem('localAlternativeEigen')) {
      localStorage.removeItem('localAlternativeEigen');
    }
    if (localStorage.getItem('localCriteriaEigen')) {
      localStorage.removeItem('localCriteriaEigen');
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-24">
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">
          Herramienta de Analytic Hierarchy Process (AHP) para selección de proveedores en KeyArt
        </h2>
        <p className="text-lg font-medium text-white mb-8">
          ¿Desea acceder?
        </p>
        <div className="flex justify-center">
          <button
            onClick={deleteDatabase}
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Comenzar
          </button>
        </div>
      </div>
      <Modal isOpen={popup} obtainData={obtainData} onExit={onExit} closeIntro={closeIntro} />
    </div>
  );
}
