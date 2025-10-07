import React, { useState, useEffect } from 'react';

function Modal({ type, title, message, inputValue = '', onConfirm, onClose }) {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleConfirm = () => {
    type === 'input' ? onConfirm?.(value) : onConfirm?.();
  };

  const handleKeyPress = (e) => {
    e.key === 'Enter' && handleConfirm();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {message && <p className="modal-message">{message}</p>}
          {type === 'input' && (
            <input
              type="text"
              className="modal-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              placeholder="Enter name..."
            />
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {(type === 'confirm' || type === 'input') && (
            <button 
              className={`btn ${type === 'confirm' ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleConfirm}
            >
              {type === 'confirm' ? 'Delete' : 'Create'}
            </button>
          )}
          {type === 'success' && (
            <button className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          )}
          {type === 'error' && (
            <button className="btn btn-danger" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
