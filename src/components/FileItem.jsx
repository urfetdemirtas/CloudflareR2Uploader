import React, { useState } from 'react';

function FileItem({ item, isSelected, onFolderClick, onRename, onDelete, onToggleSelection }) {
  const isFolder = item.type === 'folder';
  const [showUrl, setShowUrl] = useState(false);

  const handleClick = () => {
    isFolder && onFolderClick?.(item.fullPath);
  };

  const getFileType = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
    const videoExts = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv'];
    const audioExts = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'];
    const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'];
    const excelExts = ['xls', 'xlsx', 'csv'];
    const wordExts = ['doc', 'docx'];
    const pptExts = ['ppt', 'pptx'];
    const codeExts = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css', 'json', 'xml', 'php', 'rb', 'go'];
    const textExts = ['txt', 'md', 'log'];
    
    return imageExts.includes(ext) ? 'image'
      : videoExts.includes(ext) ? 'video'
      : audioExts.includes(ext) ? 'audio'
      : archiveExts.includes(ext) ? 'archive'
      : excelExts.includes(ext) ? 'excel'
      : wordExts.includes(ext) ? 'word'
      : pptExts.includes(ext) ? 'ppt'
      : codeExts.includes(ext) ? 'code'
      : textExts.includes(ext) ? 'text'
      : ext === 'pdf' ? 'pdf'
      : 'default';
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    // Resim dosyaları
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
    const imageIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
    
    // Video dosyaları
    const videoExts = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv'];
    const videoIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
    
    // Ses dosyaları
    const audioExts = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'];
    const audioIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    );
    
    // Arşiv dosyaları
    const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'];
    const archiveIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
    
    // PDF
    const pdfIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6" />
      </svg>
    );
    
    // Excel
    const excelExts = ['xls', 'xlsx', 'csv'];
    const excelIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
    
    // Word
    const wordExts = ['doc', 'docx'];
    const wordIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
    
    // PowerPoint
    const pptExts = ['ppt', 'pptx'];
    const pptIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    );
    
    // Kod dosyaları
    const codeExts = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css', 'json', 'xml', 'php', 'rb', 'go'];
    const codeIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
    
    // Text dosyaları
    const textExts = ['txt', 'md', 'log'];
    const textIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
    
    // Default dosya ikonu
    const defaultIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
    
    // Uzantıya göre ikon döndür
    return imageExts.includes(ext) ? imageIcon
      : videoExts.includes(ext) ? videoIcon
      : audioExts.includes(ext) ? audioIcon
      : archiveExts.includes(ext) ? archiveIcon
      : excelExts.includes(ext) ? excelIcon
      : wordExts.includes(ext) ? wordIcon
      : pptExts.includes(ext) ? pptIcon
      : codeExts.includes(ext) ? codeIcon
      : textExts.includes(ext) ? textIcon
      : ext === 'pdf' ? pdfIcon
      : defaultIcon;
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
        <div className="file-icon" data-type={isFolder ? 'folder' : getFileType(item.name)}>
          {isFolder ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          ) : (
            getFileIcon(item.name)
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
            {isFolder && (
              <span>
                {item.fileCount !== undefined 
                  ? `${item.fileCount} file${item.fileCount !== 1 ? 's' : ''}`
                  : 'Folder'
                }
              </span>
            )}
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
