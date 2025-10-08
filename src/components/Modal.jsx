import React, { useState, useEffect } from 'react';

function Modal({ type, title, message, inputValue = '', folders = [], currentPath = '', onConfirm, onClose }) {
  const [value, setValue] = useState(inputValue);
  const [selectedFolder, setSelectedFolder] = useState('');

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const handleConfirm = () => {
    const confirmActions = {
      'input': () => onConfirm?.(value),
      'folder-picker': () => onConfirm?.(selectedFolder),
      'default': () => onConfirm?.()
    };
    
    (confirmActions[type] || confirmActions['default'])();
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
          {type === 'folder-picker' && (
            <div className="folder-picker">
              <div 
                className={`folder-option ${selectedFolder === '' ? 'selected' : ''}`}
                onClick={() => setSelectedFolder('')}
              >
                <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>/ (Root)</span>
              </div>
              {folders.map((folder) => (
                <div 
                  key={folder.fullPath}
                  className={`folder-option ${selectedFolder === folder.fullPath ? 'selected' : ''}`}
                  onClick={() => setSelectedFolder(folder.fullPath)}
                >
                  <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <span>{folder.fullPath}</span>
                </div>
              ))}
              {folders.length === 0 && currentPath === '' && (
                <p className="no-folders">No folders available. All items will be moved to root.</p>
              )}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {(type === 'confirm' || type === 'input' || type === 'folder-picker') && (
            <button 
              className={`btn ${type === 'confirm' ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleConfirm}
            >
              {type === 'confirm' ? 'Delete' : type === 'folder-picker' ? 'Move' : 'Create'}
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
