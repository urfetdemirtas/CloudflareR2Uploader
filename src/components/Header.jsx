import React from 'react';

function Header({ currentPath, onNavigate, onCreateFolder, onDeleteMultiple, selectedCount }) {
  const pathParts = currentPath ? currentPath.split('/').filter(Boolean) : [];

  const handleBreadcrumbClick = (index) => {
    const newPath = index < 0 ? '' : pathParts.slice(0, index + 1).join('/') + '/';
    onNavigate(newPath);
  };

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">R2 File Manager</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => onCreateFolder('')}>
            + New Folder
          </button>
          {selectedCount > 0 && (
            <button className="btn btn-danger" onClick={onDeleteMultiple}>
              Delete ({selectedCount})
            </button>
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
