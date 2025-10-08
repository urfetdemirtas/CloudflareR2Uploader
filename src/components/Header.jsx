import React, { useState } from 'react';

function Header({ currentPath, onNavigate, onCreateFolder, onDeleteMultiple, onMoveMultiple, selectedCount, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathParts = currentPath ? currentPath.split('/').filter(Boolean) : [];

  const handleBreadcrumbClick = (index) => {
    const newPath = index < 0 ? '' : pathParts.slice(0, index + 1).join('/') + '/';
    onNavigate(newPath);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">R2 File Manager</h1>
        <div className="header-search">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button className="search-clear" onClick={clearSearch}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => onCreateFolder('')}>
            + New Folder
          </button>
          {selectedCount > 0 && (
            <>
              <button className="btn btn-secondary" onClick={onMoveMultiple}>
                Move ({selectedCount})
              </button>
              <button className="btn btn-danger" onClick={onDeleteMultiple}>
                Delete ({selectedCount})
              </button>
            </>
          )}
        </div>
      </div>
      <div className="breadcrumb">
        <span className="breadcrumb-item" onClick={() => handleBreadcrumbClick(-1)}>
          Home
        </span>
        {pathParts.map((part, index) => (
          <React.Fragment key={index}>
            <span className="breadcrumb-separator">/</span>
            <span 
              className="breadcrumb-item"
              onClick={() => handleBreadcrumbClick(index)}
            >
              {part}
            </span>
          </React.Fragment>
        ))}
      </div>
    </header>
  );
}

export default Header;
