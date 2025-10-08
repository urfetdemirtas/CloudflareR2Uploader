# Cloudflare R2 File Manager 🚀

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![Node](https://img.shields.io/badge/Node-18+-339933.svg)

**Modern, minimal and blazing-fast file manager for Cloudflare R2 storage**  
*Modern, minimal ve hızlı Cloudflare R2 dosya yönetim arayüzü*

[English](#english) • [Türkçe](#türkçe)

</div>

<<<<<<< HEAD
--- 
=======
---
>>>>>>> e3a6d910fdab31c3ae3fd989caef36d7e092da9d
<div align="center">
<img src="./r2-upload-1.jpeg?raw=true" alt="Cloudflare R2 Upload" width="709" height="615">
<img src="./r2-upload-2.jpeg?raw=true" alt="Cloudflare R2 Upload" width="709" height="615">
</div>

# English


## ✨ Features

### 📁 File & Folder Management
- **Drag & Drop Upload** - Upload files with drag and drop
- **Up to 30GB Files** - Support for very large files (ISO, videos, backups, etc.)
- **Multipart Upload** - Files split into 5MB chunks for faster, reliable uploads
- **Direct Streaming** - Zero disk I/O, stream directly to R2
- **Progress Tracking** - Real-time upload progress with speed and size info
- **Bulk Operations** - Multi-select and batch delete/move
- **Move Files** - Move files and folders between directories
- **Folder File Counter** - Shows total file count in each folder

### 🎨 Modern Interface
- **Minimalist Design** - Clean, simple and chic UI
- **File Type Icons** - Color-coded icons for different file types (images, videos, PDFs, archives, etc.)
- **Search Functionality** - Real-time search for files and folders
- **Responsive** - Works perfectly on mobile and desktop
- **Breadcrumb Navigation** - Easy folder navigation
- **Real-time Feedback** - Loading states with descriptive messages

### 🔧 Technical Features
- **Custom Domain Support** - File URLs with your own domain
- **Auto Name Sanitization** - Turkish character and space cleaning
- **Memory Efficient** - Low RAM usage, ~20-50 MB buffer
- **1 Hour Timeout** - Support for very large files
- **Error Handling** - Detailed error messages
- **Parallel Processing** - Concurrent chunk uploads for better performance

## 📸 Screenshots

```
┌──────────────────────────────────────────────────────────┐
│  R2 File Manager   [Search...]    Move(2) Delete(2)     │
│  Home / documents / files                                │
├──────────────────────────────────────────────────────────┤
│  Found 5 items matching "iso"                            │
├──────────────────────────────────────────────────────────┤
│  📁 projects (247 files)           [Rename] [Move] [×]   │
│  📁 backups (15 files)             [Rename] [Move] [×]   │
│  📦 Win10_21H1_Turkish_x64.iso    [🔗] [📋] [⬇️] [×]     │
│     5.5 GB • Oct 7, 2025                                 │
│  📄 document.pdf                   [🔗] [📋] [⬇️] [×]     │
│     2.3 MB • Oct 8, 2025                                 │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account
- R2 bucket and API credentials

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/cloudflare-r2-file-manager.git
   cd cloudflare-r2-file-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the **root directory** (same folder as package.json) with your Cloudflare R2 credentials:
   ```
   R2_ACCOUNT_ID=your_cloudflare_account_id
   R2_ACCESS_KEY_ID=your_r2_access_key_id
   R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
   R2_BUCKET_NAME=your_bucket_name
   R2_PUBLIC_DOMAIN=https://your-custom-domain.com
   PORT=3001
   ```

   ⚠️ **IMPORTANT**: 
   - Do NOT use quotes around values
   - Do NOT add spaces around the `=` sign
   - Each variable on a new line
   
   **How to get your R2 credentials:**
   
   a. **Account ID:**
      - Go to Cloudflare Dashboard → R2
      - Copy the "Account ID" shown on the right side
   
   b. **API Token (Access Key & Secret):**
      - Go to R2 → Manage R2 API Tokens
      - Click "Create API Token"
      - Select **Admin Read & Write** permissions
      - Copy both `Access Key ID` and `Secret Access Key`
      - ⚠️ Secret is shown only once - save it!
   
   c. **Bucket Name:**
      - Create a new bucket or use existing one
      - Copy the exact bucket name
   
   d. **Public Domain (Custom Domain):**
      - Go to R2 → Your Bucket → Settings
      - Under "Public Access" configure custom domain
      - Example: `https://files.yourdomain.com`
      - Enter this domain in `R2_PUBLIC_DOMAIN` (without trailing slash)

4. **Start the Application**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API server on port 3001
   - Frontend development server on port 3000

5. **Access the Application**
   
   Open your browser and navigate to `http://localhost:3000`

6. **Verify Connection**
   
   When the server starts, you should see:
   ```
   ✅ Server running on http://localhost:3001
   📱 Frontend: http://localhost:3000
   ✅ Successfully connected to R2 bucket
   ```
   
   If you see connection errors, check `TROUBLESHOOTING.md` for detailed help.

## 💡 Usage

### 📤 File Upload
1. Drag and drop files into the **dropzone area**
2. Or click **"Choose Files"** button
3. Upload files **up to 30GB** (1 hour timeout)
4. Track progress with real-time speed and size info
5. Files are automatically split into 5MB chunks for reliability

### 📁 Folder Management
- Create new folder with **+ New Folder**
- Click folder name to navigate into it
- Use breadcrumb for navigation between folders
- Rename folders with **Rename** icon
- Each folder shows total file count

### 🔍 Search
- Type in the search box to filter files and folders
- Real-time filtering as you type
- Case-insensitive search
- Clear button (X) to reset search

### 📦 Move Operations
- **Select multiple items**: Use checkboxes
- **Click "Move (n)"** button in header
- **Choose destination folder** from the list
- Files and folders moved with all contents preserved

### 🗑️ Delete Operations
- **Single delete**: Click the delete icon
- **Bulk delete**: Select with checkbox and click "Delete (n)" button
- Confirmation dialog prevents accidental deletion

### 🔗 File URLs
- Show URL with **link icon**
- Copy to clipboard with **copy icon**
- Download directly with **download icon**

### 🎨 File Type Recognition
Files are displayed with color-coded icons:
- 🖼️ **Images** (jpg, png, gif, svg) - Purple
- 🎬 **Videos** (mp4, avi, mov, mkv) - Blue
- 🎵 **Audio** (mp3, wav, ogg) - Teal
- 📦 **Archives** (zip, rar, 7z) - Orange
- 📄 **PDF** - Red
- 📊 **Excel** (xls, xlsx, csv) - Green
- 📝 **Word** (doc, docx) - Blue
- 💻 **Code** (js, py, html, css) - Dark Purple
- And more...

## 📂 Project Structure

```
├── server/
│   └── index.js          # Express API server with R2 integration
├── src/
│   ├── components/
│   │   ├── FileItem.jsx  # Individual file/folder item component
│   │   ├── FileManager.jsx # Main file manager with dropzone
│   │   ├── Header.jsx    # Header with breadcrumbs and actions
│   │   └── Modal.jsx     # Reusable modal for dialogs
│   ├── styles/
│   │   └── main.css      # All application styles
│   ├── utils/
│   │   └── api.js        # API client for backend communication
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/files?prefix=` | List files and folders with file counts |
| `POST` | `/api/upload` | Upload files (multipart streaming) |
| `POST` | `/api/create-folder` | Create new folder |
| `POST` | `/api/rename` | Rename file/folder |
| `POST` | `/api/move-multiple` | Move multiple files/folders |
| `DELETE` | `/api/delete` | Delete file/folder |
| `DELETE` | `/api/delete-multiple` | Bulk delete |
| `GET` | `/api/health` | Health check |

## 🛠️ Technologies

- **Frontend**: React 18, Vite, React Dropzone
- **Backend**: Node.js, Express, Busboy
- **Storage**: Cloudflare R2 (S3-compatible)
- **SDK**: AWS SDK for JavaScript v3 (@aws-sdk/client-s3, @aws-sdk/lib-storage)

## 🎯 Performance

- ✅ **Zero Disk I/O** - Direct streaming to R2
- ✅ **30GB File Support** - Optimized for very large files
- ✅ **Multipart Upload** - 5MB chunks with 4 parallel connections
- ✅ **Low RAM Usage** - ~20-50 MB buffer
- ✅ **Real-time Progress** - Live upload tracking with speed/size
- ✅ **1 Hour Timeout** - Support for very long uploads
- ✅ **Efficient Search** - Client-side filtering with instant results
- ✅ **Smart File Counting** - Recursive folder file counting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- Turkish characters and spaces are automatically cleaned
- File names are sanitized (ç→c, ş→s, ğ→g, etc.)
- Custom domain support for public URLs
- Folder structure maintained with trailing slashes
- Files uploaded to current directory automatically
- Search works across all files and folders in current view
- Move operation preserves folder structure
- File type detection supports 40+ extensions

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## ⭐ Star This Project

If you find this project useful, please give it a star!

---

# Türkçe

## ✨ Özellikler

### 📁 Dosya & Klasör Yönetimi
- **Sürükle Bırak Yükleme** - Dosyaları sürükle-bırak ile yükle
- **30GB'a Kadar Dosya** - Çok büyük dosya desteği (ISO, video, backup vb.)
- **Multipart Upload** - 5MB parçalar halinde hızlı ve güvenli yükleme
- **Direkt Streaming** - Sıfır disk I/O, direkt R2'ye stream
- **İlerleme Takibi** - Gerçek zamanlı hız ve boyut bilgisi
- **Toplu İşlemler** - Çoklu seçim ile silme ve taşıma
- **Dosya Taşıma** - Dosya ve klasörleri dizinler arası taşıma
- **Klasör Dosya Sayacı** - Her klasördeki toplam dosya sayısını gösterir

### 🎨 Modern Arayüz
- **Minimalist Tasarım** - Temiz, sade ve şık UI
- **Dosya Tipi İkonları** - Farklı dosya tipleri için renkli ikonlar (resim, video, PDF, arşiv vb.)
- **Arama Özelliği** - Dosya ve klasörlerde anlık arama
- **Responsive** - Mobil ve masaüstü uyumlu
- **Breadcrumb Navigasyon** - Kolay klasör gezintisi
- **Gerçek Zamanlı Geri Bildirim** - Açıklayıcı loading mesajları

### 🔧 Teknik Özellikler
- **Custom Domain Desteği** - Kendi domain'iniz ile dosya URL'leri
- **Otomatik İsim Temizleme** - Türkçe karakter ve boşluk temizleme
- **Bellek Verimli** - Düşük RAM kullanımı, ~20-50 MB buffer
- **1 Saat Timeout** - Çok büyük dosyalar için
- **Hata Yönetimi** - Detaylı hata mesajları
- **Paralel İşleme** - Eşzamanlı parça yükleme ile yüksek performans

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- Cloudflare hesabı
- R2 bucket ve API credentials

### Kurulum

1. **Projeyi Klonlayın**
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/cloudflare-r2-file-manager.git
   cd cloudflare-r2-file-manager
   ```

2. **Bağımlılıkları Yükleyin**
   ```bash
   npm install
   ```

3. **Environment Değişkenlerini Ayarlayın**
   
   Kök dizinde `.env` dosyası oluşturun:
   ```
   R2_ACCOUNT_ID=cloudflare_hesap_id
   R2_ACCESS_KEY_ID=r2_access_key
   R2_SECRET_ACCESS_KEY=r2_secret_key
   R2_BUCKET_NAME=bucket_adi
   R2_PUBLIC_DOMAIN=https://your-domain.com
   PORT=3001
   ```

4. **Uygulamayı Başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcıda Açın**
   
   `http://localhost:3000` adresine gidin

## 💡 Kullanım

### 📤 Dosya Yükleme
1. Dosyaları **sürükle-bırak** alanına bırakın
2. Veya **"Choose Files"** butonuna tıklayın
3. **30GB'a kadar** dosya yükleyebilirsiniz (1 saat timeout)
4. Gerçek zamanlı hız ve boyut bilgisi ile ilerlemeyi takip edin
5. Dosyalar otomatik olarak 5MB parçalara bölünür

### 📁 Klasör Yönetimi
- **+ New Folder** ile yeni klasör oluşturun
- Klasör adına tıklayarak içine girin
- Breadcrumb ile klasörler arası geçiş yapın
- **Rename** ikonu ile klasör adını değiştirin
- Her klasörün toplam dosya sayısını görün

### 🔍 Arama
- Arama kutusuna yazarak dosya ve klasörleri filtreleyin
- Yazdıkça anlık filtreleme
- Büyük/küçük harf duyarsız
- Temizle (X) butonu ile aramayı sıfırlayın

### 📦 Taşıma İşlemleri
- **Çoklu seçim**: Checkbox'ları kullanın
- **"Move (n)" butonuna** tıklayın
- **Hedef klasörü seçin** listeden
- Dosya ve klasörler tüm içerikleriyle taşınır

### 🗑️ Silme İşlemleri
- **Tek silme**: Delete ikonuna tıklayın
- **Toplu silme**: Checkbox ile seçip "Delete (n)" butonuna tıklayın
- Onay dialogu ile kazara silme engellenmiştir

### 🔗 Dosya URL'leri
- **Link ikonu** ile URL'yi gösterin
- **Copy ikonu** ile panoya kopyalayın
- **Download ikonu** ile direkt indirin

### 🎨 Dosya Tipi Tanıma
Dosyalar renkli ikonlarla gösterilir:
- 🖼️ **Resimler** (jpg, png, gif, svg) - Mor
- 🎬 **Videolar** (mp4, avi, mov, mkv) - Mavi
- 🎵 **Ses** (mp3, wav, ogg) - Turkuaz
- 📦 **Arşivler** (zip, rar, 7z) - Turuncu
- 📄 **PDF** - Kırmızı
- 📊 **Excel** (xls, xlsx, csv) - Yeşil
- 📝 **Word** (doc, docx) - Mavi
- 💻 **Kod** (js, py, html, css) - Koyu Mor
- Ve daha fazlası...

## 🎯 Performans

- ✅ **Sıfır Disk I/O** - R2'ye direkt streaming
- ✅ **30GB Dosya Desteği** - Çok büyük dosyalar için optimize edilmiş
- ✅ **Multipart Upload** - 4 paralel bağlantı ile 5MB parçalar
- ✅ **Düşük RAM Kullanımı** - ~20-50 MB buffer
- ✅ **Real-time Progress** - Hız ve boyut bilgisi ile anlık takip
- ✅ **1 Saat Timeout** - Çok uzun yüklemeler için
- ✅ **Verimli Arama** - Anlık sonuçlarla client-side filtreleme
- ✅ **Akıllı Dosya Sayımı** - Recursive klasör dosya sayımı

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Notlar

- Türkçe karakterler ve boşluklar otomatik temizlenir
- Dosya isimleri sanitize edilir (ç→c, ş→s, ğ→g, vb.)
- Custom domain ile public URL desteği
- Folder structure trailing slash ile korunur
- Dosyalar bulunduğunuz dizine otomatik yüklenir
- Arama mevcut görünümdeki tüm dosya ve klasörlerde çalışır
- Taşıma işlemi klasör yapısını korur
- 40+ dosya uzantısı için tip tanıma desteği

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## ⭐ Yıldız Verin

Bu projeyi beğendiyseniz star vermeyi unutmayın!

---

<div align="center">

Made with ❤️ for Cloudflare R2

</div>
