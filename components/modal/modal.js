import React from 'react';
import './modal.css'; 

function modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null; 

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        {children}
      </div>
    </div>
  );
}

export default modal;