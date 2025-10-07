const sanitizeFileName = (fileName) => {
  const turkishCharMap = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  };

  let sanitized = fileName;
  
  // Türkçe karakterleri değiştir
  Object.keys(turkishCharMap).forEach(char => {
    sanitized = sanitized.replace(new RegExp(char, 'g'), turkishCharMap[char]);
  });
  
  // Boşlukları kaldır
  sanitized = sanitized.replace(/\s+/g, '');
  
  // Özel karakterleri temizle (sadece harf, rakam, nokta, tire ve alt çizgi kalsın)
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '');
  
  // Birden fazla nokta varsa tek noktaya indir (dosya uzantısı için)
  const parts = sanitized.split('.');
  const extension = parts.length > 1 ? parts.pop() : '';
  const nameWithoutExt = parts.join('').replace(/\./g, '');
  
  sanitized = extension ? `${nameWithoutExt}.${extension}` : nameWithoutExt;
  
  return sanitized || 'unnamed';
};

export default sanitizeFileName;
