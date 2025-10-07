import React, { useState } from 'react';

function FileItem({ item, isSelected, onFolderClick, onRename, onDelete, onToggleSelection }) {
  const isFolder = item.type === 'folder';
  const [showUrl, setShowUrl] = useState(false);

  const handleClick = () => {
    isFolder && onFolderClick?.(item.fullPath);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL kopyalandı!');
  };

  const formatSize = (bytes) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`file-item ${isSelected ? 'selected' : ''}`}>
      <div className="file-item-main" onClick={handleClick}>
        <input
          type="checkbox"
          className="file-checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelection?.(item.fullPath);
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="file-icon">
          {isFolder ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <div className="file-info">
          <div className="file-name">{item.name}</div>
          <div className="file-meta">
            {!isFolder && (
              <>
                <span>{formatSize(item.size)}</span>
                <span className="separator">•</span>
                <span>{formatDate(item.lastModified)}</span>
              </>
            )}
            {isFolder && <span>Folder</span>}
          </div>
          {!isFolder && showUrl && item.downloadUrl && (
            <div className="file-url">
              <input 
                type="text" 
                value={item.downloadUrl} 
                readOnly 
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
      <div className="file-actions">
        {!isFolder && (
          <>
            <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowUrl(!showUrl);
              }}
              title="URL Göster"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button
              className="action-btn"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(item.downloadUrl);
              }}
              title="URL Kopyala"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <a
              href={item.downloadUrl}
              download={item.name}
              className="action-btn"
              onClick={(e) => e.stopPropagation()}
              title="İndir"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </>
        )}
        <button
          className="action-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRename?.(item);
          }}
          title="Rename"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          className="action-btn action-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(item);
          }}
          title="Delete"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default FileItem;
