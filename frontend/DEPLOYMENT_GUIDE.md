# Hướng dẫn Deploy Frontend - Thado Robot

## 📋 Các thay đổi đã thực hiện

### 1. Tối ưu hóa API Service
- **Hợp nhất 2 file API service** thành 1 file duy nhất: `src/services/api.ts`
- **Thêm retry logic**: Tự động retry 3 lần khi có lỗi server (5xx)
- **Thêm timeout handling**: Mặc định 30 giây cho production
- **Thêm error handling**: Xử lý lỗi tốt hơn với message rõ ràng
- **Thêm logging**: Có thể bật/tắt console logs qua env variable
- **Cache optimization**: Tối ưu cache cho categories

### 2. Cập nhật Components
- ✅ `pages/RFIDProducts.tsx` - Sử dụng API service mới
- ✅ `pages/ProductDetail.tsx` - Sử dụng API service mới
- ✅ `components/layout/Navbar.tsx` - Sử dụng API service mới
- ✅ `components/CategorySidebar.tsx` - Sử dụng API service mới

### 3. Environment Variables
- Tất cả hardcoded URLs đã được thay bằng environment variables
- API base URL được quản lý tập trung

---

## 🔧 Cấu hình Environment Variables

### Bước 1: Tạo file .env cho Development

Tạo file **`.env.development`** trong thư mục `frontend/`:

```env
# Development Environment Variables
# Backend API URL for local development
REACT_APP_API_URL=http://localhost:9000

# Optional: Enable/disable features
REACT_APP_ENABLE_CONSOLE_LOGS=true
REACT_APP_API_TIMEOUT=10000
```

### Bước 2: Tạo file .env cho Production

Tạo file **`.env.production`** trong thư mục `frontend/`:

```env
# Production Environment Variables
# Backend API URL - THAY ĐỔI URL NÀY THEO BACKEND CỦA BẠN
REACT_APP_API_URL=https://your-backend-url.onrender.com

# Production settings
REACT_APP_ENABLE_CONSOLE_LOGS=false
REACT_APP_API_TIMEOUT=30000
```

**Lưu ý quan trọng:**
- ✅ KHÔNG có dấu `/` ở cuối URL
- ✅ Phải bắt đầu bằng `REACT_APP_` để React nhận diện
- ✅ KHÔNG có `/api` ở cuối (code đã tự động thêm)

### Bước 3: Cập nhật .gitignore (nếu chưa có)

Tạo file **`.gitignore`** trong thư mục `frontend/` (nếu chưa có) và thêm:

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**QUAN TRỌNG:** 
- ❌ KHÔNG commit file `.env.local` vào Git
- ✅ File `.env.development` và `.env.production` có thể commit (không có sensitive data)
- ✅ File `.env.local` dùng để override local (không commit)

---

## 🚀 Deploy lên Render

### Option 1: Static Site (Khuyến nghị)

1. **Tạo Static Site trên Render:**
   - Vào Render Dashboard
   - Click "New +" → "Static Site"
   - Connect repository
   
2. **Cấu hình:**
   ```
   Name: thado-robot-frontend
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Thêm Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   REACT_APP_ENABLE_CONSOLE_LOGS=false
   REACT_APP_API_TIMEOUT=30000
   ```

4. **Deploy:**
   - Click "Create Static Site"
   - Đợi build hoàn thành (~5-10 phút)
   - URL frontend: `https://thado-robot-frontend.onrender.com`

### Option 2: Web Service với Node.js

1. **Thêm serve script vào package.json:**
   ```json
   {
     "scripts": {
       "serve": "npx serve -s build -l 3000"
     }
   }
   ```

2. **Cấu hình Web Service:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm run serve
   ```

---

## 🧪 Testing Local

### Test Development:
```bash
cd frontend
npm start
```
Sẽ tự động sử dụng `.env.development`

### Test Production Build:
```bash
npm run build
npx serve -s build
```
Sẽ tự động sử dụng `.env.production`

---

## 🔍 Kiểm tra API Connection

### Trong Development Console:
```javascript
// Kiểm tra API URL hiện tại
console.log(process.env.REACT_APP_API_URL);

// Test API call
fetch(`${process.env.REACT_APP_API_URL}/api/categories/`)
  .then(res => res.json())
  .then(data => console.log('Categories:', data))
  .catch(err => console.error('Error:', err));
```

---

## 🐛 Troubleshooting

### Lỗi: "Network Error" hoặc "CORS Error"

**Nguyên nhân:** Backend chưa cấu hình CORS cho frontend URL

**Giải pháp:**
1. Vào Backend service trên Render
2. Thêm environment variable:
   ```
   CORS_ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
   ```
3. Redeploy backend

### Lỗi: "Request Timeout"

**Nguyên nhân:** Backend đang cold start (Render free tier)

**Giải pháp:**
- Đợi 30-60 giây
- Render free tier sẽ "ngủ" sau 15 phút không hoạt động
- Có thể tăng timeout trong `.env.production`:
  ```
  REACT_APP_API_TIMEOUT=60000
  ```

### Lỗi: Images không load

**Nguyên nhân:** Image URLs sai hoặc CORS chưa được cấu hình

**Giải pháp:**
1. Kiểm tra Backend có serve media files đúng không
2. Kiểm tra CORS settings trong Backend
3. Sử dụng Cloudinary cho media files (khuyến nghị)

---

## 📊 API Service Features

### Automatic Retry
```typescript
// API tự động retry 3 lần khi gặp lỗi server (5xx)
const products = await apiService.getProducts();
```

### Timeout Handling
```typescript
// Timeout tự động sau 30 giây (production)
// Có thể config qua REACT_APP_API_TIMEOUT
```

### Caching
```typescript
// Categories được cache 5 phút
const categories = await apiService.getAllCategories();
```

### Error Handling
```typescript
try {
  const product = await apiService.getProduct(id);
} catch (error) {
  // Error message rõ ràng: "Client Error: 404 Not Found"
  console.error(error.message);
}
```

### Image URL Helper
```typescript
// Tự động thêm base URL cho images
const imageUrl = apiService.getImageUrl('/media/products/image.png');
// Result: https://your-backend.onrender.com/media/products/image.png
```

---

## ✅ Checklist Deploy

- [ ] Tạo file `.env.development` với localhost URL
- [ ] Tạo file `.env.production` với production backend URL
- [ ] Cập nhật `.gitignore` để ignore `.env.local`
- [ ] Test local với `npm start`
- [ ] Test production build với `npm run build && npx serve -s build`
- [ ] Deploy backend trước
- [ ] Lấy backend URL từ Render
- [ ] Cập nhật `REACT_APP_API_URL` trong Render environment variables
- [ ] Deploy frontend
- [ ] Cập nhật backend CORS với frontend URL
- [ ] Test toàn bộ tính năng trên production
- [ ] Kiểm tra images load đúng
- [ ] Kiểm tra API calls trong Network tab

---

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Network tab trong DevTools
2. Console logs
3. Backend logs trên Render
4. CORS settings

**API Endpoint Structure:**
- Categories: `/api/categories/`
- Products: `/api/products/`
- Product Detail: `/api/products/{id}/`
- Search: `/api/products/search/?category={id}`

