import express from 'express';
import cors from 'cors';
import busboy from 'busboy';
import dotenv from 'dotenv';
import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand, DeleteObjectsCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Validate environment variables
const requiredEnvVars = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_DOMAIN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please create a .env file with all required variables');
  process.exit(1);
}

// Build R2 endpoint
const R2_ENDPOINT = process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

console.log('🔧 Configuration:');
console.log('  - Account ID:', process.env.R2_ACCOUNT_ID);
console.log('  - Bucket:', process.env.R2_BUCKET_NAME);
console.log('  - Endpoint:', R2_ENDPOINT);
console.log('  - Public Domain:', R2_PUBLIC_DOMAIN);

const s3Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

// Dosya adı temizleme fonksiyonu
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

app.get('/api/files', async (req, res) => {
  try {
    const prefix = req.query.prefix || '';
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await s3Client.send(command);
    
    // Klasör içindeki dosya sayısını hesapla
    const countFilesInFolder = async (folderPrefix) => {
      let count = 0;
      let continuationToken = null;
      
      do {
        const listCommand = new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: folderPrefix,
          ContinuationToken: continuationToken,
        });
        
        const listResponse = await s3Client.send(listCommand);
        const contents = listResponse.Contents || [];
        
        // Sadece dosyaları say (klasör işaretçilerini sayma)
        count += contents.filter(item => !item.Key.endsWith('/')).length;
        continuationToken = listResponse.NextContinuationToken;
      } while (continuationToken);
      
      return count;
    };
    
    const folders = await Promise.all(
      (response.CommonPrefixes || []).map(async (p) => {
        const fileCount = await countFilesInFolder(p.Prefix);
        return {
          name: p.Prefix.slice(prefix.length, -1),
          type: 'folder',
          fullPath: p.Prefix,
          fileCount: fileCount,
        };
      })
    );

    const files = (response.Contents || [])
      .filter(item => item.Key !== prefix && !item.Key.endsWith('/'))
      .map((item) => {
        // Public URL formatı: https://domain/folder/file.ext
        const downloadUrl = `${R2_PUBLIC_DOMAIN}/${item.Key}`;
        
        return {
          name: item.Key.slice(prefix.length),
          type: 'file',
          size: item.Size,
          lastModified: item.LastModified,
          fullPath: item.Key,
          downloadUrl: downloadUrl,
        };
      });

    res.json({ folders, files });
  } catch (error) {
    console.error('❌ Error listing files:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.$metadata?.httpStatusCode,
      requestId: error.$metadata?.requestId
    });
    res.status(500).json({ 
      error: 'Failed to list files',
      message: error.message,
      details: 'Check server console for more information'
    });
  }
});

app.post('/api/upload', (req, res) => {
  const uploadStartTime = Date.now();
  
  const bb = busboy({ 
    headers: req.headers,
    limits: {
      fileSize: 30 * 1024 * 1024 * 1024, // 30GB limit
    }
  });
  
  const uploadedFiles = [];
  const fields = {};
  let filesProcessing = 0;
  let hasError = false;

  bb.on('field', (fieldname, val) => {
    fields[fieldname] = val;
  });

  bb.on('file', async (fieldname, fileStream, info) => {
    filesProcessing++;
    
    const { filename, mimeType } = info;
    const sanitizedName = sanitizeFileName(filename);
    const prefix = fields.prefix || '';
    const key = prefix + sanitizedName;
    
    console.log(`\n📤 Upload started: ${sanitizedName}`);
    console.log(`  ➤ Target path: ${key}`);
    console.log(`  ➤ Direct streaming to R2 (no temp file)`);

    try {
      // Direkt stream olarak R2'ye yükle (temp dosya YOK!)
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: BUCKET_NAME,
          Key: key,
          Body: fileStream,
          ContentType: mimeType,
        },
        queueSize: 4,
        partSize: 5 * 1024 * 1024, // 5MB parts
        leavePartsOnError: false,
      });

      upload.on('httpUploadProgress', (progress) => {
        const percent = Math.round((progress.loaded / progress.total) * 100);
        const loadedMB = (progress.loaded / (1024 * 1024)).toFixed(2);
        const totalMB = (progress.total / (1024 * 1024)).toFixed(2);
        console.log(`  📊 Progress: ${percent}% (${loadedMB}/${totalMB} MB)`);
      });

      await upload.done();
      
      const uploadDuration = ((Date.now() - uploadStartTime) / 1000).toFixed(2);
      console.log(`  ✅ Uploaded: ${sanitizedName} in ${uploadDuration}s\n`);
      
      uploadedFiles.push({ name: sanitizedName, path: key });
      filesProcessing--;

      filesProcessing === 0 && !hasError && res.json({ success: true, files: uploadedFiles });
    } catch (error) {
      hasError = true;
      filesProcessing--;
      
      const uploadDuration = ((Date.now() - uploadStartTime) / 1000).toFixed(2);
      console.error(`\n❌ Upload failed after ${uploadDuration}s`);
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      
      !res.headersSent && res.status(500).json({ 
        error: 'Failed to upload files',
        details: error.message,
        type: error.name 
      });
    }
  });

  bb.on('error', (error) => {
    hasError = true;
    console.error('Busboy error:', error);
    !res.headersSent && res.status(500).json({ 
      error: 'Upload parsing error',
      details: error.message 
    });
  });

  req.pipe(bb);
});

app.post('/api/create-folder', async (req, res) => {
  try {
    let { path } = req.body;
    
    // Path'i parçalara ayır ve her parçayı temizle
    const pathParts = path.split('/').filter(Boolean);
    const sanitizedParts = pathParts.map(part => sanitizeFileName(part));
    const sanitizedPath = sanitizedParts.join('/') + '/';
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: sanitizedPath,
      Body: '',
    });

    await s3Client.send(command);
    res.json({ success: true, path: sanitizedPath });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

app.post('/api/rename', async (req, res) => {
  try {
    const { oldPath, newPath, isFolder } = req.body;

    const copyAndDelete = async (source, destination) => {
      await s3Client.send(new CopyObjectCommand({
        Bucket: BUCKET_NAME,
        CopySource: `${BUCKET_NAME}/${source}`,
        Key: destination,
      }));
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: source,
      }));
    };

    const processFolderRename = async (oldPrefix, newPrefix) => {
      const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: oldPrefix,
      });
      const listResponse = await s3Client.send(listCommand);

      const contents = listResponse.Contents || [];
      for (const item of contents) {
        const newKey = item.Key.replace(oldPrefix, newPrefix);
        await copyAndDelete(item.Key, newKey);
      }
    };

    isFolder ? await processFolderRename(oldPath, newPath) : await copyAndDelete(oldPath, newPath);

    res.json({ success: true });
  } catch (error) {
    console.error('Error renaming:', error);
    res.status(500).json({ error: 'Failed to rename item' });
  }
});

app.delete('/api/delete', async (req, res) => {
  try {
    const { path, isFolder } = req.body;

    const deleteFolder = async (prefix) => {
      const listCommand = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: prefix,
      });
      const listResponse = await s3Client.send(listCommand);
      const contents = listResponse.Contents || [];

      contents.length > 0 && await s3Client.send(new DeleteObjectsCommand({
        Bucket: BUCKET_NAME,
        Delete: {
          Objects: contents.map(item => ({ Key: item.Key })),
        },
      }));
    };

    isFolder ? await deleteFolder(path) : await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: path,
    }));

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.delete('/api/delete-multiple', async (req, res) => {
  try {
    const { items } = req.body;
    
    for (const item of items) {
      const deleteOperation = item.isFolder 
        ? async () => {
            const listCommand = new ListObjectsV2Command({
              Bucket: BUCKET_NAME,
              Prefix: item.path,
            });
            const listResponse = await s3Client.send(listCommand);
            const contents = listResponse.Contents || [];
            
            contents.length > 0 && await s3Client.send(new DeleteObjectsCommand({
              Bucket: BUCKET_NAME,
              Delete: {
                Objects: contents.map(obj => ({ Key: obj.Key })),
              },
            }));
          }
        : async () => {
            await s3Client.send(new DeleteObjectCommand({
              Bucket: BUCKET_NAME,
              Key: item.path,
            }));
          };
      
      await deleteOperation();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting multiple items:', error);
    res.status(500).json({ error: 'Failed to delete items' });
  }
});

app.post('/api/move-multiple', async (req, res) => {
  try {
    const { items, targetPath } = req.body;
    
    console.log(`\n📦 Moving ${items.length} item(s) to: "${targetPath}"`);
    
    for (const item of items) {
      const fileName = item.path.split('/').filter(Boolean).pop();
      const newPath = item.isFolder 
        ? `${targetPath}${fileName}/`
        : `${targetPath}${fileName}`;
      
      console.log(`  ➤ ${item.path} → ${newPath}`);
      
      const moveOperation = item.isFolder
        ? async () => {
            const listCommand = new ListObjectsV2Command({
              Bucket: BUCKET_NAME,
              Prefix: item.path,
            });
            const listResponse = await s3Client.send(listCommand);
            const contents = listResponse.Contents || [];
            
            for (const obj of contents) {
              const relativePath = obj.Key.replace(item.path, '');
              const destKey = `${newPath}${relativePath}`;
              
              await s3Client.send(new CopyObjectCommand({
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${obj.Key}`,
                Key: destKey,
              }));
              
              await s3Client.send(new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: obj.Key,
              }));
            }
          }
        : async () => {
            await s3Client.send(new CopyObjectCommand({
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${item.path}`,
              Key: newPath,
            }));
            
            await s3Client.send(new DeleteObjectCommand({
              Bucket: BUCKET_NAME,
              Key: item.path,
            }));
          };
      
      await moveOperation();
    }
    
    console.log(`  ✅ Moved ${items.length} item(s) successfully\n`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error moving items:', error);
    res.status(500).json({ error: 'Failed to move items' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 1,
    });
    await s3Client.send(command);
    res.json({ status: 'ok', message: 'Connected to R2 successfully' });
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to connect to R2',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, async () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log('📱 Frontend: http://localhost:3000\n');
  console.log('📦 Max file size: 30GB');
  console.log('⏱️  Timeout: 1 hour');
  console.log('💾 Upload method: Direct streaming to R2 (zero disk I/O)\n');
  
  // Test R2 connection
  try {
    const testCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 1,
    });
    await s3Client.send(testCommand);
    console.log('✅ Successfully connected to R2 bucket\n');
  } catch (error) {
    console.error('❌ Failed to connect to R2 bucket');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('  1. R2_ACCOUNT_ID is correct');
    console.error('  2. R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY are valid');
    console.error('  3. R2_BUCKET_NAME exists and is accessible');
    console.error('  4. API token has R2 read/write permissions\n');
  }
});

// Timeout'u artır (büyük dosyalar için)
server.timeout = 60 * 60 * 1000; // 1 saat
