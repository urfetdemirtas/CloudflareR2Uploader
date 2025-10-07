import React, { useState, useEffect, useCallback } from 'react';
import FileManager from './components/FileManager';
import Header from './components/Header';
import Modal from './components/Modal';
import api from './utils/api';
import sanitizeFileName from './utils/sanitize';

function App() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.listFiles(currentPath);
      setFolders(data.folders);
      setFiles(data.files);
      setSelectedItems(new Set());
    } catch (error) {
      setModal({
        type: 'error',
        title: 'Error',
        message: 'Failed to load files. Please check your connection.',
      });
    } finally {
      setLoading(false);
    }
  }, [currentPath]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleUpload = async (uploadedFiles) => {
    setLoading(true);
    setUploadProgress({ current: 0, total: 100, fileName: '' });
    
    try {
      // Dosya isimlerini temizle
      const sanitizedFiles = uploadedFiles.map(file => {
        const sanitizedName = sanitizeFileName(file.name);
        return new File([file], sanitizedName, { type: file.type });
      });
      
      await api.uploadFiles(sanitizedFiles, currentPath, (progress) => {
        setUploadProgress(progress);
      });
      
      await loadFiles();
      setUploadProgress(null);
      setModal({
        type: 'success',
        title: 'Success',
        message: `${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''} uploaded successfully.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(null);
      setModal({
        type: 'error',
        title: 'Upload Failed',
        message: error.message || 'Failed to upload files. Please check server logs.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = (folderName) => {
    setModal({
      type: 'input',
      title: 'Create Folder',
      inputValue: folderName || '',
      onConfirm: async (name) => {
        const sanitizedName = sanitizeFileName(name?.trim() || '');
        const path = currentPath + sanitizedName + '/';
        
        setLoading(true);
        try {
          await api.createFolder(path);
          await loadFiles();
          setModal(null);
        } catch (error) {
          setModal({
            type: 'error',
            title: 'Error',
            message: 'Failed to create folder.',
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleRename = (item) => {
    const isFolder = item.type === 'folder';
    const currentName = item.name;
    
    setModal({
      type: 'input',
      title: `Rename ${isFolder ? 'Folder' : 'File'}`,
      inputValue: currentName,
      onConfirm: async (newName) => {
        const sanitizedName = sanitizeFileName(newName?.trim() || '');
        const oldPath = item.fullPath;
        const newPath = currentPath + sanitizedName + (isFolder ? '/' : '');
        
        setLoading(true);
        try {
          await api.rename(oldPath, newPath, isFolder);
          await loadFiles();
          setModal(null);
        } catch (error) {
          setModal({
            type: 'error',
            title: 'Error',
            message: `Failed to rename ${isFolder ? 'folder' : 'file'}.`,
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleDelete = (item) => {
    const isFolder = item.type === 'folder';
    
    setModal({
      type: 'confirm',
      title: 'Confirm Delete',
      message: `Are you sure you want to delete ${isFolder ? 'folder' : 'file'} "${item.name}"?${isFolder ? ' This will delete all contents inside.' : ''}`,
      onConfirm: async () => {
        setLoading(true);
        try {
          await api.deleteItem(item.fullPath, isFolder);
          await loadFiles();
          setModal(null);
        } catch (error) {
          setModal({
            type: 'error',
            title: 'Error',
            message: 'Failed to delete item.',
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleDeleteMultiple = () => {
    const itemsToDelete = [...selectedItems].map(path => {
      const item = [...folders, ...files].find(i => i.fullPath === path);
      return {
        path,
        isFolder: item?.type === 'folder',
        name: item?.name,
      };
    });

    setModal({
      type: 'confirm',
      title: 'Confirm Delete',
      message: `Are you sure you want to delete ${itemsToDelete.length} selected item${itemsToDelete.length > 1 ? 's' : ''}?`,
      onConfirm: async () => {
        setLoading(true);
        try {
          await api.deleteMultiple(itemsToDelete);
          await loadFiles();
          setModal(null);
        } catch (error) {
          setModal({
            type: 'error',
            title: 'Error',
            message: 'Failed to delete items.',
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleNavigate = (folderPath) => {
    setCurrentPath(folderPath);
  };

  const toggleSelection = (itemPath) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(itemPath) ? newSet.delete(itemPath) : newSet.add(itemPath);
      return newSet;
    });
  };

  return (
    <div className="app">
      <Header 
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onCreateFolder={handleCreateFolder}
        onDeleteMultiple={selectedItems.size > 0 ? handleDeleteMultiple : null}
        selectedCount={selectedItems.size}
      />
      <FileManager
        files={files}
        folders={folders}
        loading={loading}
        selectedItems={selectedItems}
        uploadProgress={uploadProgress}
        onUpload={handleUpload}
        onFolderClick={handleNavigate}
        onRename={handleRename}
        onDelete={handleDelete}
        onToggleSelection={toggleSelection}
      />
      {modal && (
        <Modal
          type={modal.type}
          title={modal.title}
          message={modal.message}
          inputValue={modal.inputValue}
          onConfirm={modal.onConfirm}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

export default App;
