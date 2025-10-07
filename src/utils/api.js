const API_BASE = '/api';

const api = {
  async listFiles(prefix = '') {
    const response = await fetch(`${API_BASE}/files?prefix=${encodeURIComponent(prefix)}`);
    const hasError = !response.ok;
    
    return hasError 
      ? Promise.reject(new Error('Failed to list files'))
      : response.json();
  },

  async uploadFiles(files, prefix = '', onProgress) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('prefix', prefix);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          const loadedMB = (e.loaded / (1024 * 1024)).toFixed(2);
          const totalMB = (e.total / (1024 * 1024)).toFixed(2);
          
          onProgress?.({
            current: percentComplete,
            total: 100,
            loaded: loadedMB,
            totalSize: totalMB,
            fileName: files[0]?.name || 'File',
          });
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(new Error('Invalid server response'));
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.error || `Server error: ${xhr.status}`));
          } catch (e) {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new Error('Upload timeout - file too large or slow connection'));
      });

      xhr.open('POST', `${API_BASE}/upload`);
      xhr.timeout = 30 * 60 * 1000; // 30 dakika timeout
      xhr.send(formData);
    });
  },

  async createFolder(path) {
    const response = await fetch(`${API_BASE}/create-folder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });

    const hasError = !response.ok;
    
    return hasError
      ? Promise.reject(new Error('Failed to create folder'))
      : response.json();
  },

  async rename(oldPath, newPath, isFolder) {
    const response = await fetch(`${API_BASE}/rename`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPath, newPath, isFolder }),
    });

    const hasError = !response.ok;
    
    return hasError
      ? Promise.reject(new Error('Failed to rename'))
      : response.json();
  },

  async deleteItem(path, isFolder) {
    const response = await fetch(`${API_BASE}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, isFolder }),
    });

    const hasError = !response.ok;
    
    return hasError
      ? Promise.reject(new Error('Failed to delete'))
      : response.json();
  },

  async deleteMultiple(items) {
    const response = await fetch(`${API_BASE}/delete-multiple`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    const hasError = !response.ok;
    
    return hasError
      ? Promise.reject(new Error('Failed to delete items'))
      : response.json();
  },
};

export default api;
