import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './FileItem';

function FileManager({ 
  files, 
  folders, 
  loading,
  uploadProgress,
  selectedItems,
  onUpload, 
  onFolderClick, 
  onRename, 
  onDelete,
  onToggleSelection 
}) {
  const onDrop = useCallback((acceptedFiles) => {
    const totalSize = acceptedFiles.reduce((sum, file) => sum + file.size, 0);
    const totalGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);
    
    totalSize > 0 && console.log(`📦 Uploading ${acceptedFiles.length} file(s), total size: ${totalGB} GB`);
    onUpload?.(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.length > 0 && onUpload?.(selectedFiles);
  };

  const allItems = [...folders, ...files];

  return (
    <div className="file-manager" {...getRootProps()}>
      <input {...getInputProps()} />
      
      <div className="upload-area">
        <div className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <div className="dropzone-content">
            <svg className="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="dropzone-text">
              {isDragActive ? 'Drop files here...' : 'Drag and drop files here'}
            </p>
            <label className="btn btn-secondary">
              Choose Files
              <input
                type="file"
                multiple
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          {uploadProgress ? (
            <div className="upload-progress">
              <div className="upload-progress-header">
                <div className="upload-file-name">{uploadProgress.fileName}</div>
                <div className="upload-percentage">{uploadProgress.current}%</div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${uploadProgress.current}%` }}
                ></div>
              </div>
              <div className="upload-size">
                {uploadProgress.loaded} MB / {uploadProgress.totalSize} MB
              </div>
            </div>
          ) : (
            <div className="spinner"></div>
          )}
        </div>
      )}

      <div className="file-list">
        {allItems.length === 0 && !loading && (
          <div className="empty-state">
            <p>No files or folders</p>
          </div>
        )}
        {allItems.map((item) => (
          <FileItem
            key={item.fullPath}
            item={item}
            isSelected={selectedItems.has(item.fullPath)}
            onFolderClick={onFolderClick}
            onRename={onRename}
            onDelete={onDelete}
            onToggleSelection={onToggleSelection}
          />
        ))}
      </div>
    </div>
  );
}

export default FileManager;
