# Cloudflare R2 File Manager 🚀

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![Node](https://img.shields.io/badge/Node-18+-339933.svg)

**Modern, minimal and blazing-fast file manager for Cloudflare R2 storage**  
*Modern, minimal ve hızlı Cloudflare R2 dosya yönetim arayüzü*

[English](#english) • [Türkçe](#türkçe)

</div>

---

<img src="./r2-upload-1.jpeg?raw=true" alt="Cloudflare R2 Upload" width="709" height="615">
<img src="./r2-upload-2.jpeg?raw=true" alt="Cloudflare R2 Upload" width="709" height="615">
# English


## ✨ Features

### 📁 File & Folder Management
- **Drag & Drop Upload** - Upload files with drag and drop
- **Up to 15GB Files** - Support for large files (ISO, videos, backups, etc.)
- **Direct Streaming** - Zero disk I/O, stream directly to R2
- **Progress Tracking** - Real-time upload progress
- **Bulk Operations** - Multi-select and batch delete

### 🎨 Modern Interface
- **Minimalist Design** - Clean and simple UI
- **Responsive** - Works on mobile and desktop
- **Breadcrumb Navigation** - Easy folder navigation
- **Real-time Feedback** - Loading states and progress indicators

### 🔧 Technical Features
- **Custom Domain Support** - File URLs with your own domain
- **Auto Name Sanitization** - Turkish character and space cleaning
- **Memory Efficient** - Low RAM usage
- **Error Handling** - Detailed error messages

## 📸 Screenshots

```
┌─────────────────────────────────────────────────┐
│  R2 File Manager                    + New Folder│
│  Home / documents / files                       │
├─────────────────────────────────────────────────┤
│  📁 projects                       [Rename] [×] │
│  📁 backups                        [Rename] [×] │
│  📄 Win10_21H1_Turkish_x64.iso    [🔗] [📋] [⬇️] │
│     5.5 GB • Oct 7, 2025                        │
└─────────────────────────────────────────────────┘
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
3. Upload files **up to 15GB**
4. Track progress with the progress bar

### 📁 Folder Management
- Create new folder with **+ New Folder**
- Click folder name to navigate into it
- Use breadcrumb for navigation between folders
- Rename folders with **Rename** icon

### 🗑️ Delete Operations
- **Single delete**: Click the delete icon
- **Bulk delete**: Select with checkbox and click "Delete (n)" button
- Confirmation dialog prevents accidental deletion

### 🔗 File URLs
- Show URL with **link icon**
- Copy to clipboard with **copy icon**
- Download directly with **download icon**

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
| `GET` | `/api/files?prefix=` | List files and folders |
| `POST` | `/api/upload` | Upload files (streaming) |
| `POST` | `/api/create-folder` | Create new folder |
| `POST` | `/api/rename` | Rename file/folder |
| `DELETE` | `/api/delete` | Delete file/folder |
| `DELETE` | `/api/delete-multiple` | Bulk delete |
| `GET` | `/api/health` | Health check |

## 🛠️ Technologies

- **Frontend**: React 18, Vite, React Dropzone
- **Backend**: Node.js, Express, Busboy
- **Storage**: Cloudflare R2 (S3-compatible)
- **SDK**: AWS SDK for JavaScript v3 (@aws-sdk/client-s3, @aws-sdk/lib-storage)

## 🎯 Performance

- ✅ **Zero Disk I/O** - Direct streaming
- ✅ **15GB File Support** - Optimized for large files
- ✅ **Low RAM Usage** - ~20-50 MB buffer
- ✅ **Real-time Progress** - Live upload tracking
- ✅ **30 Minute Timeout** - For long uploads

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

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## ⭐ Star This Project

If you find this project useful, please give it a star!

---

# Türkçe

## ✨ Özellikler

### 📁 Dosya & Klasör Yönetimi
- **Sürükle Bırak Yükleme** - Dosyaları sürükle-bırak ile yükle
- **15GB'a Kadar Dosya** - Büyük dosya desteği (ISO, video, backup vb.)
- **Direkt Streaming** - Sıfır disk I/O, direkt R2'ye stream
- **İlerleme Takibi** - Gerçek zamanlı yükleme ilerlemesi
- **Toplu İşlemler** - Çoklu seçim ve toplu silme

### 🎨 Modern Arayüz
- **Minimalist Tasarım** - Temiz ve sade UI
- **Responsive** - Mobil ve masaüstü uyumlu
- **Breadcrumb Navigasyon** - Kolay klasör gezintisi
- **Gerçek Zamanlı Geri Bildirim** - Loading states ve progress gösterimi

### 🔧 Teknik Özellikler
- **Custom Domain Desteği** - Kendi domain'iniz ile dosya URL'leri
- **Otomatik İsim Temizleme** - Türkçe karakter ve boşluk temizleme
- **Bellek Verimli** - Düşük RAM kullanımı
- **Hata Yönetimi** - Detaylı hata mesajları

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
3. **15GB'a kadar** dosya yükleyebilirsiniz
4. Progress bar ile ilerlemeyi takip edin

### 📁 Klasör Yönetimi
- **+ New Folder** ile yeni klasör oluşturun
- Klasör adına tıklayarak içine girin
- Breadcrumb ile klasörler arası geçiş yapın
- **Rename** ikonu ile klasör adını değiştirin

### 🗑️ Silme İşlemleri
- **Tek silme**: Delete ikonuna tıklayın
- **Toplu silme**: Checkbox ile seçip "Delete (n)" butonuna tıklayın
- Onay dialogu ile kazara silme engellenmiştir

### 🔗 Dosya URL'leri
- **Link ikonu** ile URL'yi gösterin
- **Copy ikonu** ile panoya kopyalayın
- **Download ikonu** ile direkt indirin

## 🎯 Performans

- ✅ **Sıfır Disk I/O** - Direkt streaming
- ✅ **15GB Dosya Desteği** - Büyük dosyalar için optimize edilmiş
- ✅ **Düşük RAM Kullanımı** - ~20-50 MB buffer
- ✅ **Real-time Progress** - Anlık yükleme takibi
- ✅ **30 Dakika Timeout** - Uzun yüklemeler için

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

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## ⭐ Yıldız Verin

Bu projeyi beğendiyseniz star vermeyi unutmayın!

---

<div align="center">

Made with ❤️ for Cloudflare R2

</div>
